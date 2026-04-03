import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import './checkout.css';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const steps = [
    { number: 1, label: 'Address' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Review' },
  ];

  const orderItems = [
    {
      id: 1,
      name: 'Hexa Classic Tee',
      brand: 'Hexa',
      price: 19.99,
      rating: 5,
      image: '🧥',
    },
    {
      id: 2,
      name: 'Hexa Classic Tee',
      brand: 'Hexa',
      price: 19.99,
      rating: 5,
      image: '👕',
    },
  ];

  const subtotal = 39.98;
  const shipping = 12.87;
  const total = 52.85;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      formData.phone
    );
  };

  return (
    <>
      <div className="checkout-container" style={{ minHeight: '100vh', background: '#000', color: '#fff', paddingBottom: '0' }}>
        {/* Header */}
        <div className="checkout-header" style={{ borderBottom: '1px solid #444', padding: '40px 0 20px 0', marginBottom: '0' }}>
          <div className="checkout-header-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h1 className="checkout-title" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Checkout</h1>

            {/* Progress Steps */}
            <div className="progress-steps" style={{ display: 'flex', alignItems: 'center', gap: '32px', overflowX: 'auto', paddingBottom: '16px' }}>
              {steps.map((step, index) => (
                <div key={step.number} className="progress-step" style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
                  <div
                    className={`progress-step-number${step.number > currentStep ? ' inactive' : ''}`}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      background: step.number <= currentStep ? '#aaa' : '#222',
                      color: step.number <= currentStep ? '#fff' : '#888',
                      fontSize: '1.1rem',
                      border: step.number === currentStep ? '2px solid #fff' : 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`progress-step-label${step.number > currentStep ? ' inactive' : ''}`}
                    style={{ fontSize: '1rem', color: step.number <= currentStep ? '#fff' : '#aaa', fontWeight: step.number === currentStep ? 600 : 400 }}
                  >
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="progress-divider" style={{ color: '#aaa', fontSize: '1.2rem', marginLeft: '8px' }}>--------</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="checkout-main" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
          {/* Form Section */}
          <div className="form-section" style={{ paddingRight: '32px' }}>
            {currentStep === 1 && (
              <div className="form-section-inner" style={{ marginBottom: '32px' }}>
                <h2 className="form-section-title" style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '18px' }}>Address</h2>

                {/* Email Address */}
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                  />
                </div>

                {/* First and Last Name */}
                <div className="form-row" style={{ display: 'flex', gap: '18px', marginBottom: '18px' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="form-input"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="form-input"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                  />
                </div>

                {/* City and State */}
                <div className="form-row" style={{ display: 'flex', gap: '18px', marginBottom: '18px' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="form-input"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                      className="form-input"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                    />
                  </div>
                </div>

                {/* Zip Code */}
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                  />
                </div>

                {/* Phone Number */}
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shipping Method</h2>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <p className="text-gray-400">Select your preferred shipping method on this screen.</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Payment Method</h2>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <p className="text-gray-400">Enter your payment details on this screen.</p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Review Order</h2>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <p className="text-gray-400">Review your order details before completing your purchase.</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary" style={{ background: '#111', borderRadius: '12px', padding: '32px 24px', border: '1px solid #444', position: 'sticky', top: '32px', alignSelf: 'start' }}>
            <h3 className="order-summary-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>Order Summary</h3>
            <div className="order-summary-list">
              <p className="order-summary-count" style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '18px' }}>{orderItems.length} Item</p>
              {orderItems.map((item) => (
                <div key={item.id} className="order-summary-item" style={{ display: 'flex', gap: '16px', marginBottom: '18px', paddingBottom: '18px', borderBottom: '1px solid #444' }}>
                  <div className="order-summary-image" style={{ width: '70px', height: '70px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                    {/* Replace emoji with image if available */}
                    {item.image}
                  </div>
                  <div className="order-summary-details" style={{ flex: 1, minWidth: 0 }}>
                    <h4 className="order-summary-name" style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px', color: '#fff' }}>{item.name}</h4>
                    <p className="order-summary-brand" style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '6px' }}>Brand: {item.brand}</p>
                    <div className="order-summary-rating" style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '6px' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i} className="order-summary-star" style={{ color: '#FFD700', fontSize: '1rem' }}>★</span>
                      ))}
                    </div>
                    <p className="order-summary-price" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="price-breakdown" style={{ marginBottom: '18px' }}>
              <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '6px', color: '#ccc' }}>
                <span>SUBTOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '6px', color: '#ccc' }}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="price-row total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #444', paddingTop: '12px', fontWeight: 'bold', color: '#fff' }}>
                <span>Order total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleContinue}
              disabled={currentStep === 1 && !isFormValid()}
              className="continue-btn"
              style={{ width: '100%', padding: '12px 0', borderRadius: '6px', fontWeight: 600, background: currentStep === 1 && !isFormValid() ? '#444' : '#FFD700', color: currentStep === 1 && !isFormValid() ? '#aaa' : '#000', border: 'none', marginBottom: '12px', cursor: currentStep === 1 && !isFormValid() ? 'not-allowed' : 'pointer', fontSize: '1rem' }}
            >
              Continue
            </button>
            <div className="footer-links" style={{ textAlign: 'right', fontSize: '0.85rem', marginTop: '18px' }}>
              <a href="#" className="footer-link" style={{ color: '#aaa', display: 'block', marginBottom: '4px', textDecoration: 'none' }}>RETURN POLICY</a>
              <a href="#" className="footer-link" style={{ color: '#aaa', display: 'block', textDecoration: 'none' }}>HELP</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="checkout-footer" style={{ background: '#eee', marginTop: '40px', padding: '0', borderTop: 'none' }}>
        <div className="checkout-footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0' }}>
          <div className="footer-sections" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', padding: '32px 24px 0 24px', background: '#eee' }}>
            {/* Get to Know Us */}
            <div className="footer-section" style={{ color: '#000' }}>
              <h4 className="footer-section-title">Get to Know Us</h4>
              <ul className="footer-section-list">
                <li><a href="#" className="footer-section-link">Home</a></li>
                <li><a href="#" className="footer-section-link">About</a></li>
                <li><a href="#" className="footer-section-link">Contact</a></li>
                <li><a href="#" className="footer-section-link">Cart</a></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div className="footer-section" style={{ color: '#000' }}>
              <h4 className="footer-section-title">Make Money with Us</h4>
              <ul className="footer-section-list">
                <li><a href="#" className="footer-section-link">Sell products</a></li>
                <li><a href="#" className="footer-section-link">Sell on Business</a></li>
                <li><a href="#" className="footer-section-link">Advertise Your Products</a></li>
                <li><a href="#" className="footer-section-link">Self-Publish with Us</a></li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div className="footer-section" style={{ color: '#000' }}>
              <h4 className="footer-section-title">Let Us Help You</h4>
              <ul className="footer-section-list">
                <li><a href="#" className="footer-section-link">Your Account</a></li>
                <li><a href="#" className="footer-section-link">Your Orders</a></li>
                <li><a href="#" className="footer-section-link">Returns & Replacements</a></li>
                <li><a href="#" className="footer-section-link">Manage Your Content and Devices</a></li>
                <li><a href="#" className="footer-section-link">Help</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section" style={{ color: '#000' }}>
              <h4 className="footer-section-title">Contact Us</h4>
              <ul className="footer-section-list">
                <li className="contact-info"><Phone size={16} /><span>+44 20 7946 0123</span></li>
                <li className="contact-info"><Mail size={16} /><span>support@hexa.com</span></li>
                <li className="contact-info"><MapPin size={16} /><span>123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</span></li>
              </ul>
            </div>
          </div>

          {/* Back to Top */}
          <div className="back-to-top" style={{ background: '#ddd', borderTop: 'none', padding: '8px 0', textAlign: 'center', fontSize: '1rem', color: '#222' }}>
            Back to top
          </div>
        </div>
      </footer>
    </>
  );
}