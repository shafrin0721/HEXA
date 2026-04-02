import { Layout } from "@/components/Layout";
import { Phone, Mail, MapPin, Facebook, Instagram, HelpCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof data.error === "string" ? data.error : "Could not send message");
        return;
      }
      toast.success("Message sent. We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Network error. Is the API running?");
    } finally {
      setSending(false);
    }
  }

  return (
    <Layout>
      <div className="container py-16 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl w-full mx-auto rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          {/* Contact Info Card */}
          <div className="bg-gradient-to-br from-[#1b1f27] to-[#0f1116] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Contact Us</h2>
              <p className="text-sm text-muted-foreground mb-8">
                We'd love to hear from you! Reach us anytime.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">+44 20 7946 0123</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">support@hexal.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium text-foreground">
                      123 Northern Park Lane,<br />
                      West London, W1A 4ZZ, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Visit our Facebook page">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Visit our Instagram profile">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Open help center">
                <HelpCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#f4f5f7] p-8">
            <h2 className="text-xl font-semibold text-[#111318] mb-1">Send Us a Message</h2>
            <p className="text-sm text-[#4b4f59] mb-6">
              Fill out the form and our team will get back to you soon.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] placeholder:text-[#9ca0aa] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-lg border border-black/5 bg-white px-3 text-sm text-[#111318] placeholder:text-[#9ca0aa] focus:outline-none focus:ring-2 focus:ring-[#111318]/70"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-[#111318] mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-black/5 bg-white px-3 py-2 text-sm text-[#111318] placeholder:text-[#9ca0aa] focus:outline-none focus:ring-2 focus:ring-[#111318]/70 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2 bg-[#111318] hover:bg-[#1b1f27]"
                size="lg"
                disabled={sending}
              >
                <Send className="h-4 w-4" />
                {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
