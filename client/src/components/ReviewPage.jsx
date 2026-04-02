import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { orderAPI } from '../api';
import './ReviewPage.css';

const ReviewPage = () => {
  const navigate = useNavigate();
  
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: {
      name: '',
      address: '',
      city: '',
      zipCode: '',
      number: '',
      email: ''
    },
    paymentInfo: {
      name: '',
      accountNumber: '',
      paidDate: '',
      cardType: '',
      card_last4: '',
      payment_intent_id: ''
    },
    shipping: {
      method: 'Standard shipping',
      deliveryDate: ''
    },
    items: [],
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    paymentIntentId: ''
  });

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    // Retrieve data from localStorage
    const savedReviewData = localStorage.getItem('reviewOrderData');
    
    if (savedReviewData) {
      const data = JSON.parse(savedReviewData);
      
      setOrderDetails({
        shippingAddress: data.shippingAddress || {},
        paymentInfo: {
          name: data.paymentInfo.name || '',
          accountNumber: data.paymentInfo.accountNumber || '',
          paidDate: data.paymentInfo.paidDate || '',
          cardType: data.paymentInfo.card_type || '',
          card_last4: data.paymentInfo.card_last4 || '',
          payment_intent_id: data.paymentIntentId || ''
        },
        shipping: {
          method: 'Standard shipping',
          deliveryDate: data.deliveryDate || ''
        },
        items: data.orderSummary?.items || [],
        subtotal: data.orderSummary?.subtotal || 0,
        shippingCost: data.orderSummary?.shipping || 0,
        total: data.orderSummary?.total || 0,
        paymentIntentId: data.paymentIntentId || ''
      });
      setLoading(false);
    } else {
      // If no data found, redirect back to payment page
      console.log('No order data found, redirecting to payment');
      navigate('/payment');
    }
  }, [navigate]);

  const handleEdit = () => {
    // Navigate back to payment page for editing
    navigate('/payment', { 
      state: { fromReview: true } 
    });
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    
    try {
      // Prepare order data
      const orderData = {
        items: orderDetails.items,
        total: orderDetails.total,
        subtotal: orderDetails.subtotal,
        shipping: orderDetails.shippingCost,
        payment_intent_id: orderDetails.paymentIntentId,
        payment_status: 'succeeded',
        shipping_address: orderDetails.shippingAddress,
        payment_info: {
          card_last4: orderDetails.paymentInfo.card_last4,
          card_type: orderDetails.paymentInfo.cardType,
          payment_id: orderDetails.paymentIntentId
        }
      };
      
      console.log('Creating order with data:', orderData);
      
      // Create the order in database
      const orderResponse = await orderAPI.createOrder(orderData);
      
      if (orderResponse.data.success) {
        console.log('Order created successfully:', orderResponse.data);
        
        // Clear localStorage
        localStorage.removeItem('reviewOrderData');
        localStorage.removeItem('paymentData');
        localStorage.removeItem('orderSummary');
        
        // Show success message and redirect
        alert('Order placed successfully! Thank you for your purchase.');
        navigate('/order-success', { 
          state: { 
            orderId: orderResponse.data.data.order.id,
            orderDetails: orderResponse.data.data
          } 
        });
      } else {
        throw new Error('Order creation failed');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="review-page">
        <Header cartItemCount={0} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading order details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="review-page">
      <Header cartItemCount={orderDetails.items.reduce((total, item) => total + (item.quantity || 1), 0)} />
      
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
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-name">{orderDetails.shippingAddress.name || 'Not provided'}</p>
                <p className="info-address">
                  {orderDetails.shippingAddress.address && 
                    `${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.zipCode}`}
                </p>
                <p className="info-city">{orderDetails.shippingAddress.city}</p>
                <p className="info-number">{orderDetails.shippingAddress.number}</p>
                <p className="info-email">{orderDetails.shippingAddress.email}</p>
              </div>
            </div>

            {/* Payment Information Section */}
            <div className="review-section">
              <div className="section-header">
                <h3>Payment Information</h3>
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-name">{orderDetails.paymentInfo.name}</p>
                <p className="info-account">
                  Account number: {orderDetails.paymentInfo.accountNumber}
                </p>
                {orderDetails.paymentInfo.cardType && (
                  <p className="info-card-type">
                    Card type: {orderDetails.paymentInfo.cardType.toUpperCase()}
                  </p>
                )}
                <p className="info-date">Paid Date: {orderDetails.paymentInfo.paidDate}</p>
                <p className="info-transaction">
                  Transaction ID: {orderDetails.paymentIntentId}
                </p>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="review-section">
              <div className="section-header">
                <h3>Shipping method</h3>
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
              <div className="section-content">
                <p className="info-method">{orderDetails.shipping.method}</p>
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
                {orderDetails.items.reduce((total, item) => total + (item.quantity || 1), 0)} Item(s)
              </div>
              
              <div className="order-items">
                {orderDetails.items.map((item, index) => (
                  <div key={item.id || index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-brand">Brand: {item.brand || 'Hexa'}</p>
                      {item.rating && (
                        <div className="item-rating">
                          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                        </div>
                      )}
                      <p className="item-price">
                        ${(item.price || 0).toFixed(2)} x {item.quantity || 1}
                      </p>
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

              <button 
                className="continue-btn" 
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? 'Placing Order...' : 'Place Order'}
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
        <button 
          className="back-to-top" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewPage;