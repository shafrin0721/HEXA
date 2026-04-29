import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingCart, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '/images/placeholder.jpg',
        quantity: 1,
        variant: 'S',
      },
    });
    // විෂ්ලිස්ට් එකෙන් අයින් කරන්න අවශ්‍ය නම් පමණක් පහත ලයින් එක පාවිච්චි කරන්න
    // toggleWishlist(product); 
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <HeartOff size={40} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          Save items you love here! They will be waiting for you whenever you're ready to make them yours.
        </p>
        <Link 
          to="/products" 
          className="px-8 py-3 bg-[#d4af37] text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12 border-b border-[#2a2a2a] pb-6">
        <h1 className="text-4xl font-extrabold text-white">My Wishlist</h1>
        <span className="text-[#d4af37] font-medium">{wishlist.length} Items saved</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden group hover:border-[#d4af37]/50 transition-all">
            <div className="relative h-[300px]">
              <img 
                src={product.image || '/images/placeholder.jpg'} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white truncate mb-2">{product.name}</h3>
              <div className="text-[#d4af37] text-2xl font-bold mb-6">
                ${Number(product.price).toFixed(2)}
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 h-12 bg-white/5 border border-[#2a2a2a] text-white font-semibold rounded-xl transition-all hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37]"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}