export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top ↑</div>
        <div className="footer-grid">
          <div>
            <h4>Get to Know Us</h4>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Make Money with Us</h4>
            <a href="#">Sell products</a>
            <a href="#">Sell on devices</a>
            <a href="#">Advertise Your Products</a>
          </div>
          <div>
            <h4>Let Us Help You</h4>
            <a href="#">Your Account</a>
            <a href="#">Your Orders</a>
            <a href="#">Returns & Replacements</a>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>Phone: +44 20 7946 0233</p>
            <p>Email: support@hexa.com</p>
            <p>124 Northern Place, West London, W1A 4ZZ, UK</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

