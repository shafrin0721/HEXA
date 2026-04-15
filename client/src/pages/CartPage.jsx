import { useMemo } from 'react';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  );
  const shipping = 12.87;
  const total = subtotal + shipping;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (id) => {
    dispatch({ type: 'INCREMENT', payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: 'DECREMENT', payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handlePayNow = () => {
    if (cart.length > 0) {
      window.location.href = '/order-summary';
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-gold">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-title">Shopping Cart ({cartItemCount})</div>
        <div className="cart-main-section">
          <section className="cart-items-section">
            <div className="cart-header-row">
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QTY</span>
              <span>SUBTOTAL</span>
              <span></span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-item-info">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>{item.variant || 'Classic Tee'}</p>
                  </div>
                </div>
                <div className="cart-price">${Number(item.price).toFixed(2)}</div>
                <div className="qty-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => handleDecrement(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => handleIncrement(item.id)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="cart-total">${Number(item.price * item.quantity).toFixed(2)}</div>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(item.id)} 
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </section>

          <div className="cart-summary">
            <div className="summary-item">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>$12.87</span>
            </div>
            <div className="summary-total">
              <span>ORDER TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="pay-btn" onClick={handlePayNow}>
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
