import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export default function OrderSuccess() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  );
  const shipping = 12.87;
  const orderTotal = subtotal + shipping;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="order-success">
        <CheckCircle size={96} className="success-icon" />
        <h1>Payment Successful!</h1>
        <p className="success-message">Thank you for your order.</p>
        <div className="success-details">
          <strong>Order Total: ${orderTotal.toFixed(2)}</strong>
        </div>
        <p className="redirect-note">Redirecting to home in 5 seconds...</p>
      </div>
    </Layout>
  );
}
