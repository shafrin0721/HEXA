import { BrowserRouter, Routes, Route } from "react-router-dom";
import HexaHomePage from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutPage from "./pages/Checkout";
import ShippingStep from "./pages/ShippingStep";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogistics from "./pages/AdminLogistics";
import AdminSales from "./pages/AdminSales";
import AdminCustomers from "./pages/AdminCustomers";
import AdminCharts from "./pages/AdminCharts";
import AdminInventory from "./pages/AdminInventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<HexaHomePage />} />
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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/logistics" element={<AdminLogistics />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/charts" element={<AdminCharts />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
