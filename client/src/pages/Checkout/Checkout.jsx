import React, { useState } from 'react';
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
        <div className="checkout-header" style={{ borderBottom: '1px solid #444', padding: '40px 0 20px 0', marginBottom: '0' }}>
          <div className="checkout-header-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h1 className="checkout-title" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Checkout</h1>

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

        <div className="checkout-main" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
          <div className="form-section" style={{ paddingRight: '32px' }}>
            {currentStep === 1 && (
              <div className="form-section-inner" style={{ marginBottom: '32px' }}>
                <h2 className="form-section-title" style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '18px' }}>Address</h2>

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

                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px' }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', background: '#111', color: '#fff' }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleContinue}
              className="btn btn-continue"
              disabled={!isFormValid()}
            >
              Continue
            </button>
          </div>

          <aside className="sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-summary-divider">
                <p className="item-count">{orderItems.length} items</p>
                {orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-image">
                      <span>{item.image}</span>
                    </div>
                    <div className="order-item-details">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-brand">{item.brand}</p>
                      <div className="order-item-rating">
                        {[...Array(item.rating)].map((_, index) => (
                          <span key={index} className="order-item-star">★</span>
                        ))}
                      </div>
                      <p className="order-item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pricing-section">
                <div className="price-row">
                  <span className="price-label">Subtotal</span>
                  <span className="price-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Shipping</span>
                  <span className="price-value">${shipping.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span className="price-label">Total</span>
                  <span className="price-value">${total.toFixed(2)}</span>
                </div>
                <button className="btn btn-continue">Proceed to Payment</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
