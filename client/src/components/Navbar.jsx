import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart(); // Get cart data from context
  
  // Calculate total number of items in cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-sm font-bold text-white">HEXA</span>
        </Link>
        <div className="hidden md:flex gap-12 text-sm">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center text-white">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/settings">
            <img src="/images/profile.svg" alt="Profile" className="w-7 h-7 rounded-full" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;