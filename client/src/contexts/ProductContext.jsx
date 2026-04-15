import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({});

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/products', { params: { page: 1, limit: 20 } });
      const data = response.data.products || response.data || [];
      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(Array.isArray(data) ? data : []);
      setPagination({
        total: data.length || 0,
        pages: 1,
        hasPrev: false,
        hasNext: false
      });
      setPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

    const filterProducts = useCallback((search = '', category = '', sort = 'name') => {
      let result = [...products];

      // Search
      if (search) {
        result = result.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Category
      if (category) {
        result = result.filter(p => p.category_id == category); // loose equality for string ids
      }

      // Sort
      switch (sort) {
        case 'price-low':
          result.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'price-high':
          result.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case 'name':
        default:
          result.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredProducts(result);
    }, [products]);

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      loading,
      error,
      pagination,
      page, setPage,
      refetch: () => fetchProducts(1),
      filterProducts,
      nextPage: () => setPage(p => p + 1),
      prevPage: () => setPage(p => Math.max(1, p - 1))
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

