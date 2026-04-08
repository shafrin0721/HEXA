import React from 'react';
import './Home.css';

const products = [
  {
    name: 'Veritas Strength Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable'],
  },
  {
    name: 'Chorale Noir Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Premium Cotton Blend', 'Reinforced Seams', 'Tagless Design'],
  },
  {
    name: 'Élan Focus Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311611/pexels-photo-6311611.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Moisture-Wicking Fabric', 'UV Protection', 'Quick-Dry'],
  },
  {
    name: 'Divinus Path Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Soft Touch Finish', 'Durable Construction', 'Colorfast'],
  },
  {
    name: 'Aurora Dawn Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable'],
  },
  {
    name: 'Midnight Shadow Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Premium Cotton Blend', 'Reinforced Seams', 'Tagless Design'],
  },
  {
    name: 'Zenith Peak Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311611/pexels-photo-6311611.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Moisture-Wicking Fabric', 'UV Protection', 'Quick-Dry'],
  },
  {
    name: 'Cosmic Wave Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Soft Touch Finish', 'Durable Construction', 'Colorfast'],
  },
  {
    name: 'Phoenix Rise Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable'],
  },
  {
    name: 'Eclipse Noir Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Premium Cotton Blend', 'Reinforced Seams', 'Tagless Design'],
  },
  {
    name: 'Nexus Point Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311611/pexels-photo-6311611.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Moisture-Wicking Fabric', 'UV Protection', 'Quick-Dry'],
  },
  {
    name: 'Quantum Leap Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Soft Touch Finish', 'Durable Construction', 'Colorfast'],
  },
  {
    name: 'Stellar Light Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable'],
  },
  {
    name: 'Void Walker Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Premium Cotton Blend', 'Reinforced Seams', 'Tagless Design'],
  },
  {
    name: 'Infinity Loop Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311611/pexels-photo-6311611.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Moisture-Wicking Fabric', 'UV Protection', 'Quick-Dry'],
  },
  {
    name: 'Genesis Core Tee',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg',
    description: 'Soft cotton tee with a classic cut, perfect for everyday wear.',
    features: ['Soft Touch Finish', 'Durable Construction', 'Colorfast'],
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-label">Welcome to HEXA</span>
          <h1>Discover Your Perfect Style</h1>
          <p>
            Trend-driven street apparel designed for confidence, comfort, and
            everyday performance.
          </p>
          <button className="hero-button">Shop Now</button>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="https://images.pexels.com/photos/532565/pexels-photo-532565.jpeg"
            alt="model"
            className="hero-image"
          />
        </div>
      </section>

      <section className="features">
        <div className="features-intro">
          <span>Features</span>
          <h2>Everything you need to purchase</h2>
        </div>
        <div className="feature-cards">
          <article className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>Safe and reliable payment processing for all transactions.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Order Tracking</h3>
            <p>Real-time updates on your order status and delivery.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">✔️</div>
            <h3>Quality Verification</h3>
            <p>Strict quality control measures for every product we ship.</p>
          </article>
        </div>
      </section>

      <section className="products">
        <div className="products-header">
          <span>Featured Products</span>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-features">
                  <ul>
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
              <div className="product-actions">
                <button className="outline-btn">Add Cart</button>
                <button className="solid-btn">Buy Now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-copy">
          <span>Get in Touch</span>
          <h2>Have any questions or need assistance?</h2>
          <p>
            Our friendly customer support team is here to help. Reach out to us
            via the following methods.
          </p>
          <div className="contact-details">
            <p>Phone: +44 20 7946 0123</p>
            <p>Email: support@hexa.com</p>
            <p>Address: 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Inquiry" rows="5" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
