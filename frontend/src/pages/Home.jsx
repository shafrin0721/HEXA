import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const featuredProducts = [
  {
    id: 1,
    name: 'Noise-Canceling Headphones',
    price: '$149.00',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Minimal Leather Backpack',
    price: '$89.00',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Smart Home Speaker',
    price: '$119.00',
    image:
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Classic Analog Watch',
    price: '$199.00',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
  },
]

function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="Store showcase"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 w-fit rounded-full border border-indigo-300/40 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-200">
            New Season Collection
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Elevate Your Everyday Style With Premium Picks
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-200 sm:text-lg">
            Discover curated products that combine quality, comfort, and modern design.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Featured</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Top Products</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-slate-600 transition hover:text-slate-900">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-900">{product.price}</p>
                  <button
                    type="button"
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
