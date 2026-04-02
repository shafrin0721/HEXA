import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";
import CheckoutPage from "./pages/Checkout/Checkout";
import ShippingStep from "./pages/Checkout/ShippingStep";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/shipping" element={<ShippingStep />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
