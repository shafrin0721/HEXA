import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { User, Eye, Bell, Shield, Camera, Trash2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { clampFontSize, isValidEmail, isValidPhone, MAX_NAME_LEN } from "@/lib/validation";
import { useTheme } from "next-themes";

const PROFILE_EMAIL_KEY = "hexal_profile_email";

function avatarStorageKey(email) {
  return `hexal_profile_avatar:${email.trim().toLowerCase()}`;
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face";

const sidebarItems = [
  { label: "Profile Settings", icon: User, id: "profile" },
  { label: "Accessibility", icon: Eye, id: "accessibility" },
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Security", icon: Shield, id: "security" }
];

const LANGUAGE_OPTIONS = ["English (US)", "English (UK)", "Spanish", "French"];

function readAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src !== "string") {
        reject(new Error("Could not read file"));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 256;
        let w = img.width;
        let h = img.height;
        if (w > max || h > max) {
          if (w > h) {
            h = Math.round(h * max / w);
            w = max;
          } else {
            w = Math.round(w * max / h);
            h = max;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not create canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = src;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function Settings() {
  const { setTheme } = useTheme();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileEmail, setProfileEmail] = useState(() => {
    if (typeof window === "undefined") return "john.doe@example.com";
    return localStorage.getItem(PROFILE_EMAIL_KEY) ?? "john.doe@example.com";
  });
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [fontSize, setFontSize] = useState([50]);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English (US)");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  useEffect(() => {
    const v = fontSize[0] ?? 50;
    const px = 14 + v / 100 * 10;
    document.documentElement.style.fontSize = `${px}px`;
  }, [fontSize]);

  const applyAvatarFromProfile = useCallback((email, serverAvatar) => {
    const key = avatarStorageKey(email);
    const local = localStorage.getItem(key);
    if (serverAvatar && /^https?:\/\//i.test(serverAvatar.trim())) {
      setAvatarSrc(serverAvatar.trim());
    } else if (local) {
      setAvatarSrc(local);
    } else {
      setAvatarSrc(null);
    }
  }, []);

  async function fetchProfileForEmail(email) {
    setLoadingProfile(true);
    const trimmed = email.trim();
    if (!trimmed) {
      setLoadingProfile(false);
      return;
    }
    if (!isValidEmail(trimmed)) {
      toast.error("Please enter a valid email before loading the profile.");
      setLoadingProfile(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl("/api/profile")}?email=${encodeURIComponent(trimmed)}`);
      if (res.status === 404) {
        toast.info("No saved profile for this email yet. Enter your details and save to create one.");
        applyAvatarFromProfile(trimmed, null);
        return;
      }
      if (!res.ok) {
        toast.error("Could not load profile");
        return;
      }
      const p = await res.json();
      setFirstName(p.first_name ?? "");
      setLastName(p.last_name ?? "");
      setPhone(p.phone ?? "");
      setDarkMode(Boolean(p.dark_mode));
      setFontSize([typeof p.font_size === "number" ? p.font_size : 50]);
      if (typeof p.language === "string" && LANGUAGE_OPTIONS.includes(p.language)) {
        setLanguage(p.language);
      }
      setEmailNotif(Boolean(p.email_notif));
      setSmsAlerts(Boolean(p.sms_alerts));
      setNewsletter(Boolean(p.newsletter));
      applyAvatarFromProfile(trimmed, p.avatar_url);
    } catch {
      toast.error("Network error loading profile");
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    void fetchProfileForEmail(profileEmail);
  }, []);

  async function saveProfile() {
    const email = profileEmail.trim();
    if (!email) {
      toast.error("Enter an email for this profile");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const fn = firstName.trim();
    const ln = lastName.trim();
    if (fn.length > MAX_NAME_LEN || ln.length > MAX_NAME_LEN) {
      toast.error(`First and last names must be at most ${MAX_NAME_LEN} characters.`);
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Phone must include 7–15 digits, or leave the field empty.");
      return;
    }
    const fontSizeValue = clampFontSize(fontSize[0] ?? 50);
    setSaving(true);
    try {
      const res = await fetch(apiUrl("/api/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: fn,
          last_name: ln,
          phone: phone.trim(),
          dark_mode: darkMode,
          font_size: fontSizeValue,
          language,
          email_notif: emailNotif,
          sms_alerts: smsAlerts,
          newsletter
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof data.error === "string" ? data.error : "Could not save");
        return;
      }
      localStorage.setItem(PROFILE_EMAIL_KEY, email);
      if (avatarSrc && avatarSrc.startsWith("data:")) {
        localStorage.setItem(avatarStorageKey(email), avatarSrc);
      }
      toast.success("Profile saved");
    } catch {
      toast.error("Network error. Is the API running?");
    } finally {
      setSaving(false);
    }
  }

  function handleAvatarButtonClick() {
    fileInputRef.current?.click();
  }

  async function handleAvatarFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) {
      if (file) toast.error("Please choose an image file.");
      return;
    }
    try {
      const dataUrl = await readAndCompressImage(file);
      setAvatarSrc(dataUrl);
      localStorage.setItem(avatarStorageKey(profileEmail), dataUrl);
      toast.success("Photo updated — save your profile to keep other changes.");
    } catch {
      toast.error("Could not process that image.");
    }
  }

  function handleRemoveAvatar() {
    const email = profileEmail.trim();
    setAvatarSrc(null);
    if (email) {
      localStorage.removeItem(avatarStorageKey(email));
    }
    toast.success("Photo removed");
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Password updated (demo — not sent to a server).");
    setPasswordDialogOpen(false);
    setNewPassword("");
    setConfirmPassword("");
  }

  const cardClass = "bg-white dark:bg-card rounded-xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] border border-transparent dark:border-border";

  return /* @__PURE__ */ jsx("div", { className: "container py-12 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-8 max-w-5xl w-full mx-auto", children: [
    /* @__PURE__ */ jsx("aside", { className: "w-56 shrink-0", children: /* @__PURE__ */ jsx("nav", { className: "space-y-1 bg-white dark:bg-card rounded-xl p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] border border-transparent dark:border-border", children: sidebarItems.map((item) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(item.id),
        className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? "bg-[#f0f2f5] dark:bg-muted text-[#111318] dark:text-foreground" : "text-[#6b707c] dark:text-muted-foreground hover:text-[#111318] hover:dark:text-foreground hover:bg-[#f4f5f7] dark:hover:bg-muted/50"}`,
        children: [
          /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
          item.label
        ]
      },
      item.id
    )) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-6", children: [
      activeTab === "profile" && /* @__PURE__ */ jsxs("section", { className: cardClass, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-[#111318] dark:text-foreground mb-6", children: "Profile Settings" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "profile-email", className: "text-sm font-medium text-[#111318] dark:text-foreground mb-1.5 block", children: "Account email (used to load / save in database)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "profile-email",
                type: "email",
                value: profileEmail,
                onChange: (e) => setProfileEmail(e.target.value),
                className: "w-full h-10 rounded-lg border border-black/5 dark:border-border bg-white dark:bg-background px-3 text-sm text-[#111318] dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#111318]/70 dark:focus:ring-ring sm:flex-1",
                placeholder: "you@example.com"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "shrink-0",
                disabled: loadingProfile,
                onClick: () => void fetchProfileForEmail(profileEmail),
                children: "Load profile"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            "aria-hidden": true,
            onChange: (e) => void handleAvatarFileChange(e)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-[#e1e4ea] dark:bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: avatarSrc || DEFAULT_AVATAR,
                alt: "",
                className: `h-full w-full object-cover ${avatarSrc ? "" : "opacity-50"}`
              }
            ) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-sm hover:opacity-90",
                "aria-label": "Change profile photo",
                onClick: handleAvatarButtonClick,
                children: /* @__PURE__ */ jsx(Camera, { className: "h-3 w-3 text-primary-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "Profile Photo" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Upload a new photo (stored in this browser) or remove the current one." }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "mt-1 h-8 px-2 text-destructive hover:text-destructive",
                onClick: handleRemoveAvatar,
                disabled: !avatarSrc,
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-1" }),
                  "Remove photo"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "first-name", className: "text-sm font-medium text-[#111318] dark:text-foreground mb-1.5 block", children: "First Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "first-name",
                type: "text",
                value: firstName,
                onChange: (e) => setFirstName(e.target.value),
                maxLength: MAX_NAME_LEN,
                placeholder: "First Name",
                className: "w-full h-10 rounded-lg border border-black/5 dark:border-border bg-white dark:bg-background px-3 text-sm text-[#111318] dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#111318]/70 dark:focus:ring-ring"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "last-name", className: "text-sm font-medium text-[#111318] dark:text-foreground mb-1.5 block", children: "Last Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "last-name",
                type: "text",
                value: lastName,
                onChange: (e) => setLastName(e.target.value),
                maxLength: MAX_NAME_LEN,
                placeholder: "Last Name",
                className: "w-full h-10 rounded-lg border border-black/5 dark:border-border bg-white dark:bg-background px-3 text-sm text-[#111318] dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#111318]/70 dark:focus:ring-ring"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "text-sm font-medium text-[#111318] dark:text-foreground mb-1.5 block", children: "Phone Number" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "Phone Number",
              className: "w-full h-10 rounded-lg border border-black/5 dark:border-border bg-white dark:bg-background px-3 text-sm text-[#111318] dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#111318]/70 dark:focus:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: saveProfile, disabled: saving || loadingProfile, className: "w-full sm:w-auto", children: saving ? "Saving…" : "Save profile to database" })
      ] }),
      activeTab === "accessibility" && /* @__PURE__ */ jsxs("section", { className: cardClass, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-[#111318] dark:text-foreground mb-6", children: "Accessibility Options" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "Dark Mode" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Switch between light and dark themes" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: darkMode, onCheckedChange: setDarkMode })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground mb-3", children: "Font Size" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "A" }),
            /* @__PURE__ */ jsx(Slider, { value: fontSize, onValueChange: setFontSize, max: 100, step: 1, className: "flex-1" }),
            /* @__PURE__ */ jsx("span", { className: "text-base text-[#9ca0aa] dark:text-muted-foreground", children: "A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "language", className: "text-sm font-medium text-[#111318] dark:text-foreground mb-1.5 block", children: "Language" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "language",
              value: language,
              onChange: (e) => setLanguage(e.target.value),
              className: "w-full h-10 rounded-lg border border-black/5 dark:border-border bg-white dark:bg-background px-3 text-sm text-[#111318] dark:text-foreground focus:outline-none focus:ring-2 focus:ring-[#111318]/70 dark:focus:ring-ring",
              "aria-label": "Language preference",
              children: LANGUAGE_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full sm:w-auto", onClick: saveProfile, disabled: saving, children: "Save accessibility settings" })
      ] }),
      activeTab === "notifications" && /* @__PURE__ */ jsxs("section", { className: cardClass, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-[#111318] dark:text-foreground mb-6", children: "Notification Preferences" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "Email Notifications" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Receive booking confirmations and updates" })
            ] }),
            /* @__PURE__ */ jsx(Switch, { checked: emailNotif, onCheckedChange: setEmailNotif })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "SMS Alerts" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Get text messages for important updates" })
            ] }),
            /* @__PURE__ */ jsx(Switch, { checked: smsAlerts, onCheckedChange: setSmsAlerts })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "Newsletter" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Weekly updates and travel inspiration" })
            ] }),
            /* @__PURE__ */ jsx(Switch, { checked: newsletter, onCheckedChange: setNewsletter })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "mt-6 w-full sm:w-auto", onClick: saveProfile, disabled: saving, children: "Save notifications" })
      ] }),
      activeTab === "security" && /* @__PURE__ */ jsxs("section", { className: cardClass, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-[#111318] dark:text-foreground mb-6", children: "Security" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground", children: "Two-factor authentication" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground", children: "Add an extra step when signing in (preference stored locally for this demo)." })
            ] }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: twoFactorEnabled,
                onCheckedChange: (v) => {
                  setTwoFactorEnabled(v);
                  toast.success(v ? "Two-factor authentication enabled (local only)." : "Two-factor authentication disabled.");
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-border dark:border-border pt-6", children: /* @__PURE__ */ jsxs(Dialog, { open: passwordDialogOpen, onOpenChange: setPasswordDialogOpen, children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "gap-2", children: [
              /* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4" }),
              "Change password"
            ] }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Change password" }),
                /* @__PURE__ */ jsx(DialogDescription, { children: "This demo does not send passwords to a server. Use this to confirm the form works." })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handlePasswordSubmit, children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "new-password", children: "New password" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "new-password",
                        type: "password",
                        autoComplete: "new-password",
                        value: newPassword,
                        onChange: (e) => setNewPassword(e.target.value),
                        placeholder: "At least 8 characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirm password" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "confirm-password",
                        type: "password",
                        autoComplete: "new-password",
                        value: confirmPassword,
                        onChange: (e) => setConfirmPassword(e.target.value)
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setPasswordDialogOpen(false), children: "Cancel" }),
                  /* @__PURE__ */ jsx(Button, { type: "submit", children: "Update password" })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#111318] dark:text-foreground mb-2", children: "Signed-in email" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9ca0aa] dark:text-muted-foreground mb-3", children: "Clear the stored profile email on this device (does not delete your account on the server)." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                onClick: () => {
                  localStorage.removeItem(PROFILE_EMAIL_KEY);
                  toast.success("Stored profile email cleared from this browser.");
                },
                children: "Clear stored email"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) });
}

export default Settings;