import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
    const { user } = useAuth();

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 font-semibold text-gray-600">
                            <div className="col-span-5">Items</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-1 text-center">Total</div>
                            <div className="col-span-1"></div>
                        </div>
                        
                        {cartItems.map((item) => (
                            <div key={item.id} className="border-t px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="md:col-span-5 flex items-center space-x-4">
                                        <img 
                                            src={item.image_url || '/api/placeholder/80/80'} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.brand}</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 text-center">
                                        <span className="font-semibold">${item.price}</span>
                                    </div>
                                    <div className="md:col-span-3">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 text-center font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="md:col-span-1 text-center">
                                        <button
                                            onClick={() => removeFromCart(item.product_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Calculated at next step</span>
                            </div>
                        </div>
                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        {user ? (
                            <Link to="/checkout">
                                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                                    Login to Checkout
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
