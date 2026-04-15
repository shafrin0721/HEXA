import React from 'react';

export default function Products() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product cards will go here */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Product 1</h3>
          <p className="text-gray-300 mb-4">Description of product 1</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Product 2</h3>
          <p className="text-gray-300 mb-4">Description of product 2</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Product 3</h3>
          <p className="text-gray-300 mb-4">Description of product 3</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}