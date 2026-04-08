import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#050505]">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="flex h-14 min-w-14 items-center justify-center bg-black px-5">
              <span className="text-lg font-semibold leading-none tracking-tight text-white">Hexal</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-10 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path ? "text-white" : "text-neutral-300 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button
            className="relative p-2 text-neutral-200 hover:text-white transition-colors"
            aria-label="Shopping cart with 3 items"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white">
              3
            </span>
          </button>
          <Link to="/settings">
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-neutral-600">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
