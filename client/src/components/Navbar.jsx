import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];
function Navbar() {
  const location = useLocation();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 bg-[#050505]", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-16 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-14 min-w-14 items-center justify-center bg-black px-5", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold leading-none tracking-tight text-white", children: "Hexal" }) }) }) }),
    /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-10 mx-auto", children: navItems.map((item) => /* @__PURE__ */ jsx(
      Link,
      {
        to: item.path,
        className: `text-sm font-medium transition-colors ${location.pathname === item.path ? "text-white" : "text-neutral-300 hover:text-white"}`,
        children: item.label
      },
      item.path
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "relative p-2 text-neutral-200 hover:text-white transition-colors",
          "aria-label": "Shopping cart with 3 items",
          children: [
            /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white", children: "3" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(Link, { to: "/settings", children: /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full overflow-hidden border-2 border-neutral-600", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
          alt: "Profile",
          className: "h-full w-full object-cover"
        }
      ) }) })
    ] })
  ] }) });
}
export {
  Navbar
};
