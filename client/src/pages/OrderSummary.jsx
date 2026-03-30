import { useEffect, useState } from "react";
import orderMock from "../data/OrderMock";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();



  useState(orderMock);
 

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Summary</h1>

      {order.items.map((item, i) => (
        <div key={i}>
          <img src={item.image} width="50" />
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>Rs. {item.price}</p>

        <button onClick={() => navigate("/success")}>
         Place Order
        </button>

        </div>
      ))}

      <h3>Total: Rs. {order.total}</h3>
    </div>
  );
}

export default OrderSummary;