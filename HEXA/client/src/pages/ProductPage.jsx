import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { getProductById } from '../services/api';

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  const productId = Number(searchParams.get('id')) || 1;

  useEffect(() => {
    const fetchProduct = async () => {
      if (products.length > 0) {
        const found = products.find(p => p.id === productId);
        if (found) {
          setProduct(found);
          setLoading(false);
          return;
        }
      }
      
      try {
        setLoading(true);
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, products]);

  const related = useMemo(() => {
    if (!product || productsLoading) return [];
    return products.filter(p => p.id !== product.id).slice(0, 4);
  }, [product, products, productsLoading]);

  const addToCart = (item, qty = 1, size = 'S') => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: qty,
        variant: size,
      },
    });
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
      navigate('/order-summary');
    }
  };

  if (loading) return (
    <Layout>
      <div className="loading">Loading product...</div>
    </Layout>
  );

  if (error || !product) return (
    <Layout>
      <div className="loading" style={{color: 'red'}}>{error || 'Product not found'}</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container">
        <div className="product-details-layout">
          <div className="product-image-panel">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
<div className="product-price">${Number(product.price).toFixed(2)}</div>
            
            <div className="option-group">
              <label className="option-label">Size:</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
              >
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <div className="action-row">
              <button className="btn btn-light" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-gold" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-products">
            <h2 className="related-products-title">Related Products</h2>
            <div className="related-products-grid">
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

