import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context එක නිර්මාණය කිරීම
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // LocalStorage පාවිච්චි කරලා කලින් සේව් කරපු දත්ත ලබා ගැනීම
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist එක වෙනස් වන සෑම විටම LocalStorage එක අප්ඩේට් කිරීම
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // අයිතමයක් එකතු කිරීම හෝ ඉවත් කිරීම පාලනය කරන Function එක
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      
      if (isExist) {
        // දැනටමත් තියෙනවා නම් අයින් කරන්න
        return prev.filter((item) => item.id !== product.id);
      } else {
        // නැත්නම් අලුතින් එකතු කරන්න
        return [...prev, product];
      }
    });
  };

  // යම් අයිතමයක් Wishlist එකේ තියෙනවාදැයි බැලීමට (Heart icon එක පාට කරන්න)
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook එකක් ලෙස අපනයනය කිරීම (පාවිච්චිය ලේසි වෙන්න)
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};