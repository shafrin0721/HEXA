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
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

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
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isFavorite = isInWishlist(product.id);

  const handleOpen = () => {
    navigate(`/product?id=${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Card එකේ onClick එක (navigate) වීම වළක්වයි
    toggleWishlist(product);
  };

  const getImageForProduct = (productId) => {
    const index = productId % designImages.length;
    return designImages[index];
  };

  const productImage = getImageForProduct(product.id);

  return (
    <div className="product-card relative group" onClick={handleOpen}>
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

      <div className="overflow-hidden rounded-t-xl h-[250px]">
        <img 
          src={productImage} 
          alt={product.name} 
          className="product-card-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>

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
  );
}