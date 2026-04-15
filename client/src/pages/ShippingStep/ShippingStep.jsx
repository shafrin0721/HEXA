import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCart } from '../../services/cartService';
import './shipping.css';

export default function ShippingStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  
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

  // Fetch cart items from backend using your existing cart API
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            setOrderItems(parsedCart);
            calculateTotal(parsedCart);
          }
          setLoading(false);
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
            brand: item.brand || 'Hexa',
            rating: item.rating || 5
          }));
          setOrderItems(items);
          setCartTotal(parseFloat(response.data.total) || 0);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setOrderItems(parsedCart);
          calculateTotal(parsedCart);
        }
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.cartItems) {
      setOrderItems(location.state.cartItems);
      calculateTotal(location.state.cartItems);
      setLoading(false);
    } else if (location.state?.orderData) {
      setOrderItems(location.state.orderData.items);
      setCartTotal(location.state.orderData.total);
      setLoading(false);
    } else {
      fetchCartData();
    }
  }, [location.state]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartTotal(total);
  };

  const subtotal = cartTotal;
  const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
  const total = subtotal + shippingCost;

  const handleContinue = () => {
    localStorage.setItem('shippingData', JSON.stringify(formData));
    localStorage.setItem('selectedShipping', selectedShipping);
    localStorage.setItem('shippingCost', shippingCost.toString());
    
    navigate('/payment', { 
      state: { 
        shippingData: formData,
        selectedShipping: selectedShipping,
        shippingCost: shippingCost,
        orderItems: orderItems,
        subtotal: subtotal,
        total: total
      }
    });
  };

  const handleBack = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading your order...</p>
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
                  className="flex-1 py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <p className="text-sm text-gray-400 mb-4">{orderItems.length} Items</p>

                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                      <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{item.icon || '📦'}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">Brand: {item.brand || 'Hexa'}</p>
                        {item.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(item.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs">★</span>
                            ))}
                          </div>
                        )}
                        {item.quantity && item.quantity > 1 && (
                          <p className="text-xs text-gray-400 mb-1">Quantity: {item.quantity}</p>
                        )}
                        <p className="font-semibold text-sm">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}