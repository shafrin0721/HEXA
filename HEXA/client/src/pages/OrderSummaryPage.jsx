import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export default function OrderSummaryPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  );
  const shipping = 12.87;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCompleteOrder = () => {
    navigate(`/success?total=${total.toFixed(2)}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="order-summary-container">
        <div className="order-header">
          <h1>Order Summary</h1>
          <div className="item-count">{itemCount} Items</div>
        </div>

        <div className="order-main">
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-left">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Brand: Hexa | Size: {item.variant} | Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="order-item-total">${(Number(item.price) * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="totals-row">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="order-total-row">
              <span>ORDER TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="complete-order-btn" onClick={handleCompleteOrder}>
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
