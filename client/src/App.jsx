import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PaymentPage from "./components/PaymentPage";
import ReviewPage from "./components/ReviewPage";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from './pages/Auth';
import HexaHomePage from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutPage from "./pages/Checkout";
import ShippingStep from "./pages/ShippingStep/ShippingStep";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogistics from "./pages/AdminLogistics";
import AdminSales from "./pages/AdminSales";
import AdminCustomers from "./pages/AdminCustomers";
import AdminCharts from "./pages/AdminCharts";
import AdminInventory from "./pages/AdminInventory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="hexal-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="*" element={<NotFound />} />
              
              {/* Admin Routes */}
           <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/admin/logistics" element={<AdminLogistics />} />
           <Route path="/admin/sales" element={<AdminSales />} />
           <Route path="/admin/customers" element={<AdminCustomers />} />
           <Route path="/admin/charts" element={<AdminCharts />} />
           <Route path="/admin/inventory" element={<AdminInventory />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;