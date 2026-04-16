import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import logo from "../assets/logo.png";
import productImg from "../assets/t-6.jpg";

function OrderSummary1() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderTotals();
  }, []);

  const fetchOrderTotals = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/orders/totals");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setOrderSummary(data.data);
        // Set orders array for the existing mapping logic
        setOrders(data.data.items || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (item) => {
    try {
      // Create order payload with all items
      const payload = {
        items: orders.map(order => ({
          id: order.id,
          name: order.name,
          price: order.price,
          quantity: order.quantity,
          image: order.image
        })),
        total: orderSummary ? orderSummary.total : orders.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        payment_intent_id: `pi_${Date.now()}`,
        payment_status: "completed",
        payment_info: {
          card_last4: "4242",
          card_type: "visa"
        }
      };

      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/order-success");
      } else {
        setError(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white p-5 font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white p-5 font-sans min-h-screen">
        <div className="border border-red-500 rounded p-4 mb-4 bg-red-900/20 max-w-2xl mx-auto">
          <p className="text-red-400">Error loading orders: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Retry
          </button>
        </div>
        <div className="border border-gray-600 p-5 m-5">
          <p className="text-center text-gray-400">No orders found. Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-5 font-sans min-h-screen">

      {/*Showing item count */}
{Array.isArray(orders) && orders.length > 0 ? (
  <>
    {/* Header showing total items */}
    <div className="max-w-2xl mx-auto mb-4 p-3 bg-gray-900 rounded border border-gray-700">
      <p className="text-gray-300">
        Total Items: <span className="text-yellow-500 font-bold">{orders.length}</span>
      </p>
    </div>
  </>
) : (
  <div className="text-center py-8 text-gray-400">
    <p>No items in your order.</p>
  </div>
)}

      {/* Order Summary Container */}
      <div className="border border-gray-500 p-5 m-5">
        <h2 className="text-center mt-5 text-gray-100 text-2xl font-bold">Order Summary</h2>

        {/* Table */}
        <div className="border border-gray-300 mx-[2cm]">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-2.5 border-b border-gray-300 font-bold">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {/* Table Rows */}
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((item) => (
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] py-12 border-b border-gray-300 items-center" key={item.id}>
                <div className="flex items-center gap-4 pl-5">
                  <img src={item.image || productImg} className="w-[70px] h-[70px] object-cover" alt={item.name} />
                  <span className="whitespace-nowrap">{item.name}</span>
                </div>
                <span>${item.price}</span>
                <span>{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No items in your order summary.</p>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] mt-4 font-bold border-none">
          <span className="col-span-3 text-right">Order total</span>
          <span className="text-center">
            ${Array.isArray(orders) && orders.length > 0 
              ? orders.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
              : "0.00"}
          </span>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-5">
          <button 
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-white border-none px-8 py-3 cursor-pointer hover:bg-yellow-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary1;