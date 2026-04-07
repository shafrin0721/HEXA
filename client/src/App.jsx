import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";
import CheckoutPage from "./pages/Checkout/Checkout";
import ShippingStep from "./pages/Checkout/ShippingStep";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from "./pages/Home";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/shipping" element={<ShippingStep />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as you develop */}
          </Routes>
        </main>
        <Footer />
      </div>
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
