import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];

function Navbar() {
  const location = useLocation();

  return /* @__PURE__ */ jsx("header", {
    className: "sticky top-0 z-50 bg-[#111111] border-b border-neutral-800",
    children: /* @__PURE__ */ jsxs("div", {
      className: "container flex h-16 items-center px-6 mx-auto max-w-7xl",
      children: [
        /* Logo - Left side */
        /* @__PURE__ */ jsx("div", {
          className: "flex items-center w-[160px]",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/",
            className: "flex items-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-xl font-bold tracking-widest text-white uppercase",
              style: { letterSpacing: "0.2em" },
              children: "HEXA"
            })
          })
        }),

        /* Nav links - Centered */
        /* @__PURE__ */ jsx("nav", {
          className: "hidden md:flex flex-1 items-center justify-center gap-8",
          children: navItems.map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              to: item.path,
              className: `text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-neutral-400 hover:text-white"
              }`,
              children: item.label
            },
            item.path
          ))
        }),

        /* Icons - Right side */
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-end gap-3 w-[160px]",
          children: [
            /* Cart icon with badge */
            /* @__PURE__ */ jsxs("button", {
              className: "relative p-2 text-neutral-300 hover:text-white transition-colors duration-200",
              "aria-label": "Shopping cart",
              children: [
                /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", {
                  className: "absolute -top-0 -right-0 h-4 w-4 rounded-full bg-amber-400 text-[10px] font-bold flex items-center justify-center text-black",
                  children: "2"
                })
              ]
            }),

            /* User icon */
            /* @__PURE__ */ jsx(Link, {
              to: "/settings",
              className: "p-2 text-neutral-300 hover:text-white transition-colors duration-200",
              "aria-label": "User account",
              children: /* @__PURE__ */ jsx(User, { className: "h-5 w-5" })
            })
          ]
        })
      ]
    })
  });
}

export {
  Navbar
};

export default Navbar;