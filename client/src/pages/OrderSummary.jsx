const OrderSummary = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
      <p>Your order details will appear here.</p>
      <a href="/payment" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">Proceed to Payment</a>
    </div>
  );
};

export default OrderSummary;
