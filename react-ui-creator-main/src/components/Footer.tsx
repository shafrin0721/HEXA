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
            <p className="text-xs text-muted-foreground mb-1">Phone: +44 20 7946 0123</p>
            <p className="text-xs text-muted-foreground mb-1">Email: support@hexa.com</p>
            <p className="text-xs text-muted-foreground">Address: 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
