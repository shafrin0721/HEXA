import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount] = useState(2); // Example cart count

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    HEXA
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-menu desktop-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                {/* Right Side Icons */}
                <div className="nav-icons">
                    {/* Cart Icon */}
                    <Link to="/cart" className="nav-icon cart-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M9 21a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>

                    {/* User Icon */}
                    <Link to="/login" className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
                    <Link to="/products" className="mobile-nav-link" onClick={toggleMenu}>Products</Link>
                    <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>About</Link>
                    <Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</Link>
                    <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link>
                    <Link to="/cart" className="mobile-nav-link" onClick={toggleMenu}>Cart ({cartCount})</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;