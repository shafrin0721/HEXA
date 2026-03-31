import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ReviewPage.css';

const ReviewPage = () => {
  const navigate = useNavigate();
  
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'London',
      zipCode: 'W1A 4ZZ',
      number: '+44 20 7946 0123'
    },
    paymentInfo: {
      name: 'John Doe',
      accountNumber: '**** **** **** 1234',
      paidDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    shipping: {
      method: 'Standard shipping',
      deliveryDate: 'Friday, March 14'
    },
    items: [],
    subtotal: 0,
    shippingCost: 12.87,
    total: 0
  });

  useEffect(() => {
    // Retrieve data from localStorage
    const savedOrderSummary = localStorage.getItem('orderSummary');
    const savedPaymentData = localStorage.getItem('paymentData');
    
    if (savedOrderSummary) {
      const orderData = JSON.parse(savedOrderSummary);
      setOrderDetails(prev => ({
        ...prev,
        items: orderData.items,
        subtotal: orderData.subtotal,
        total: orderData.total
      }));
    }
    
    if (savedPaymentData) {
      const paymentData = JSON.parse(savedPaymentData);
      setOrderDetails(prev => ({
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          name: `${paymentData.firstName} ${paymentData.lastName}`,
          accountNumber: `**** **** **** ${paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '1234'}`
        },
        shippingAddress: {
          ...prev.shippingAddress,
          name: `${paymentData.firstName} ${paymentData.lastName}`,
          address: paymentData.address || prev.shippingAddress.address,
          city: paymentData.city || prev.shippingAddress.city,
          zipCode: paymentData.zipCode || prev.shippingAddress.zipCode,
          number: paymentData.phoneNumber || prev.shippingAddress.number
        }
      }));
    }
  }, []);

  const handleEdit = (section) => {
    // Data is already saved in localStorage, just navigate back
    // You can optionally scroll to the specific section
    navigate('/');
  };

  const handleContinue = () => {
    alert('Order placed successfully!');
    // Clear localStorage after order placement
    localStorage.removeItem('paymentData');
    localStorage.removeItem('orderSummary');
    // Navigate to success page or home
    navigate('/');
  };

  return (
    <div className="review-page">
      <Header cartItemCount={2} />
      
      <div className="review-container">
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
          <div className="step completed">
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
          <div className="step active">
            <div className="step-number">4</div>
            <div className="step-label">Review</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="review-content">
          {/* Left Column */}
          <div className="review-left">
            {/* Shipping Address Section */}
            <div className="review-section">
              <div className="section-header">
                <h3>Shipping address</h3>
                <button className="edit-btn" onClick={() => handleEdit('shipping address')}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-name">{orderDetails.shippingAddress.name}</p>
                <p className="info-address">
                  {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.zipCode}
                </p>
                <p className="info-city">{orderDetails.shippingAddress.city}</p>
                <p className="info-number">{orderDetails.shippingAddress.number}</p>
              </div>
            </div>

            {/* Payment Information Section */}
            <div className="review-section">
              <div className="section-header">
                <h3>Payment Information</h3>
                <button className="edit-btn" onClick={() => handleEdit('payment information')}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-name">{orderDetails.paymentInfo.name}</p>
                <p className="info-account">
                  Account number: {orderDetails.paymentInfo.accountNumber}
                </p>
                <p className="info-date">Paid Date: {orderDetails.paymentInfo.paidDate}</p>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="review-section">
              <div className="section-header">
                <h3>Standard shipping</h3>
                <button className="edit-btn" onClick={() => handleEdit('shipping method')}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-delivery">
                  Delivery {orderDetails.shipping.deliveryDate}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="review-right">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="order-items-count">
                {orderDetails.items.reduce((total, item) => total + item.quantity, 0)} Item
              </div>
              
              <div className="order-items">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-brand">Brand: {item.brand}</p>
                      <div className="item-rating">
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </div>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>SUBTOTAL</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>${orderDetails.shippingCost.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Order total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <button className="continue-btn" onClick={handleContinue}>
                Place Order
              </button>
            </div>

            {/* Help Links */}
            <div className="help-links">
              <a href="#" className="help-link">RETURN POLICY</a>
              <a href="#" className="help-link">HELP</a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewPage;