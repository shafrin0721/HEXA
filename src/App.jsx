import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import OrderSuccess from './components/OrderSuccess';

export default function App() {
  return (
    <div data-theme="dark">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/product?id=1" replace />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
      </CartProvider>
    </div>
  );
}
