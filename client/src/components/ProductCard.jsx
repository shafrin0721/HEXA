// import { useNavigate } from 'react-router-dom';

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();

//   const handleOpen = () => {
//     navigate(`/product?id=${product.id}`);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="product-card" onClick={handleOpen}>
//       <img src={product.image} alt={product.name} className="product-card-image" />
//       <h3>{product.name}</h3>
//       <p>{product.description}</p>
//       <div className="stars">★★★★★</div>
//       <div className="card-price">${Number(product.price).toFixed(2)}</div>
//     </div>
//   );
// }
import { useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react'; // Eye icon එක එකතු කළා
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import QuickView from './QuickView';

const designImages = [
  '/images/Design/pexels-asif-hussain-139434523-13983318.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-36899307.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-36908562.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-36908564.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-36908588.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-37025819.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-37026122.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-37066757.jpg',
  '/images/Design/pexels-bandar-baant-2160637741-37092621.jpg',
  '/images/Design/pexels-ben-khatry-430197437-15943977.jpg',
  '/images/Design/pexels-edmilson-eucleni-64454054-11782729.jpg',
  '/images/Design/pexels-eliasdecarvalho-1007021.jpg',
  '/images/Design/pexels-mart-production-9558766.jpg',
  '/images/Design/pexels-oficialwallace-16526622.jpg',
  '/images/Design/pexels-palace-17400414.jpg',
  '/images/Design/pexels-rehman-alee-2153074881-32597798.jpg'
];

export default function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isFavorite = isInWishlist(product.id);

  const handleOpen = () => {
    navigate(`/product?id=${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation(); 
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation(); // Card එකේ link එක වැඩ කිරීම වළක්වයි
    setIsQuickViewOpen(true);
  };

  const getImageForProduct = (productId) => {
    const index = productId % designImages.length;
    return designImages[index];
  };

  const productImage = getImageForProduct(product.id);

  return (
    <>
      <div className="product-card relative group cursor-pointer" onClick={handleOpen}>
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 transition-all hover:scale-110 active:scale-95"
        >
          <Heart 
            size={18} 
            fill={isFavorite ? "#d4af37" : "none"} 
            className={isFavorite ? "text-[#d4af37]" : "text-white/70"} 
          />
        </button>

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-xl h-[250px]">
          <img 
            src={productImage} 
            alt={product.name} 
            className="product-card-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          
          {/* Quick View Button - පින්තූරය උඩින් මවුස් එක තියද්දී පෙනේ */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={handleQuickViewClick}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37]"
            >
              <Eye size={16} /> Quick View
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 bg-[#1a1a1a] rounded-b-xl border-x border-b border-[#2a2a2a]">
          <h3 className="text-white font-semibold truncate">{product.name}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-1">{product.description}</p>
          <div className="stars text-[#d4af37] text-xs mt-2">★★★★★</div>
          <div className="flex justify-between items-center mt-3">
            <div className="card-price text-[#d4af37] font-bold text-lg">
              ${Number(product.price).toFixed(2)}
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">
              {product.category || "General"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickView 
        product={{ ...product, image: productImage }} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}