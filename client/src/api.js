// src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const orderAPI = {
  // Get cart/order totals
  getOrderTotals: () => API.get('/orders/totals'),
  
  // Get order summary by ID
  getOrderSummary: (orderId) => API.get(`/orders/summary/${orderId}`),
  
  // Get all orders
  getAllOrders: () => API.get('/orders'),
  
  // Get single order
  getOrder: (id) => API.get(`/orders/${id}`),
  
  // Create new order
  createOrder: (orderData) => API.post('/orders', orderData),
  
  // Update order status
  updateOrderStatus: (id, status) => API.put(`/orders/${id}/status`, { status })
};

export const cartAPI = {
  // Add to cart
  addToCart: (productId, quantity) => API.post('/cart', { productId, quantity }),
  
  // Get cart items
  getCart: () => API.get('/cart'),
  
  // Update cart item
  updateCartItem: (productId, quantity) => API.put(`/cart/${productId}`, { quantity }),
  
  // Remove from cart
  removeFromCart: (productId) => API.delete(`/cart/${productId}`),
  
  // Clear cart
  clearCart: () => API.delete('/cart')
};

// Payment API - FIXED: Changed 'api' to 'API'
export const paymentAPI = {
  processPayment: (paymentData) => API.post('/payment/process', paymentData),
  getStripeKey: () => API.get('/stripeapi'),
};

export default API;