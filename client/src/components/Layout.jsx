import { jsx, jsxs } from "react/jsx-runtime";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Layout
};
