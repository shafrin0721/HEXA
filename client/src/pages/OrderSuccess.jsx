import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderAPI } from "../services/api";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState("#11234556423146230");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        let orderId = location.state?.orderId;
        let orderNumberFromState = location.state?.orderNumber;
        
        if (orderNumberFromState) {
          setOrderNumber(orderNumberFromState);
          setIsLoading(false);
          return;
        }
        
        if (orderId) {
          const response = await orderAPI.getOrderById(orderId);
          if (response.data.success && response.data.order) {
            const formattedOrderNumber = `#${response.data.order.id}`;
            setOrderNumber(formattedOrderNumber);
            setOrderDetails(response.data.order);
          }
        } else {
          const savedOrderData = localStorage.getItem('reviewOrderData');
          if (savedOrderData) {
            const orderData = JSON.parse(savedOrderData);
            if (orderData.orderId) {
              const formattedOrderNumber = `#${orderData.orderId}`;
              setOrderNumber(formattedOrderNumber);
              setOrderDetails(orderData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location]);

  useEffect(() => {
    const clearCheckoutData = () => {
      const itemsToKeep = ['reviewOrderData', 'orderNumber'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!itemsToKeep.includes(key) && 
            (key.includes('paymentData') || 
             key.includes('addressData') || 
             key.includes('shippingData') || 
             key.includes('cartData') ||
             key === 'selectedShipping')) {
          localStorage.removeItem(key);
        }
      });
    };
    
    clearCheckoutData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-5">
      {/* Success Icon */}
      <div className="text-center">
        {/* Green Circle with Black Checkmark */}
        <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-black text-5xl font-bold">✓</span>
        </div>
        
        <h1 className="text-3xl font-bold text-green-500 mb-2">
          Your order was successful!
        </h1>
        
        <p className="text-xl text-gray-300 mb-4">
          Thanks for your purchase!
        </p>
        
        <p className="text-gray-400 mb-2">
          Your order number is
        </p>
        
        <p className="text-2xl font-bold text-yellow-500 mb-6">
          {orderNumber}
        </p>
        
        {orderDetails && (
          <div className="bg-gray-900 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-yellow-500 font-semibold">
                ${parseFloat(orderDetails.total || orderDetails.orderSummary?.total || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Payment Method:</span>
              <span className="text-gray-300">
                {orderDetails.paymentMethod || orderDetails.paymentInfo?.card_type?.toUpperCase() || 'Card'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Date:</span>
              <span className="text-gray-300">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        )}
        
        <p className="text-gray-400 mb-8">
          You'll receive an email confirming your order details
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate(`/track-order/${orderNumber.replace('#', '')}`)}
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition font-semibold"
          >
            Track your order
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
          >
            Back to home
          </button>
        
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;