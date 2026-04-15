const OrderSuccess = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <a href="/products" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">Continue Shopping</a>
    </div>
  );
};

export default OrderSuccess;
