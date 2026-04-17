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

export const orderAPI = {
  getOrderTotals: () => API.get('/orders/totals'),
  createOrder: (orderData) => API.post('/orders', orderData),
};

export const paymentAPI = {
  processPayment: (paymentData) => API.post('/payment/process', paymentData),
  getStripeKey: () => API.get('/stripeapi'),
};

export const getProducts = (page = 1, limit = 10) => API.get('/products', { params: { page, limit } });
export const getProductById = (id) => API.get(`/products/${id}`);
export const productAPI = {
  getProducts: (page = 1, limit = 10) => API.get('/products', { params: { page, limit } }),
  getProductById: (id) => API.get(`/products/${id}`),
};

export default API;