import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/logo.png';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/product" className="logo-wrap">
          <img src={logo} alt="Hexa logo" className="logo-img" />
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-wrap" aria-label="Cart">
            <ShoppingCart size={24} strokeWidth={1.5} />
            <span className="cart-badge">{cartCount || 0}</span>
          </Link>
          <img src="/assets/avatar.jpg" alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
}
