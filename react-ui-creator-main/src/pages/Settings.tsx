import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { User, Eye, Bell, Shield, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

const PROFILE_EMAIL_KEY = "hexal_profile_email";

const sidebarItems = [
  { label: "Profile Settings", icon: User, id: "profile" },
  { label: "Accessibility", icon: Eye, id: "accessibility" },
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Security", icon: Shield, id: "security" },
];

const LANGUAGE_OPTIONS = ["English (US)", "English (UK)", "Spanish", "French"] as const;

export default function Settings() {
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
  const [language, setLanguage] = useState<string>("English (US)");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchProfileForEmail(email: string) {
    setLoadingProfile(true);
    const trimmed = email.trim();
    if (!trimmed) {
      setLoadingProfile(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl("/api/profile")}?email=${encodeURIComponent(trimmed)}`);
      if (res.status === 404) {
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
      if (typeof p.language === "string" && LANGUAGE_OPTIONS.includes(p.language as (typeof LANGUAGE_OPTIONS)[number])) {
        setLanguage(p.language);
      }
      setEmailNotif(Boolean(p.email_notif));
      setSmsAlerts(Boolean(p.sms_alerts));
      setNewsletter(Boolean(p.newsletter));
    } catch {
      toast.error("Network error loading profile");
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    void fetchProfileForEmail(profileEmail);
    // Intentionally once on mount; use "Load profile" to refresh after changing email.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProfile() {
    const email = profileEmail.trim();
    if (!email) {
      toast.error("Enter an email for this profile");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(apiUrl("/api/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
          dark_mode: darkMode,
          font_size: fontSize[0],
          language,
          email_notif: emailNotif,
          sms_alerts: smsAlerts,
          newsletter,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof data.error === "string" ? data.error : "Could not save");
        return;
      }
      localStorage.setItem(PROFILE_EMAIL_KEY, email);
      toast.success("Profile saved");
    } catch {
      toast.error("Network error. Is the API running?");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="container py-12 flex justify-center">
        <div className="flex gap-8 max-w-5xl w-full mx-auto">
          <aside className="w-56 shrink-0">
            <nav className="space-y-1 bg-white rounded-xl p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-[#f0f2f5] text-[#111318]"
                      : "text-[#6b707c] hover:text-[#111318] hover:bg-[#f4f5f7]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg font-semibold text-[#111318] mb-6">Profile Settings</h2>
              <div className="mb-4">
                <label htmlFor="profile-email" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Account email (used to load / save in database)
                </label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    id="profile-email"
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] focus:outline-none focus:ring-2 focus:ring-[#111318]/70 sm:flex-1"
                    placeholder="you@example.com"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0"
                    disabled={loadingProfile}
                    onClick={() => void fetchProfileForEmail(profileEmail)}
                  >
                    Load profile
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-[#e1e4ea] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                      alt="Profile"
                      className="h-full w-full object-cover opacity-50"
                    />
                  </div>
                  <button
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center"
                    aria-label="Change profile photo"
                    type="button"
                  >
                    <Camera className="h-3 w-3 text-primary-foreground" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111318]">Profile Photo</p>
                  <p className="text-xs text-[#9ca0aa]">Upload a new photo or remove the current one</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="first-name" className="text-sm font-medium text-[#111318] mb-1.5 block">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="text-sm font-medium text-[#111318] mb-1.5 block">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                />
              </div>
              <Button type="button" onClick={saveProfile} disabled={saving || loadingProfile} className="w-full sm:w-auto">
                {saving ? "Saving…" : "Save profile to database"}
              </Button>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg font-semibold text-[#111318] mb-6">Accessibility Options</h2>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-[#111318]">Dark Mode</p>
                  <p className="text-xs text-[#9ca0aa]">Switch between light and dark themes</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium text-[#111318] mb-3">Font Size</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#9ca0aa]">A</span>
                  <Slider value={fontSize} onValueChange={setFontSize} max={100} step={1} className="flex-1" />
                  <span className="text-base text-[#9ca0aa]">A</span>
                </div>
              </div>
              <div>
                <label htmlFor="language" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                  aria-label="Language preference"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg font-semibold text-[#111318] mb-6">Notification Preferences</h2>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#111318]">Email Notifications</p>
                    <p className="text-xs text-[#9ca0aa]">Receive booking confirmations and updates</p>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#111318]">SMS Alerts</p>
                    <p className="text-xs text-[#9ca0aa]">Get text messages for important updates</p>
                  </div>
                  <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#111318]">Newsletter</p>
                    <p className="text-xs text-[#9ca0aa]">Weekly updates and travel inspiration</p>
                  </div>
                  <Switch checked={newsletter} onCheckedChange={setNewsletter} />
                </div>
              </div>
              <Button type="button" variant="outline" className="mt-6 w-full sm:w-auto" onClick={saveProfile} disabled={saving}>
                Save notifications &amp; accessibility
              </Button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
