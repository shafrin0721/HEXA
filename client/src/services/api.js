// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
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

// Add response interceptor for better error logging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

export const orderAPI = {
  createOrder: (orderData) => API.post('/orders/create-order', orderData),
  getOrderTotals: () => API.get('/orders/totals'),
  getOrder: (orderId) => API.get(`/orders/${orderId}`),
};

export const paymentAPI = {
  processPayment: (paymentData) => {
    console.log('Sending payment request:', paymentData);
    return API.post('/payment/process', paymentData);
  },
  getStripeKey: () => API.get('/stripeapi'),
   convertTokenToPaymentMethod: (tokenData) => {
    console.log('Converting token to payment method:', tokenData);
    return API.post('/payment/convert-token', tokenData);
  },
};

export const getProducts = (page = 1, limit = 10) => API.get('/products', { params: { page, limit } });
export const getProductById = (id) => API.get(`/products/${id}`);
export const productAPI = {
  getProducts: (page = 1, limit = 10) => API.get('/products', { params: { page, limit } }),
  getProductById: (id) => API.get(`/products/${id}`),
};

export const checkoutAPI = {
  saveAddress: (addressData) => API.post('/checkout/address', addressData),
  getAddress: (userId) => API.get(`/checkout/address/${userId}`),
  updateAddress: (userId, addressData) => API.put(`/checkout/address/${userId}`, addressData),
};

export default API;