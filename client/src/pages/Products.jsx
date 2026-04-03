import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        await addToCart(productId);
        alert('Added to cart!');
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            
            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-black focus:border-black"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-black focus:border-black"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                            <img 
                                src={product.image_url || '/api/placeholder/300/300'} 
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-semibold text-lg hover:text-gray-600">{product.name}</h3>
                                </Link>
                                <p className="text-gray-600 text-sm">{product.brand}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400">★</span>
                                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                </div>
                                <div className="mt-2 text-xl font-bold">${product.price}</div>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;