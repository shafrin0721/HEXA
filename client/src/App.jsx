import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CheckoutPage from "./pages/Checkout/Checkout";
import ShippingStep from "./pages/ShippingStep/ShippingStep";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/shipping" element={<ShippingStep />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
