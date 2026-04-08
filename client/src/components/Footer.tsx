import { Facebook, Instagram, HelpCircle } from "lucide-react";

const footerSections = [
  {
    title: "Get to Know Us",
    links: ["Home", "About", "Contact", "Cart"],
  },
  {
    title: "Make Money with Us",
    links: ["Sell products", "Sell on Business", "Advertise Your Products", "Self-Publish with Us"],
  },
  {
    title: "Let Us Help You",
    links: ["Your Account", "Your Orders", "Returns & Replacements", "Manage Your Content and Devices", "Help"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-4">
        <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">
          Back to top
        </button>
      </div>
      <div className="border-t border-border">
        <div className="container py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-3 text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-primary hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Phone: <a href="tel:+94771234567" className="hover:text-primary transition-colors">+94 77 123 4567</a>
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              Email: <a href="mailto:support@hexal.com" className="hover:text-primary transition-colors">support@hexal.com</a>
            </p>
            <p className="text-xs text-muted-foreground">
              Address: <a href="https://www.google.com/maps?q=123+Galle+Road+Colombo+03" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">123 Galle Road, Colombo 03, Sri Lanka</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
