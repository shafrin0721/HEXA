import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiry: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const featuredProducts = [
        {
            id: 1,
            name: 'Veritas Strength Tee',
            description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
            price: 19.99,
            rating: 5,
            image: 'https://via.placeholder.com/300x300?text=Veritas+Tee'
        },
        {
            id: 2,
            name: 'Chorale Noir Tee',
            description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
            price: 19.99,
            rating: 5,
            image: 'https://via.placeholder.com/300x300?text=Chorale+Tee'
        },
        {
            id: 3,
            name: 'Elan Focus Tee',
            description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
            price: 19.99,
            rating: 5,
            image: 'https://via.placeholder.com/300x300?text=Elan+Tee'
        },
        {
            id: 4,
            name: 'Divinus Path Tee',
            description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
            price: 19.99,
            rating: 5,
            image: 'https://via.placeholder.com/300x300?text=Divinus+Tee'
        }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', inquiry: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleAddToCart = (productId) => {
        alert(`Product ${productId} added to cart!`);
    };

    const handleBuyNow = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to HEXA</h1>
                    <p className="hero-subtitle">Discover Your Perfect Style</p>
                    <Link to="/products" className="hero-btn">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">Everything you need to purchase</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </div>
                            <h3>Secure Payments</h3>
                            <p>Safe and reliable payment processing for all transactions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 12V8H4v8h16v-4M12 12h8M16 16v4M8 16v4M4 16H2M22 16h-2"/>
                                    <circle cx="12" cy="12" r="2"/>
                                    <path d="M12 2v2M12 22v-2"/>
                                </svg>
                            </div>
                            <h3>Order Tracking</h3>
                            <p>Real-time updates on your order status and location</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                            </div>
                            <h3>Quality Verification</h3>
                            <p>Strict quality control measures for all products</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">"THE CHOICE"</p>
                    
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <div className="rating">
                                        {'★'.repeat(product.rating)}
                                        <span>({product.rating})</span>
                                    </div>
                                    <div className="price">${product.price.toFixed(2)}</div>
                                    <div className="product-actions">
                                        <button 
                                            className="btn-add-cart"
                                            onClick={() => handleAddToCart(product.id)}
                                        >
                                            Add Cart
                                        </button>
                                        <button 
                                            className="btn-buy-now"
                                            onClick={() => handleBuyNow(product.id)}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact">
                <div className="container">
                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <h2>Get in Touch</h2>
                            <p>
                                Have any questions or need assistance? Our friendly customer support team is here to help.
                                Reach out to us via the following methods:
                            </p>
                            <div className="contact-methods">
                                <div className="contact-method">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <div>
                                        <strong>Phone:</strong>
                                        <p>+44 20 7946 0123</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <div>
                                        <strong>Email:</strong>
                                        <p>support@hexa.com</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <div>
                                        <strong>Address:</strong>
                                        <p>123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inquiry">Inquiry</label>
                                <textarea
                                    id="inquiry"
                                    name="inquiry"
                                    value={formData.inquiry}
                                    onChange={handleInputChange}
                                    placeholder="How can we help you?"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;