import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Get to Know Us</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4">Make Money with Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Sell products</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Sell on Business</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Advertise Your Products</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Self-Publish with Us</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4">Let Us Help You</h3>
                        <ul className="space-y-2">
                            <li><Link to="/profile" className="text-gray-400 hover:text-white">Your Account</Link></li>
                            <li><Link to="/orders" className="text-gray-400 hover:text-white">Your Orders</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Returns & Replacements</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Help</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>📞 +44 20 7946 0123</li>
                            <li>✉️ support@hexa.com</li>
                            <li>📍 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 HEXA Clothing. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;