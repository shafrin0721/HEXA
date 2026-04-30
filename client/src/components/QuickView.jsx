import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function QuickView({ product, isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState('S');
  const { dispatch } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1, variant: selectedSize },
    });

    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffffff']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={onClose}>
      <div 
        className="bg-[#1a1a1a] border border-[#2a2a2a] w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white bg-black/20 p-1 rounded-full">
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 h-[300px] md:h-auto">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
          <div className="text-[#d4af37] text-xl font-bold mb-4">${Number(product.price).toFixed(2)}</div>
          
          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-2">Select Size</label>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg border text-sm font-bold transition-all ${selectedSize === size ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'border-[#2a2a2a] text-white hover:border-gray-500'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#d4af37] transition-colors"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}