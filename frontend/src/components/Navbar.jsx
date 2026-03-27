import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingCart, User, X } from 'lucide-react'

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/#about' },
  { name: 'Contact', path: '/contact' },
]

const linkClassName = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
  }`

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          Hexa<span className="text-indigo-600">Shop</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) =>
            item.path.startsWith('/#') ? (
              <a key={item.name} href={item.path} className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                {item.name}
              </a>
            ) : (
              <NavLink key={item.name} to={item.path} className={linkClassName}>
                {item.name}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button type="button" className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <ShoppingCart size={22} />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
              3
            </span>
          </button>
          <Link
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-indigo-600"
            aria-label="Open profile page"
          >
            <User size={18} />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) =>
              item.path.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.path}
                  className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ),
            )}
          </nav>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <button type="button" className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100">
              <ShoppingCart size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                3
              </span>
            </button>
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white"
              aria-label="Open profile page"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
