import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/product?id=${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-card" onClick={handleOpen}>
      <img src={product.image} alt={product.name} className="product-card-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="stars">★★★★★</div>
      <div className="card-price">${Number(product.price).toFixed(2)}</div>
    </div>
  );
}