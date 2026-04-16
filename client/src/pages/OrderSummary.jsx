import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import logo from "../assets/logo.png";
import productImg from "../assets/t- 6.jpg";
import productImg1 from "../assets/t-12.jpg";

function OrderSummary1() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/api/orders/1")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else if (Array.isArray(data.items)) {
            setOrders(data.items);
          } else if (Array.isArray(data.data)) {
            setOrders(data.data);
          } else {
            setOrders([data]);
          }
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setLoading(false);
        setOrders([]);
      });
  }, []);

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


      {/* Order Items Mapping */}
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((item, i) => (
          <div key={i} className="mb-4 p-4 border border-gray-700 rounded max-w-2xl mx-auto">
            <div className="flex gap-4 items-center">
              <img src={item.image || productImg} width="50" alt={item.name} className="mb-2" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity || 1}</p>
                <p>Rs. {item.price || 0}</p>
              </div>
              <button 
                onClick={() => navigate("/order-success")}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        ))
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
                  <img src={productImg} className="w-[70px] h-[70px] object-cover" alt={item.name} />
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