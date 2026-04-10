import { jsx, jsxs } from "react/jsx-runtime";
import { Layout } from "@/components/Layout";
import { Phone, Mail, MapPin, Facebook, Instagram, HelpCircle, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { MESSAGE_MAX_LEN, MESSAGE_MIN_LEN, MAX_NAME_LEN, validateContactForm } from "@/lib/validation";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateContactForm(name, email, message);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSending(true);
    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof data.error === "string" ? data.error : "Could not send message");
        return;
      }
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Network error. Is the API running?");
    } finally {
      setSending(false);
    }
  }
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("div", { className: "container py-16 flex items-center justify-center min-h-[calc(100vh-200px)]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl w-full mx-auto rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1e2b] via-[#12151d] to-[#0a0c12] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-52 h-52 rounded-full bg-primary/5 blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-10", children: "We'd love to hear from you! Reach us anytime." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+94771234567",
              id: "contact-phone-link",
              className: "group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider font-medium mb-1", children: "Phone" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300", children: "+94 77 123 4567" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Tap to call" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://wa.me/94771234567",
              target: "_blank",
              rel: "noopener noreferrer",
              id: "contact-whatsapp-link",
              className: "group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 text-green-400" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider font-medium mb-1", children: "WhatsApp" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white group-hover:text-green-400 transition-colors duration-300", children: "+94 77 123 4567" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Chat with us on WhatsApp" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:support@hexal.com",
              id: "contact-email-link",
              className: "group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider font-medium mb-1", children: "Email" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300", children: "support@hexal.com" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Open your email client" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.google.com/maps?q=123+Galle+Road+Colombo+03",
              target: "_blank",
              rel: "noopener noreferrer",
              id: "contact-address-link",
              className: "group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider font-medium mb-1", children: "Address" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300", children: [
                    "123 Galle Road,",
                    /* @__PURE__ */ jsx("br", {}),
                    "Colombo 03, Sri Lanka"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "View on Google Maps" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex gap-3 mt-10 pt-6 border-t border-white/10", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300",
            "aria-label": "Visit our Facebook page",
            children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300",
            "aria-label": "Visit our Instagram profile",
            children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300",
            "aria-label": "Open help center",
            children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#f7f8fa] p-8 md:p-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#111318] mb-1", children: "Send Us a Message" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6b707c] mb-8", children: "Fill out the form and our team will get back to you soon." }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "contact-name", className: "text-sm font-medium text-[#111318] mb-1.5 block", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "contact-name",
              type: "text",
              placeholder: "Your Name",
              required: true,
              maxLength: MAX_NAME_LEN,
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "w-full h-11 rounded-xl border border-[#e1e4ea] bg-white px-4 text-sm text-[#111318] placeholder:text-[#b0b4be] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "contact-email", className: "text-sm font-medium text-[#111318] mb-1.5 block", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "contact-email",
              type: "email",
              placeholder: "you@email.com",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full h-11 rounded-xl border border-[#e1e4ea] bg-white px-4 text-sm text-[#111318] placeholder:text-[#b0b4be] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "contact-message", className: "text-sm font-medium text-[#111318] mb-1.5 block", children: "Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "contact-message",
              placeholder: "How can we help you?",
              rows: 5,
              required: true,
              minLength: MESSAGE_MIN_LEN,
              maxLength: MESSAGE_MAX_LEN,
              value: message,
              onChange: (e) => setMessage(e.target.value),
              className: "w-full rounded-xl border border-[#e1e4ea] bg-white px-4 py-3 text-sm text-[#111318] placeholder:text-[#b0b4be] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#b0b4be] mt-1 text-right", children: [
            message.length,
            "/",
            MESSAGE_MAX_LEN
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            id: "contact-submit-btn",
            type: "submit",
            className: "w-full gap-2 h-12 rounded-xl bg-[#111318] hover:bg-[#2b2f38] active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-lg shadow-black/20",
            size: "lg",
            disabled: sending,
            children: [
              /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
              sending ? "Sending\u2026" : "Send Message"
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
}
export {
  Contact as default
};
