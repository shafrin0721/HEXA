import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductsPage() {
  const { products, filteredProducts, paginatedProducts, loading, error, pagination, page, nextPage, prevPage, filterProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [minRating, setMinRating] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    brands: false,
    size: false,
    color: false
  });

  const categories = useMemo(() => {
    const raw = products.map(p => p.category || (p.category_id ? `Category ${p.category_id}` : 'Uncategorized'));
    return ['All', ...Array.from(new Set(raw))];
  }, [products]);

  const brands = useMemo(() => {
    const raw = products.map(p => p.name.split(' ')[0]); // Extract first word as brand
    return ['All', ...Array.from(new Set(raw))];
  }, [products]);

  const currentProducts = Array.isArray(paginatedProducts) ? paginatedProducts : [];

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (newCategory = activeCategory, newSort = sortOption, newMin = minPrice, newMax = maxPrice, newSearch = searchTerm, newStock = stockFilter, newBrand = brandFilter, newSize = sizeFilter, newColor = colorFilter, newRating = minRating) => {
    filterProducts(newSearch, newCategory === 'All' ? '' : newCategory, newSort, newMin, newMax, newStock, newBrand, newSize, newColor, newRating);
  };

  if (loading) return (
    <Layout>
      <div className="loading">Loading collection...</div>
    </Layout>
  );

  return (
    <Layout>
      <section className="product-list-hero">
        <div className="hero-content">
          <h1 className="hero-title">Clothing Collection</h1>
        </div>
      </section>

      <main className="product-list-main">
        <aside className="filters-sidebar">
            <div className="filter-group filter-search">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, value, stockFilter, brandFilter, sizeFilter, colorFilter, minRating);
                }}
              />
            </div>

            <div className="filter-group">
              <div className="filter-header" onClick={() => toggleSection('categories')}>
                <h3 className="filter-title">Categories</h3>
                {collapsedSections.categories ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
              {!collapsedSections.categories && (
                <div className="filter-chips">
                  {categories.map(category => (
                    <div
                      key={category}
                      className={`chip ${category === (activeCategory || 'All') ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(category === 'All' ? '' : category);
                        handleFilterChange(category === 'All' ? '' : category, sortOption, minPrice, maxPrice, searchTerm, stockFilter, brandFilter, sizeFilter, colorFilter, minRating);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <div className="filter-header" onClick={() => toggleSection('brands')}>
                <h3 className="filter-title">Brands</h3>
                {collapsedSections.brands ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
              {!collapsedSections.brands && (
                <div className="filter-chips">
                  {brands.map(brand => (
                    <div
                      key={brand}
                      className={`chip ${brand === (brandFilter || 'All') ? 'active' : ''}`}
                      onClick={() => {
                        setBrandFilter(brand === 'All' ? 'all' : brand.toLowerCase());
                        handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, searchTerm, stockFilter, brand === 'All' ? 'all' : brand.toLowerCase(), sizeFilter, colorFilter, minRating);
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Price range</h3>
              <div className="price-filters">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMinPrice(value);
                    handleFilterChange(activeCategory, sortOption, value, maxPrice, searchTerm, stockFilter, brandFilter, sizeFilter, colorFilter, minRating);
                  }}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMaxPrice(value);
                    handleFilterChange(activeCategory, sortOption, minPrice, value, searchTerm, stockFilter, brandFilter, sizeFilter, colorFilter, minRating);
                  }}
                />
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Availability</h3>
              <div className="filter-chips">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'in-stock', label: 'In Stock' },
                  { value: 'out-of-stock', label: 'Out of Stock' }
                ].map(option => (
                  <div
                    key={option.value}
                    className={`chip ${stockFilter === option.value ? 'active' : ''}`}
                    onClick={() => {
                      setStockFilter(option.value);
                      handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, searchTerm, option.value, brandFilter, sizeFilter, colorFilter, minRating);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header" onClick={() => toggleSection('size')}>
                <h3 className="filter-title">Size</h3>
                {collapsedSections.size ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
              {!collapsedSections.size && (
                <div className="filter-chips">
                  {[
                    { value: 'all', label: 'All Sizes' },
                    { value: 'xs', label: 'XS' },
                    { value: 's', label: 'S' },
                    { value: 'm', label: 'M' },
                    { value: 'l', label: 'L' },
                    { value: 'xl', label: 'XL' },
                    { value: 'xxl', label: 'XXL' }
                  ].map(option => (
                    <div
                      key={option.value}
                      className={`chip ${sizeFilter === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setSizeFilter(option.value);
                        handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, searchTerm, stockFilter, brandFilter, option.value, colorFilter, minRating);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <div className="filter-header" onClick={() => toggleSection('color')}>
                <h3 className="filter-title">Color</h3>
                {collapsedSections.color ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
              {!collapsedSections.color && (
                <div className="filter-chips">
                  {[
                    { value: 'all', label: 'All Colors' },
                    { value: 'black', label: 'Black' },
                    { value: 'white', label: 'White' },
                    { value: 'red', label: 'Red' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'green', label: 'Green' },
                    { value: 'yellow', label: 'Yellow' },
                    { value: 'purple', label: 'Purple' },
                    { value: 'gray', label: 'Gray' }
                  ].map(option => (
                    <div
                      key={option.value}
                      className={`chip ${colorFilter === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setColorFilter(option.value);
                        handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, searchTerm, stockFilter, brandFilter, sizeFilter, option.value, minRating);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Minimum Rating</h3>
              <select
                value={minRating}
                onChange={(e) => {
                  const value = e.target.value;
                  setMinRating(value);
                  handleFilterChange(activeCategory, sortOption, minPrice, maxPrice, searchTerm, stockFilter, brandFilter, sizeFilter, colorFilter, value);
                }}
              >
                <option value="">Any Rating</option>
                <option value="1">1+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Sort by</h3>
              <select
                value={sortOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setSortOption(value);
                  handleFilterChange(activeCategory, value, minPrice, maxPrice, searchTerm, stockFilter, brandFilter, sizeFilter, colorFilter, minRating);
                }}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
              </select>
            </div>

            <div className="filter-group">
              <button
                className="clear-filters"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('');
                  setSortOption('name');
                  setMinPrice('');
                  setMaxPrice('');
                  setStockFilter('all');
                  setBrandFilter('all');
                  setSizeFilter('all');
                  setColorFilter('all');
                  setMinRating('');
                  filterProducts('', '', 'name', '', '', 'all', 'all', 'all', 'all', '');
                }}
              >
                Clear filters
              </button>
            </div>
          </aside>
        <div>
          {error && (
            <div className="error-message">
              {error}. Please make sure the backend server is running at http://localhost:5000.
            </div>
          )}

          <div className="product-grid">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!loading && currentProducts.length === 0 && !error && (
            <div className="error-message">
              No products available right now. If you have a local backend, please start it and refresh the page.
            </div>
          )}

          {pagination.total > 0 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                onClick={prevPage} 
                disabled={!pagination.hasPrev}
              >
                Prev
              </button>

              <span className="page-info">
                Page {page} of {pagination.pages} • Showing {currentProducts.length} of {pagination.total} products
              </span>

              <button 
                className="page-btn" 
                onClick={nextPage} 
                disabled={!pagination.hasNext}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

