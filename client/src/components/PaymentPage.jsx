import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { orderAPI, paymentAPI } from '../api';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getEmptyFormData = () => ({
    cardNumber: '',
    cardType: '',
    cvv: '',
    expiryDate: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: ''
  });

  const [formData, setFormData] = useState(getEmptyFormData());
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardBrand, setCardBrand] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const cardTypeOptions = [
    { value: 'visa', label: 'Visa', icon: '💳', logo: 'https://cdn.simpleicons.org/visa', color: '#1a1f71' },
    { value: 'mastercard', label: 'Mastercard', icon: '💳', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg', color: '#eb001b' },
  ];

  const clearAllStoredData = () => {
    const comingFromReview = location.state?.fromReview === true;
    // Only clear data if NOT coming from review page
    if (!comingFromReview) {
      localStorage.removeItem('paymentData');
      localStorage.removeItem('orderId');
      localStorage.removeItem('orderSummary');
      localStorage.removeItem('paymentIntentId');
      localStorage.removeItem('shippingData');
      localStorage.removeItem('addressData');
      localStorage.removeItem('cartData');
      localStorage.removeItem('checkoutData');
    }
  };

  const loadExistingData = () => {
    const savedPaymentData = localStorage.getItem('paymentData');
    const comingFromReview = location.state?.fromReview === true;
    
    // If coming from review page, load the saved data
    if (comingFromReview && savedPaymentData) {
      try {
        const paymentData = JSON.parse(savedPaymentData);
        setFormData({
          cardNumber: paymentData.cardNumber || '',
          cardType: paymentData.cardType || '',
          cvv: paymentData.cvv || '',
          expiryDate: paymentData.expiryDate || '',
          email: paymentData.email || '',
          firstName: paymentData.firstName || '',
          lastName: paymentData.lastName || '',
          address: paymentData.address || '',
          city: paymentData.city || '',
          state: paymentData.state || '',
          zipCode: paymentData.zipCode || '',
          phoneNumber: paymentData.phoneNumber || ''
        });
        return true;
      } catch (error) {
        console.error('Error loading saved payment data:', error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const comingFromReview = location.state?.fromReview === true;
    
    // Clear data only if NOT coming from review
    if (!comingFromReview) {
      clearAllStoredData();
    }
    
    const dataLoaded = loadExistingData();
    if (!dataLoaded && !comingFromReview) {
      setFormData(getEmptyFormData());
      setCardBrand(null);
      setErrors({});
    }

    fetchOrderTotals();
  }, [location.state]);

  // Save form data to localStorage whenever it changes (for review page edit)
  useEffect(() => {
    // Only save if we have valid form data
    if (formData.cardNumber || formData.email || formData.firstName) {
      localStorage.setItem('paymentData', JSON.stringify(formData));
    }
  }, [formData]);

  const fetchOrderTotals = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrderTotals();
      if (response.data.success) {
        setOrderSummary(response.data.data);
      } else {
        console.warn('No valid order data available');
        setFetchError(true);
      }
    } catch (error) {
      console.error('Error fetching order totals:', error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else {
      const cleanedNumber = formData.cardNumber.replace(/\s/g, '');
      if (cleanedNumber.length < 15 || cleanedNumber.length > 16) {
        newErrors.cardNumber = 'Card number must be 15-16 digits';
      }
    }
    
    if (!formData.cardType) {
      newErrors.cardType = 'Please select card type';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else {
      const cleanedNumber = formData.cardNumber.replace(/\s/g, '');
      const isAmex = /^3[47]/.test(cleanedNumber) || formData.cardType === 'amex';
      
      if (!/^\d{3}$/.test(formData.cvv)) {
        newErrors.cvv = `CVV must be 3 digits`;
      }
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month));
      const today = new Date();
      if (expiryDate < today) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      
      let formatted = '';
      for (let i = 0; i < cleaned.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' ';
        }
        formatted += cleaned[i];
      }
      
      value = formatted.slice(0, 19);
    }
    
    if (name === 'cardType') {
      setFormData({ ...formData, [name]: value });
      if (errors.cardType) {
        setErrors({ ...errors, cardType: '' });
      }
      return;
    }
    
    if (name === 'expiryDate') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      value = cleaned.slice(0, 5);
    }
    
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setPaymentStatus({ type: 'processing', message: 'Processing payment...' });
    
    try {
      const getTestPaymentToken = (cardType) => {
        const tokens = {
          'visa': 'pm_card_visa',
          'mastercard': 'pm_card_mastercard',
          'amex': 'pm_card_amex',
          'discover': 'pm_card_discover',
          'diners': 'pm_card_diners'
        };
        return tokens[cardType] || 'pm_card_visa';
      };
      
      const paymentMethodToken = getTestPaymentToken(formData.cardType);
      
      const paymentData = {
        amount: orderSummary.total,
        payment_method_token: paymentMethodToken,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        billing_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phoneNumber: formData.phoneNumber,
          email: formData.email
        }
      };
      
      console.log('Sending payment data with token:', paymentMethodToken);
      
      const paymentResponse = await paymentAPI.processPayment(paymentData);
      
      console.log('Payment response:', paymentResponse.data);
      
      if (paymentResponse.data.success && paymentResponse.data.payment_status === 'succeeded') {
        setPaymentStatus({ type: 'success', message: 'Payment successful! Redirecting to review...' });

        const shippingAddress = {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          number: formData.phoneNumber,
          email: formData.email
        };
        
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
        const cardLast4 = cleanCardNumber.slice(-4);
        
        const reviewData = {
          orderSummary: {
            items: orderSummary.items,
            subtotal: orderSummary.subtotal,
            total: orderSummary.total,
            shipping: orderSummary.shipping
          },
          paymentIntentId: paymentResponse.data.payment_intent_id,
          paymentInfo: {
            card_last4: cardLast4,
            card_type: formData.cardType,
            name: `${formData.firstName} ${formData.lastName}`,
            accountNumber: `**** **** **** ${cardLast4}`,
            paidDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          },
          shippingAddress: shippingAddress,
          deliveryDate: formattedDeliveryDate,
          userInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber
          }
        };
        
        localStorage.setItem('reviewOrderData', JSON.stringify(reviewData));
        
        setTimeout(() => {
          navigate('/review');
        }, 1500);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus({ 
        type: 'error', 
        message: error.response?.data?.message || error.message || 'Payment failed. Please try again.' 
      });
      setTimeout(() => setPaymentStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-page">
        <Header cartItemCount={0} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading order summary...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedCardType = cardTypeOptions.find(opt => opt.value === formData.cardType);

  const CardTypeDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="card-type-dropdown" ref={dropdownRef}>
        <div 
          className={`dropdown-header ${errors.cardType ? 'error' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown-header-content">
            {selectedCardType ? (
              <>
                {selectedCardType.logo ? (
                  <img src={selectedCardType.logo} alt={selectedCardType.label} className="card-logo" />
                ) : (
                  <span>{selectedCardType.icon}</span>
                )}
                <span>{selectedCardType.label}</span>
              </>
            ) : (
              <span>Select card type</span>
            )}
          </span>
          <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
        </div>
        
        {isOpen && (
          <div className="dropdown-menu">
            {cardTypeOptions.map(option => (
              <div
                key={option.value}
                className={`dropdown-option ${formData.cardType === option.value ? 'selected' : ''}`}
                onClick={() => {
                  handleChange({ target: { name: 'cardType', value: option.value } });
                  setIsOpen(false);
                }}
              >
                {option.logo ? (
                  <img src={option.logo} alt={option.label} className="card-logo" />
                ) : (
                  <span>{option.icon}</span>
                )}
                <span style={{ flex: 1 }}>{option.label}</span>
                {formData.cardType === option.value && <span>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="payment-page">
      <Header cartItemCount={orderSummary.items.reduce((sum, item) => sum + item.quantity, 0)} />
      
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

        {/* Payment Status Message */}
        {paymentStatus && (
          <div className={`payment-status ${paymentStatus.type}`}>
            {paymentStatus.type === 'processing' && '⏳'}
            {paymentStatus.type === 'success' && '✅'}
            {paymentStatus.type === 'error' && '❌'}
            <span>{paymentStatus.message}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="payment-content">
          <div className="payment-left">
            {/* Payment Information Section */}
            <div className="payment-section">
              <h2>Payment Information</h2>
              <div className="payment-form">
                <div className="form-group">
                  <label>Card number</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="19"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                  </div>
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                {/* Three columns in one row - Card Type, Expiry Date, CVV */}
                <div className="form-row-three">
                  <div className="form-group">
                    <label>Card Type</label>
                    <CardTypeDropdown />
                    {errors.cardType && <span className="error-message">{errors.cardType}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={`cvv-input ${errors.cvv ? 'error' : ''}`}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    <small className="helper-text">
                      3 digits
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address Section */}
            <div className="payment-section">
              <h2>Billing address</h2>
              <div className="billing-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" placeholder="San Francisco" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" placeholder="CA" value={formData.state} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="zipCode" placeholder="94105" value={formData.zipCode} onChange={handleChange} className={errors.zipCode ? 'error' : ''} />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input type="tel" name="phoneNumber" placeholder="+1 555-555-5555" value={formData.phoneNumber} onChange={handleChange} className={errors.phoneNumber ? 'error' : ''} />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-right">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-brand">Brand: {item.brand}</p>
                      <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>SUBTOTAL</span>
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

              <button className="pay-now-btn" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </div>

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