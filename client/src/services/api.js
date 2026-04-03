import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

// Product APIs
export const productAPI = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
    getCart: () => api.get('/cart'),
    addToCart: (productId, quantity = 1) => api.post('/cart/add', { productId, quantity }),
    updateQuantity: (productId, quantity) => api.put(`/cart/update/${productId}`, { quantity }),
    removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
};

export default api;