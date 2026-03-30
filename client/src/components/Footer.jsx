import React from 'react';
import './PaymentPage.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="payment-footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Sell products</a></li>
            <li><a href="#">Sell on Business</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Self-Publish with us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Returns & Replacements</a></li>
          </ul>
        </div>
      </div>

      <div className="contact-info">
        <p>Phone: +44 20 7946 0123</p>
        <p>Email: support@hexa.com</p>
        <p>Address: 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
      </div>

      <div className="copyright">
        <p>&copy; {currentYear} Hexa. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;