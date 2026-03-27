const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: '$79.00',
    image:
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Gaming Mechanical Keyboard',
    price: '$129.00',
    image:
      'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    price: '$99.00',
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: '$109.00',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    name: 'Urban Hoodie',
    price: '$69.00',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    name: 'Travel Duffel Bag',
    price: '$139.00',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    name: 'Smart Fitness Band',
    price: '$89.00',
    image:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd8b6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    name: 'Premium Coffee Maker',
    price: '$179.00',
    image:
      'https://images.unsplash.com/photo-1522120692886-09f8f50ce2f7?auto=format&fit=crop&w=1200&q=80',
  },
]

function Products() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Our Collection</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Discover Products You Will Love</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Browse our modern selection of lifestyle essentials built for daily comfort and long-lasting quality.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="aspect-[3/4] overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 p-5">
              <h2 className="text-base font-semibold text-slate-900">{product.name}</h2>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900">{product.price}</p>
                <button
                  type="button"
                  className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Products
