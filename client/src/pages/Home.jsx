import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setFeaturedProducts(response.data.slice(0, 4));
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-4 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">HEXA Clothing</h1>
                    <p className="text-xl md:text-2xl mb-8">Premium quality, minimalist style</p>
                    <Link to="/products" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-gray-600 text-lg">
                        "At Hexa, we believe style is simple. We design premium-quality, minimalist t-shirts 
                        that blend comfort, durability, and statement-making aesthetics."
                    </p>
                </div>
            </div>

            {/* Featured Products */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img 
                                    src={product.image_url || '/api/placeholder/300/300'} 
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-600">{product.brand}</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                    </div>
                                    <div className="mt-2 text-xl font-bold">${product.price}</div>
                                    <Link 
                                        to={`/product/${product.id}`}
                                        className="mt-4 block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;