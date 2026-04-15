import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Product API functions
export const getProducts = (page = 1, limit = 10) => api.get('/products', { params: { page, limit } });
export const getProductById = (id) => api.get(`/products/${id}`);

export default api;
