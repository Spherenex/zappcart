import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  FaShoppingCart, 
  FaStar, 
  FaHeart, 
  FaRegHeart, 
  FaEye,
  FaCheck,
  FaFire,
  FaLeaf,
  FaMedal
} from 'react-icons/fa';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Check if product is already in cart
  const isInCart = items.some(item => item.id === product.id);

  const {
    id,
    name,
    price,
    description,
    image,
    category,
    rating,
    ratingCount,
    discount,
    inStock,
    weight,
    features = [],
    isNew = Math.random() > 0.7, // Random for demo
    isBestSeller = Math.random() > 0.8, // Random for demo
    isOrganic = Math.random() > 0.75, // Random for demo
    isPremium = price > 600 // Random for demo
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inStock && !isInCart) {
      addToCart(product);
      setShowSuccess(true);
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // In a real app, you would call a wishlist context/service here
  };

  const calculateDiscountedPrice = () => {
    if (discount) {
      return {
        original: price,
        discounted: Math.round(price - (price * discount / 100))
      };
    }
    return { original: price, discounted: price };
  };

  const priceObj = calculateDiscountedPrice();
  
  // Calculate available stock percentage for visual indicator (random for demo)
  const stockPercentage = Math.floor(Math.random() * 100);
  const isLowStock = stockPercentage < 30;

  return (
    <div 
      className={`product-card ${!inStock ? 'out-of-stock' : ''} ${imageLoaded ? 'image-loaded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image-container">
          <div className="image-skeleton"></div>
          <img 
            src={image} 
            alt={name} 
            className="product-image" 
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {discount > 0 && (
            <div className="product-badge discount-badge">
              <span>{discount}% OFF</span>
            </div>
          )}
          
          {isLowStock && inStock && (
            <div className="product-badge stock-badge">
              <span>Limited Stock</span>
            </div>
          )}
          
          {isNew && (
            <div className="product-badge new-badge">
              <span>NEW</span>
            </div>
          )}
          
          {isBestSeller && (
            <div className="product-badge bestseller-badge">
              <FaFire /> <span>Best Seller</span>
            </div>
          )}
          
          <button 
            className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
          
          {inStock && (
            <div className={`product-actions ${isHovered ? 'show' : ''}`}>
              <button 
                className={`cart-action ${isInCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? (
                  <>
                    <FaCheck /> Added
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> Add to Cart
                  </>
                )}
              </button>
              
              <Link to={`/product/${id}`} className="view-action">
                <FaEye /> Quick View
              </Link>
            </div>
          )}
          
          {showSuccess && (
            <div className="add-success bounce-in">
              <FaCheck /> Added to Cart!
            </div>
          )}
        </div>
        
        <div className="product-details">
          <div className="product-meta">
            <span className="product-category">{category}</span>
            
            {rating > 0 && (
              <div className="product-rating">
                <FaStar className="star-icon" />
                <span>{rating.toFixed(1)}</span>
                {ratingCount > 0 && (
                  <span className="rating-count">({ratingCount})</span>
                )}
              </div>
            )}
          </div>
          
          <h3 className="product-name">{name}</h3>
          
          <div className="product-tags">
            {isPremium && (
              <span className="product-tag premium-tag">
                <FaMedal /> Premium
              </span>
            )}
            
            {isOrganic && (
              <span className="product-tag organic-tag">
                <FaLeaf /> Organic
              </span>
            )}
            
            {weight && (
              <span className="product-tag weight-tag">
                {weight}
              </span>
            )}
          </div>
          
          <div className="product-price">
            {discount > 0 ? (
              <>
                <span className="discounted-price">₹{priceObj.discounted}</span>
                <span className="original-price">₹{priceObj.original}</span>
                <span className="saving">Save ₹{priceObj.original - priceObj.discounted}</span>
              </>
            ) : (
              <span className="regular-price">₹{priceObj.original}</span>
            )}
          </div>
          
          {features.length > 0 && (
            <div className="product-features">
              {features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
          )}
          
          {!inStock && (
            <div className="out-of-stock-label">
              Out of Stock
            </div>
          )}
          
          {inStock && isLowStock && (
            <div className="stock-indicator">
              <div className="stock-bar">
                <div 
                  className="stock-level" 
                  style={{ width: `${stockPercentage}%` }}
                ></div>
              </div>
              <span className="stock-text">Hurry! Only a few left</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;