﻿// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useProducts } from '../context/ProductContext';
// import { useCart } from '../context/CartContext';

// export default function Home() {
//   const navigate = useNavigate();
//   const { products, loading, error } = useProducts();
//   const { dispatch } = useCart();
//   const [formData, setFormData] = React.useState({
//     name: '',
//     surname: '',
//     email: '',
//     inquiry: '',
//   });

//   const featuredProducts = React.useMemo(() => {
//     if (!products || products.length === 0) return [];
//     return products.slice(0, 4);
//   }, [products]);

//   const parsePrice = (price) => {
//     if (typeof price === 'number') return price;
//     if (typeof price === 'string') {
//       const numericPrice = parseFloat(price.replace(/[^0-9.-]/g, ''));
//       return isNaN(numericPrice) ? 0 : numericPrice;
//     }
//     return 0;
//   };

//   const formatPrice = (price) => {
//     const numericPrice = parsePrice(price);
//     return `$${numericPrice.toFixed(2)}`;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({ name: '', surname: '', email: '', inquiry: '' });
//     alert('Thank you for your inquiry! We will get back to you soon.');
//   };

//   const addToCart = (product) => {
//     dispatch({
//       type: 'ADD_ITEM',
//       payload: {
//         id: product.id,
//         name: product.name,
//         price: parsePrice(product.price),
//         image: product.image || product.images?.[0] || '/images/placeholder.jpg',
//         quantity: 1
//       }
//     });
//     navigate('/cart');
//   };

//   const buyNow = (product) => {
//     dispatch({
//       type: 'ADD_ITEM',
//       payload: {
//         id: product.id,
//         name: product.name,
//         price: parsePrice(product.price),
//         image: product.image || product.images?.[0] || '/images/placeholder.jpg',
//         quantity: 1
//       }
//     });
//     navigate('/order-summary');
//   };

//   const renderStars = (rating = 0) => {
//     const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
//     const fullStars = Math.floor(numericRating);
//     const hasHalfStar = numericRating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
//     return (
//       <>
//         {[...Array(fullStars)].map((_, i) => (
//           <span key={`full-${i}`} className="text-yellow-400">★</span>
//         ))}
//         {hasHalfStar && <span className="text-yellow-400">½</span>}
//         {[...Array(emptyStars)].map((_, i) => (
//           <span key={`empty-${i}`} className="text-gray-600">★</span>
//         ))}
//       </>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">

//       {/* Hero Section */}
//       <section className="relative h-96 bg-black overflow-hidden">
//         <img src="/images/Tshirtbrand.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="relative max-w-7xl mx-auto h-full flex items-center px-8">
//           <div>
//             <h1 className="text-7xl font-bold mb-4 leading-tight text-white">Welcome to HEXA</h1>
//             <p className="text-2xl text-gray-200 mb-8">Discover Your Perfect Style</p>
//             <Link to="/products" className="inline-block bg-black text-white px-12 py-3 rounded font-semibold hover:bg-gray-900">Shop Now</Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-8 bg-black border-b border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Features</p>
//             <h2 className="text-4xl font-bold mb-2">Everything you need to purchase</h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
//               <p className="text-gray-400 text-sm">Safe and reliable payment processing for all transactions</p>
//             </div>
//             <div className="text-center">
//               <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Order Tracking</h3>
//               <p className="text-gray-400 text-sm">Real-time updates on your order status and location</p>
//             </div>
//             <div className="text-center">
//               <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Quality Verification</h3>
//               <p className="text-gray-400 text-sm">Strict quality control measures for all products</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section */}
//       <section className="py-16 px-8 bg-black border-b border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          
//           {loading ? (
//             // Loading skeleton
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 animate-pulse">
//                   <div className="h-48 bg-gray-800"></div>
//                   <div className="p-4">
//                     <div className="h-5 bg-gray-800 rounded mb-2 w-3/4"></div>
//                     <div className="h-3 bg-gray-800 rounded mb-3 w-full"></div>
//                     <div className="h-4 bg-gray-800 rounded mb-3 w-1/2"></div>
//                     <div className="h-6 bg-gray-800 rounded mb-4 w-1/3"></div>
//                     <div className="flex gap-2">
//                       <div className="flex-1 h-8 bg-gray-800 rounded"></div>
//                       <div className="flex-1 h-8 bg-gray-800 rounded"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : error ? (
//             // Error state
//             <div className="text-center py-12">
//               <p className="text-red-500 mb-4">Failed to load products: {error}</p>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : featuredProducts.length === 0 ? (
//             // No products state
//             <div className="text-center py-12">
//               <p className="text-gray-400">No products available at the moment.</p>
//             </div>
//           ) : (
//             // Products grid
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredProducts.map((product) => (
//                 <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all">
//                   <Link to={`/product?id=${product.id}`} className="block h-48 overflow-hidden">
//                     <img 
//                       src={product.image || product.images?.[0] || '/images/placeholder.jpg'} 
//                       alt={product.name} 
//                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                       onError={(e) => {
//                         e.target.src = '/images/placeholder.jpg';
//                       }}
//                     />
//                   </Link>
//                   <div className="p-4">
//                     <Link to={`/product?id=${product.id}`}>
//                       <h3 className="font-bold text-base mb-2 hover:text-gray-300 transition-colors line-clamp-2">{product.name}</h3>
//                     </Link>
//                     <p className="text-gray-400 text-xs mb-3 line-clamp-2">{product.description || product.desc || 'Premium quality product'}</p>
//                     <div className="flex gap-1 mb-3">
//                       {renderStars(product.avg_rating || product.rating || 0)}
//                     </div>
//                     <p className="text-lg font-bold mb-4">{formatPrice(product.price)}</p>
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => addToCart(product)}
//                         className="flex-1 bg-white text-black py-2 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
//                         disabled={product.stock === 0}
//                       >
//                         {product.stock === 0 ? 'Out of Stock' : 'Add Cart'}
//                       </button>
//                       <button 
//                         onClick={() => buyNow(product)}
//                         className="flex-1 bg-yellow-500 text-black py-2 rounded text-sm font-semibold hover:bg-yellow-400 transition-colors"
//                         disabled={product.stock === 0}
//                       >
//                         Buy Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-16 px-8 bg-black border-b border-gray-800">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
//             <p className="text-gray-400 mb-4">Have any questions or need assistance?</p>
//             <p className="text-gray-400 mb-8">Our friendly customer support team is here to help. Reach out to us via the following methods:</p>
//             <div className="space-y-4 text-gray-400">
//               <p><span className="font-semibold">Phone:</span> +44 20 7946 0123</p>
//               <p><span className="font-semibold">Email:</span> support@hexa.com</p>
//               <p><span className="font-semibold">Address:</span> 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Name"
//                 className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Surname</label>
//               <input
//                 type="text"
//                 name="surname"
//                 value={formData.surname}
//                 onChange={handleInputChange}
//                 placeholder="Surname"
//                 className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-semibold mb-2">Inquiry</label>
//               <textarea
//                 name="inquiry"
//                 value={formData.inquiry}
//                 onChange={handleInputChange}
//                 placeholder="Inquiry"
//                 rows="4"
//                 className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               ></textarea>
//             </div>
//             <button type="submit" className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-100 transition-colors">Submit</button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Veritas Strength Tee', image: '/images/Design/pexels-bandar-baant-2160637741-36908564.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 2, name: 'Chorale Noir Tee', image: '/images/Design/pexels-bandar-baant-2160637741-37025819.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 3, name: 'Élan Focus Tee', image: '/images/Design/pexels-bandar-baant-2160637741-36899307.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
  { id: 4, name: 'Divinus Path Tee', image: '/images/Design/pexels-edmilson-eucleni-64454054-11782729.jpg', desc: 'Soft cotton tee with a classic cut, perfect for everyday wear.', price: '$19.99' },
];

export default function Home() {
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    email: '',
    inquiry: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', surname: '', email: '', inquiry: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative h-96 bg-black overflow-hidden">
        <img src="/images/Design/pexels-edmilson-eucleni-64454054-11782729.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-8">
          <div>
            <h1 className="text-7xl font-bold mb-4 leading-tight text-white">Welcome to HEXA</h1>
            <p className="text-2xl text-gray-200 mb-8">Discover Your Perfect Style</p>
            <Link to="/products" className="inline-block bg-black text-white px-12 py-3 rounded font-semibold hover:bg-gray-900">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Features</p>
            <h2 className="text-4xl font-bold mb-2">Everything you need to purchase</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Safe and reliable payment processing for all transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Order Tracking</h3>
              <p className="text-gray-400 text-sm">Real-time updates on your order status and location</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Quality Verification</h3>
              <p className="text-gray-400 text-sm">Strict quality control measures for all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-8 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="h-48">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">{product.desc}</p>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-lg font-bold mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white text-black py-2 rounded text-sm font-semibold hover:bg-gray-100">Add Cart</button>
                    <button className="flex-1 bg-yellow-500 text-black py-2 rounded text-sm font-semibold hover:bg-yellow-400">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8 bg-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-4">Have any questions or need assistance?</p>
            <p className="text-gray-400 mb-8">Our friendly customer support team is here to help. Reach out to us via the following methods:</p>
            <div className="space-y-4 text-gray-400">
              <p><span className="font-semibold">Phone:</span> +44 20 7946 0123</p>
              <p><span className="font-semibold">Email:</span> support@hexa.com</p>
              <p><span className="font-semibold">Address:</span> 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Inquiry</label>
              <textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="Inquiry"
                rows="4"
                className="w-full bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-100">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
}