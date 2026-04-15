import { jsx, jsxs } from "react/jsx-runtime";
const footerSections = [
  {
    title: "Get to Know Us",
    links: ["Home", "About", "Contact", "Cart"]
  },
  {
    title: "Make Money with Us",
    links: ["Sell products", "Sell on Business", "Advertise Your Products", "Self-Publish with Us"]
  },
  {
    title: "Let Us Help You",
    links: ["Your Account", "Your Orders", "Returns & Replacements", "Manage Your Content and Devices", "Help"]
  }
];
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "container py-4", children: /* @__PURE__ */ jsx("button", { className: "w-full text-center text-sm text-muted-foreground hover:text-foreground py-2 transition-colors", children: "Back to top" }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container py-10 grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      footerSections.map((section) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3 text-foreground", children: section.title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: section.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-xs text-primary hover:underline", children: link }) }, link)) })
      ] }, section.title)),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
          "Phone: ",
          /* @__PURE__ */ jsx("a", { href: "tel:+94771234567", className: "hover:text-primary transition-colors", children: "+94 77 123 4567" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
          "Email: ",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@hexal.com", className: "hover:text-primary transition-colors", children: "support@hexal.com" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Address: ",
          /* @__PURE__ */ jsx("a", { href: "https://www.google.com/maps?q=123+Galle+Road+Colombo+03", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors", children: "123 Galle Road, Colombo 03, Sri Lanka" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Footer
};
