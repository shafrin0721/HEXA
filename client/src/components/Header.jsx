import React, { useState } from 'react';
import './Header.css';  // ← Import Header specific styles

const Header = ({ cartItemCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <h2>HexaShop</h2>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
          </li>
          <li className={`nav-item ${activeNav === 'products' ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('products')} className="nav-link">
              Products
            </button>
          </li>
          <li className={`nav-item ${activeNav === 'about' ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>
          </li>
          <li className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
          </li>
        </ul>

        {/* Right Side Icons */}
        <div className="nav-icons">
          <div className="cart-icon-wrapper">
            <button className="icon-btn cart-btn">
              🛒
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
          <div className="profile-icon-wrapper">
            <button className="icon-btn profile-btn">
              <img 
                src="https://ui-avatars.com/api/?background=ff8c00&color=fff&rounded=true&size=32&name=User" 
                alt="Profile" 
                className="profile-image"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;