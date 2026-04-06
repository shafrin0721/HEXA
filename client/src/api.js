import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const orderAPI = {
  getOrderTotals: () => API.get('/orders/totals'),
  getOrderSummary: (orderId) => API.get(`/orders/summary/${orderId}`),

  getAllOrders: () => API.get('/orders'),
  
  getOrder: (id) => API.get(`/orders/${id}`),
  
  createOrder: (orderData) => API.post('/orders', orderData),
  
  updateOrderStatus: (id, status) => API.put(`/orders/${id}/status`, { status })
};

export const cartAPI = {
  addToCart: (productId, quantity) => API.post('/cart', { productId, quantity }),
  
  getCart: () => API.get('/cart'),
  
  updateCartItem: (productId, quantity) => API.put(`/cart/${productId}`, { quantity }),
  
  removeFromCart: (productId) => API.delete(`/cart/${productId}`),
  
  clearCart: () => API.delete('/cart')
};

export const paymentAPI = {
  processPayment: (paymentData) => API.post('/payment/process', paymentData),
  getStripeKey: () => API.get('/stripeapi'),
};

export default API;