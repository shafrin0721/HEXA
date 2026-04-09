import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product 1</span>
              <span>$19.99</span>
            </div>
            <div className="flex justify-between">
              <span>Product 2</span>
              <span>$24.99</span>
            </div>
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>$44.98</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Payment Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition">
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}