import { useProducts } from '../contexts/ProductContext';

const ProductsPage = () => {
  const { filteredProducts, loading, error, filterProducts } = useProducts();

  const handleSearch = (e) => {
    filterProducts(e.target.value);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <input 
        type="text" 
        placeholder="Search products..." 
        onChange={handleSearch}
        className="mb-4 p-2 border w-full max-w-md rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-6 rounded-lg shadow-md hover:shadow-lg">
            <img 
              src={product.image || '/placeholder.jpg'} 
              alt={product.name} 
              className="w-full h-64 object-cover mb-4 rounded" 
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8">No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;
