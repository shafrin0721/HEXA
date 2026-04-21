import React from "react";
import "../Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>HEXA</h2>
          <p>Discover your perfect style with modern fashion and premium quality.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📞 +44 20 7946 0123</p>
          <p>📧 support@hexa.com</p>
          <p>📍 London, UK</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 HEXA. All Rights Reserved.</p>
      </div>

    </footer>
  );
}