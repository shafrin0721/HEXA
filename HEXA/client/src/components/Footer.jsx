import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Get to Know Us</h4>
            <Link to="/products">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Make Money with Us</h4>
            <Link to="/products">Sell products</Link>
            <Link to="/products">Advertise Your Products</Link>
            <Link to="/products">Self-Publish with Us</Link>
          </div>
          <div>
            <h4>Let Us Help You</h4>
            <Link to="/order-summary">Your Orders</Link>
            <Link to="/contact">Returns & Replacements</Link>
            <Link to="/contact">Manage Your Content and Devices</Link>
            <Link to="/contact">Help</Link>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>Phone: +44 20 7946 0123</p>
            <p>Email: support@hexa.com</p>
            <p>Address: 123 Northern Park Lane, West London, W4 4Z, United Kingdom</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 HEXA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

