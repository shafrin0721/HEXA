export default function QuantitySelector({ value, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control">
      <button onClick={onDecrease}>-</button>
      <span>{value}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
}