import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const products = [
  {
    id: 1,
    name: 'Hexa Classic Tee',
    category: 'Classic Tee',
    description: 'Crafted from ultra-soft organic cotton.',
    fullDescription:
      'Experience comfort and style with our minimalist tee, crafted from ultra-soft organic cotton. Perfect for everyday wear, this versatile design fits seamlessly into any wardrobe.',
    price: 19.99,
    image: '/assets/t-6.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Veritas Strength Tee',
    category: 'Classic Tee',
    description: 'Premium cotton blend with strength design.',
    fullDescription:
      'A bold black tee designed for everyday confidence, made from soft premium cotton with a clean back graphic and a modern streetwear edge.',
    price: 24.99,
    image: '/assets/t-1.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Charole Noir Tee',
    category: 'Classic Tee',
    description: 'Elegant black tee with minimalist design.',
    fullDescription:
      'A refined oversized black tee with a statement back print, designed to deliver a luxury streetwear feel with everyday comfort.',
    price: 22.99,
    image: '/assets/t-2.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Elion Focus Tee',
    category: 'Classic Tee',
    description: 'Focus design for motivated individuals.',
    fullDescription:
      'A sleek modern black tee with strong vertical graphics, blending sharp style, premium comfort, and effortless daily wear.',
    price: 19.99,
    image: '/assets/t-3.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'Monogram Grid Tee',
    category: 'Classic Tee',
    description: 'Graphic-driven minimal tee with bold attitude.',
    fullDescription:
      'A clean white graphic tee with a structured typographic layout, crafted for a contemporary look with premium softness.',
    price: 21.99,
    image: '/assets/t- 4.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    name: 'Racecraft Signature Tee',
    category: 'Classic Tee',
    description: 'Streetwear staple with race-inspired visuals.',
    fullDescription:
      'A cream-toned streetwear piece with race-inspired back artwork, built for standout casual wear with refined comfort.',
    price: 23.99,
    image: '/assets/t5.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 7,
    name: 'Minimalis Air Tee',
    category: 'Classic Tee',
    description: 'Soft and subtle with a premium clean look.',
    fullDescription:
      'A lightweight essential with subtle detail work, designed for understated luxury and easy daily styling.',
    price: 20.99,
    image: '/assets/t-7.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'Broadcast Noir Tee',
    category: 'Classic Tee',
    description: 'Sharp front graphic with urban styling.',
    fullDescription:
      'Minimal yet expressive, this tee combines clean lines, premium fabric, and contemporary front typography for a polished streetwear look.',
    price: 21.49,
    image: '/assets/t-8.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 9,
    name: 'Justitia Statement Tee',
    category: 'Classic Tee',
    description: 'Bold statement piece for daily wear.',
    fullDescription:
      'An expressive white tee with a strong visual message, created for confident style and comfortable everyday use.',
    price: 22.49,
    image: '/assets/t - 9.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 10,
    name: 'Divinus Path Tee',
    category: 'Classic Tee',
    description: 'Spiritual path design tee.',
    fullDescription:
      'A clean graphic piece with meaningful visual direction, made for premium casual styling with personality.',
    price: 21.99,
    image: '/assets/t -10.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 11,
    name: 'Urban Luxe Code Tee',
    category: 'Classic Tee',
    description: 'Modern minimal tee with urban luxury vibe.',
    fullDescription:
      'A sleek neutral-toned piece with understated detail and a refined modern silhouette, perfect for elevated everyday styling.',
    price: 23.49,
    image: '/assets/t-7.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 12,
    name: 'Divine Script Tee',
    category: 'Classic Tee',
    description: 'Graphic tee with strong streetwear presence.',
    fullDescription:
      'A bold statement tee with powerful typography and premium fabric, designed for a striking luxury streetwear aesthetic.',
    price: 24.49,
    image: '/assets/t-12.jpg',
    rating: 5,
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export default function ProductPage() {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const params = new URLSearchParams(window.location.search);
  const selectedId = Number(params.get('id')) || 1;

  const product = products.find((item) => item.id === selectedId) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const related = useMemo(
    () => products.filter((item) => item.id !== product.id).slice(0, 4),
    [product.id]
  );

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
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate('/order-summary');
  };

  return (
    <Layout>
      <section className="product-details-layout container">
        <div className="product-image-panel">
          <img src={product.image} alt={product.name} className="product-main-image" />
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>

          <h1 className="product-title">{product.name}</h1>

          <p className="product-description">{product.fullDescription}</p>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="option-group">
            <label>Size</label>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Quantity</label>
            <QuantitySelector
              value={quantity}
              onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setQuantity((prev) => prev + 1)}
            />
          </div>

          <div className="action-row">
            <button className="btn btn-light" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-gold" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <button className="back-link back-link-btn" onClick={() => navigate('/product')}>
            ← Back to Products
          </button>
        </div>
      </section>

      <section className="related-products container">
        <h2 className="related-products-title">Related Products</h2>

        <div className="related-products-grid">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={(clickedProduct) => addToCart(clickedProduct, 1, clickedProduct.sizes[0])}
              onBuyNow={(clickedProduct) => {
                addToCart(clickedProduct, 1, clickedProduct.sizes[0]);
                navigate(`/product?id=${clickedProduct.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}