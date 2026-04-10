import React from 'react';

export default function Cart() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-gray-300 text-xl">Your cart is empty</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}