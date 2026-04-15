import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shipping.css';

export default function ShippingStep() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedShipping, setSelectedShipping] = useState('standard');
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

  const steps = [
    { number: 1, label: 'Address' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Review' },
  ];

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
  const shippingCost = selectedShipping === 'standard' ? 12.87 : 15;
  const total = subtotal + shippingCost;

  const handleContinue = () => {
    if (currentStep < 4) {
      if (currentStep === 2) {
        setCurrentStep(3);
      } else if (currentStep === 3) {
        setCurrentStep(4);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 2) {
        navigate('/checkout');
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex items-center gap-8 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-3 whitespace-nowrap">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors cursor-pointer ${
                    step.number <= currentStep
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    step.number <= currentStep ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <span className="text-gray-600 text-lg ml-2">--------</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
                  <p className="text-sm text-gray-400 mb-4">{orderItems.length} Item</p>

                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                      <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dy='0.3em' fill='%23666'%3E${item.image}%3C/text%3E%3C/svg%3E`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">Brand: {item.brand}</p>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(item.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                          ))}
                        </div>
                        <p className="font-semibold text-sm">${item.price.toFixed(2)}</p>
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
