import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PaymentPage.css'; 

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    // Payment Information
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    cardName: '',
    
    // Billing Address
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: ''
  });

  const [orderSummary] = useState({
    items: [
      {
        id: 1,
        name: 'Hexa Classic Tee',
        brand: 'Hexa',
        rating: 5,
        price: 19.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop'
      }
    ],
    subtotal: 39.98,
    shipping: 12.87,
    total: 52.85
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', formData);
    alert('Payment processed successfully!');
  };

  return (
    <div className="payment-page">
      <Header cartItemCount={2} />
      
      <div className="payment-container">
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step completed">
            <div className="step-number">1</div>
            <div className="step-label">Address</div>
          </div>
          <div className="step completed">
            <div className="step-number">2</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className="step active">
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-label">Review</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="payment-content">
          <div className="payment-left">
            {/* Payment Information */}
            <div className="payment-section">
              <h2>Payment Information</h2>
              <div className="payment-form">
                <div className="form-group">
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      maxLength="4"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="payment-section">
              <h2>Billing address</h2>
              <div className="billing-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="London"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="England"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="W1A 4ZZ"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+44 20 7946 0123"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-right">
            {/* Order Summary */}
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-brand">Brand: {item.brand}</p>
                      <div className="item-rating">
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </div>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Order total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <button className="pay-now-btn" onClick={handleSubmit}>
                Pay Now
              </button>
            </div>

            {/* Help Section */}
            <div className="help-section">
              <a href="#" className="help-link">RETURN POLICY</a>
              <a href="#" className="help-link">HELP</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;