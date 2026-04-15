import "./OrderSummary.css";
import avatar from "../assets/avatar.jpg";
import logo from "../assets/logo.png";
import productImg  from "../assets/t- 6.jpg";
import productImg1 from "../assets/t-12.jpg";
import { useEffect, useState } from "react";


function OrderSummary() {
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/1")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
  
  <div className="page"> 

  {/* Navbar */}
  <nav className="navbar">

  {/* LEFT SIDE */}
   <div className="nav-left">
    <img src={logo} className="logo" />
  </div>


  {/* CENTER */}
  <div className="nav-center">
    <span>Home</span>
    <span>Products</span>
    <span>About</span>
    <span>Contact</span>
  </div>

  {/* RIGHT SIDE */}
  <div className="nav-right">
    <span className="cart">🛒</span>
    <img src = {avatar} alt="avatar" className="icon"/>
  </div>
</nav>

  

 {/* Title */}
    <div className="order-container">
      <h2 className="title">Order Summary</h2>

      {/* Table */}
      <div className="table"> 
      <div className="table-header"></div>
          {orders.map((item) => (
  <div className="table-row" key={item.id}>
    
    <div className="item-cell">
      <img src={productImg} className="product-img" />
      <span>{item.name}</span>
    </div>

    <span>${item.price}</span>
    <span>{item.quantity}</span>
    <span>${(item.price * item.quantity).toFixed(2)}</span>
  </div>
  
  ))}
  </div>

       

      {/* Total */}
    <div className="order-total">
    <span className="label">Order total</span>
    <span className="value">$52.85</span>
    </div>

      {/* Button */}
      <div className="btn-container">
    <button className="btn">Continue Shopping</button>
    </div>
    
      

      {/* Footer */}
      <footer className="footer">
  {/* Back to top */}
  <button className="back-to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >Back to top</button>

  {/* Footer content */}
  <div className="footer-content">
    <div className="footer-box">

      <h4>Get to know us</h4>
      <p>Home</p>
      <p>About</p>
      <p>Contact</p>
      <p>Cart</p>

    </div>

    <div className="footer-box">
      <h4>Make money with us</h4>
      <p>Sell products</p>
      <p>Sell on Business</p>
      <p>Advertise your products</p>
      <p>Self-publish with us</p>
    </div>

    <div className="footer-box">
      <h4>Let us help you</h4>
      <p>Your Account</p>
      <p>Your Orders</p>
      <p>Return & Replacements</p>
      <p>Manage your Content and Devices</p>
      <p>Help</p>
    </div>

    <div className="footer-box">
        <h4></h4>
      <p>phone: +44 20 7946 0123</p>
      <p>Email: support@hexa.com</p>
      <p>Address: 123 Norther Park Lane, west London, W1A 477, United Kingdom.</p>
    </div>
  </div>
    <div className="copyright">
        <p>&copy; {} Hexa. All rights reserved.</p>
      </div>
</footer>
 </div>
 </div>
  );
}

export default OrderSummary;