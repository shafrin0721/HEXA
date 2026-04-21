import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Veritas Strength Tee', image: '/images/product1_new.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 2, name: 'Chorale Noir Tee', image: '/images/product2_new.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 3, name: 'Élan Focus Tee', image: '/images/product3_new.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 4, name: 'Divinus Path Tee', image: '/images/product4_new.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 5, name: 'Nexus Vitality Tee', image: '/images/product5_new.jpg', desc: 'Premium blend fabric with enhanced breathability and comfort.', price: '$24.99' },
  { id: 6, name: 'Solaris Elite Tee', image: '/images/product6_new.jpg', desc: 'High-performance athletic tee designed for maximum movement.', price: '$29.99' },
  { id: 7, name: 'Lunar Echo Tee', image: '/images/product7_new.jpg', desc: 'Minimalist design with premium organic cotton construction.', price: '$22.99' },
  { id: 8, name: 'Quantum Flow Tee', image: '/images/product8_new.jpg', desc: 'Advanced moisture-wicking technology for active lifestyles.', price: '$26.99' },
  { id: 9, name: 'Apex Prime Tee', image: '/images/product9_new.jpg', desc: 'Luxury cotton blend with anti-wrinkle properties.', price: '$32.99' },
  { id: 10, name: 'Zenith Core Tee', image: '/images/product10_new.jpg', desc: 'Ergonomic fit with sustainable bamboo fabric blend.', price: '$28.99' },
  { id: 11, name: 'Vortex Dynamic Tee', image: '/images/product11_new.jpg', desc: 'Bold graphic design with reinforced stitching.', price: '$21.99' },
  { id: 12, name: 'Celestial Grace Tee', image: '/images/product12_new.jpg', desc: 'Elegant silhouette with pearlized finish details.', price: '$25.99' },
  { id: 13, name: 'Titan Force Tee', image: '/images/product13_new.jpg', desc: 'Heavy-duty construction built for durability and style.', price: '$27.99' },
  { id: 14, name: 'Aurora Bliss Tee', image: '/images/product14_new.jpg', desc: 'Lightweight fabric with UV protection and quick-dry technology.', price: '$23.99' },
  { id: 15, name: 'Odyssey Quest Tee', image: '/images/product15_new.jpg', desc: 'Adventure-ready design with multiple utility pockets.', price: '$31.99' },
  { id: 16, name: 'Infinity Loop Tee', image: '/images/product16_new.jpg', desc: 'Timeless classic with modern sustainable materials.', price: '$20.99' },
];

export default function Home() {
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    email: '',
    inquiry: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', surname: '', email: '', inquiry: '' });
  };

  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="title">Welcome to HEXA</h1><br></br>
            <p className="subtitle">Discover Your Perfect Style</p>
            <br></br><br></br><br></br>
            <Link to="/products" className="btn btn-white">Shop Now</Link>
          </div>
          <div className="hero-image">
            <img src="/images/Tshirtbrand.png" alt="Hero" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Features</p>
            <h2 className="title">Everything you need to purchase</h2>
          </div>
          <div className="grid-3">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>Secure Payments</h3>
              <p>Safe and reliable payment processing for all transactions</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Order Tracking</h3>
              <p>Real-time updates on your order status and location</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Quality Verification</h3>
              <p>Strict quality control measures for all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="title text-center">Featured Products</h2>
          <div className="grid-4">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <p className="price">{product.price}</p>
                  <div className="product-buttons">
                    <button className="btn btn-white">Add Cart</button>
                    <button className="btn btn-yellow">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="grid-2">
            <div className="contact-info">
              <h2 className="title">Get in Touch</h2>
              <p>Have any questions or need assistance?</p>
              <p>Our friendly customer support team is here to help. Reach out to us via the following methods:</p>
              <div className="contact-details">
                <p><strong>Phone:</strong> +44 20 7946 0123</p>
                <p><strong>Email:</strong> support@hexa.com</p>
                <p><strong>Address:</strong> 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Surname"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="Inquiry"
                rows="4"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
