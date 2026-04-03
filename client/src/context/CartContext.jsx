import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const loadCart = async () => {
        setLoading(true);
        try {
            const response = await cartAPI.getCart();
            setCartItems(response.data);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await cartAPI.addToCart(productId, quantity);
            await loadCart();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message };
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await cartAPI.updateQuantity(productId, quantity);
            await loadCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await cartAPI.removeFromCart(productId);
            await loadCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            getCartTotal,
            getItemCount,
            loadCart
        }}>
            {children}
        </CartContext.Provider>
    );
};