import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import '../styles/ProductList.css';

const ProductList = ({ products: initialProducts, initialCategory = 'all' }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  // Filter out only chicken, mutton, and fish products initially
  useEffect(() => {
    const allowedCategories = ['chicken', 'mutton', 'fish'];
    
    const relevantProducts = initialProducts.filter(product => {
      const category = product.category.toLowerCase();
      return allowedCategories.some(allowed => category.includes(allowed));
    });
    
    setProducts(relevantProducts);
    setFilteredProducts(relevantProducts);
    setIsLoading(false);
  }, [initialProducts]);

  // Get unique categories - only chicken, mutton, and fish
  const categories = ['all', ...new Set(products.map(product => {
    const category = product.category.toLowerCase();
    if (category.includes('chicken')) return 'Chicken';
    if (category.includes('mutton')) return 'Mutton';
    if (category.includes('fish') || category.includes('seafood')) return 'Fish & Seafood';
    return product.category; // fallback
  }))];

  // Filter products based on search, category, and price range
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const productCategory = product.category.toLowerCase();
        
        if (selectedCategory.toLowerCase() === 'chicken') {
          return productCategory.includes('chicken');
        }
        if (selectedCategory.toLowerCase() === 'mutton') {
          return productCategory.includes('mutton');
        }
        if (selectedCategory.toLowerCase() === 'fish & seafood') {
          return productCategory.includes('fish') || productCategory.includes('seafood');
        }
        
        return productCategory === selectedCategory.toLowerCase();
      });
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="filters-section">
        {/* Search Bar */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for chicken, mutton, or fish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">
            <FaFilter /> Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="price-slider"
            />
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="price-input"
              />
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label className="filter-label">
            <FaSort /> Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;