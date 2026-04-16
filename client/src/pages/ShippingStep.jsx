import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCart } from '../services/cartService';
import { orderAPI } from '../services/api';

export default function ShippingStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shipping: 12.87, // Default standard shipping value
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  
  const [formData, setFormData] = useState({
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 000-0000',
  });

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Delivery Friday, March 14',
      price: 12.87,
    },
    {
      id: 'express',
      name: 'Express',
      description: 'Delivered Tomorrow',
      price: 15,
    },
  ];

  // Fetch order totals from backend (same as payment page)
  const fetchOrderTotals = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrderTotals();
      if (response.data.success) {
        const orderData = response.data.data;
        // Use selected shipping or default to standard
        const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
        setOrderSummary({
          ...orderData,
          shipping: shippingCost,
          total: orderData.subtotal + shippingCost
        });
      } else {
        console.warn('No valid order data available');
        setFetchError(true);
        // Fallback to cart data if order totals fail
        await fetchCartData();
      }
    } catch (error) {
      console.error('Error fetching order totals:', error);
      setFetchError(true);
      // Fallback to cart data
      await fetchCartData();
    } finally {
      setLoading(false);
    }
  };

  // Fallback: Fetch cart items directly
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          const items = parsedCart.map(item => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            quantity: item.quantity || 1,
            image: item.image || '📦',
            brand: item.brand || 'Hexa'
          }));
          const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
          setOrderSummary({
            items: items,
            subtotal: subtotal,
            shipping: shippingCost,
            total: subtotal + shippingCost
          });
        }
        return;
      }
      
      const response = await getCart();
      
      if (response.data && response.data.items) {
        const items = response.data.items.map(item => ({
          id: item.product_id || item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          image: item.image || '📦',
          brand: item.brand || 'Hexa'
        }));
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
        setOrderSummary({
          items: items,
          subtotal: subtotal,
          shipping: shippingCost,
          total: subtotal + shippingCost
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    // Try to fetch from orderAPI first (like payment page)
    fetchOrderTotals();
  }, []);

  // Update total when shipping changes
  useEffect(() => {
    const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
    setOrderSummary(prev => ({
      ...prev,
      shipping: shippingCost,
      total: prev.subtotal + shippingCost
    }));
  }, [selectedShipping]);

  const handleContinue = () => {
    // Ensure shipping cost is saved with default value
    const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
    
    localStorage.setItem('shippingData', JSON.stringify(formData));
    localStorage.setItem('selectedShipping', selectedShipping);
    localStorage.setItem('shippingCost', shippingCost.toString());
    
    navigate('/payment', { 
      state: { 
        shippingData: formData,
        selectedShipping: selectedShipping,
        shippingCost: shippingCost,
        orderItems: orderSummary.items,
        subtotal: orderSummary.subtotal,
        total: orderSummary.subtotal + shippingCost,
        fromReview: false
      }
    });
  };

  const handleBack = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-400">Loading order summary...</p>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError && orderSummary.items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load order summary</p>
            <button 
              onClick={() => fetchOrderTotals()}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Steps - Labels on the right side of numbers (Increased Size) */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {['Address', 'Shipping', 'Payment', 'Review'].map((label, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold ${
                  index < 1 ? 'bg-white text-black' :
                  index === 1 ? 'bg-gray-500 text-white ring-4 ring-gray-500/50' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-base ${
                  index === 1 ? 'text-white font-semibold' : 'text-gray-300'
                }`}>
                  {label}
                </span>
              </div>
              {index < 3 && (
                <span className="text-gray-500 text-base font-medium">---</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-8">Shipping</h2>

                <div className="space-y-6">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id)}
                      className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={option.id}
                          className="block text-base font-semibold cursor-pointer"
                        >
                          {option.name}
                        </label>
                        <p className="text-sm text-gray-400">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">${option.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 px-6 border border-gray-600 rounded-lg font-semibold hover:border-gray-500 hover:bg-gray-900 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-600 transition-all transform hover:scale-[1.02]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary (Same as Payment Page) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-6">
              <h2 className="text-xl font-semibold text-yellow-500 mb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-800">
                    <img 
                      src={item.image && item.image !== '📦' ? item.image : 'https://via.placeholder.com/64'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/64';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Brand: {item.brand || 'Hexa'}</p>
                      <p className="text-sm font-semibold text-yellow-500 mt-1">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>SUBTOTAL</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Shipping</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-gray-800">
                  <span>Order total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">RETURN POLICY</a>
              <a href="#" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">HELP</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}