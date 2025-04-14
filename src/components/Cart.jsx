import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  FaShoppingCart, 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaArrowLeft, 
  FaShippingFast,
  FaInfoCircle,
  FaRegCreditCard,
  FaCreditCard,
  FaWallet,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import '../styles/Cart.css';

const Cart = () => {
  const { 
    items = [], 
    totalItems = 0, 
    totalAmount = 0, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    loading,
    error 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('card');
  
  // Demo coupons
  const validCoupons = [
    { code: 'FRESH20', discount: 20, type: 'percentage', minAmount: 500 },
    { code: 'WELCOME10', discount: 10, type: 'percentage', minAmount: 0 },
    { code: 'FLAT100', discount: 100, type: 'flat', minAmount: 1000 }
  ];
  
  // Loading State
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="error-container">
        <FaExclamationCircle className="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Empty Cart State
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <div className="empty-cart-actions">
            <Link to="/shop" className="shop-now-btn">
              Continue Shopping
            </Link>
            <Link to="/categories" className="browse-categories-btn">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle quantity change
  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Calculate subtotal for an item
  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };
  
  // Handle coupon application
  const applyCoupon = () => {
    // Reset previous coupon state
    setCouponApplied(false);
    setCouponError('');
    
    // Validate coupon
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    const foundCoupon = validCoupons.find(
      coupon => coupon.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (!foundCoupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (totalAmount < foundCoupon.minAmount) {
      setCouponError(`This coupon requires a minimum purchase of ₹${foundCoupon.minAmount}`);
      return;
    }
    
    // Apply coupon if valid
    setCouponApplied(true);
  };
  
  // Calculate coupon discount
  const calculateDiscount = () => {
    if (!couponApplied) return 0;
    
    const coupon = validCoupons.find(
      coupon => coupon.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return (totalAmount * coupon.discount / 100);
    } else {
      return coupon.discount;
    }
  };
  
  // Delivery fee calculation
  const deliveryFee = totalAmount > 500 ? 0 : 49;
  const discount = calculateDiscount();
  const finalTotal = totalAmount + deliveryFee - discount;
  
  // Calculate shipping time (demo)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart <span className="cart-count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span></h1>
          {items.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn">
              <FaTrash /> Clear Cart
            </button>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items-container">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-meta">
                      {item.category && (
                        <span className="item-category">{item.category}</span>
                      )}
                      {item.weight && (
                        <span className="item-weight">{item.weight}</span>
                      )}
                    </div>
                    <div className="item-price">₹{item.price}</div>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="item-subtotal">
                      <div className="subtotal-label">Subtotal:</div>
                      <div className="subtotal-value">₹{calculateSubtotal(item.price, item.quantity)}</div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                      <span className="remove-text">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="continue-shopping">
              <Link to="/shop" className="continue-link">
                <FaArrowLeft /> Continue Shopping
              </Link>
            </div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
            </div>
            
            {couponApplied && (
              <div className="summary-row discount-row">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-total">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
            
            {deliveryFee === 0 ? (
              <div className="free-delivery-message">
                <FaCheckCircle /> You've qualified for free delivery!
              </div>
            ) : (
              <div className="delivery-threshold">
                Add ₹{(500 - totalAmount).toFixed(2)} more for free delivery
              </div>
            )}
            
            <div className="coupon-section">
              <h3>Have a coupon?</h3>
              <div className="coupon-form">
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button 
                  onClick={applyCoupon} 
                  className="apply-coupon-btn"
                  disabled={couponApplied}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              
              {couponError && (
                <div className="coupon-error">
                  <FaExclamationCircle /> {couponError}
                </div>
              )}
              
              {couponApplied && (
                <div className="coupon-success">
                  <FaCheckCircle /> Coupon applied successfully!
                </div>
              )}
            </div>
            
            <div className="delivery-info">
              <div className="delivery-header">
                <FaShippingFast className="delivery-icon" />
                <h3>Delivery Information</h3>
              </div>
              
              <div className="delivery-time">
                <div className="time-option selected">
                  <div className="radio-button"></div>
                  <div className="time-details">
                    <span className="day">{formatDate(tomorrow)}</span>
                    <span className="hours">4:00 PM - 7:00 PM</span>
                  </div>
                  <span className="time-price">FREE</span>
                </div>
                
                <div className="time-option">
                  <div className="radio-button"></div>
                  <div className="time-details">
                    <span className="day">{formatDate(tomorrow)}</span>
                    <span className="hours">10:00 AM - 1:00 PM</span>
                  </div>
                  <span className="time-price">+₹30</span>
                </div>
              </div>
              
              <div className="delivery-note">
                <FaInfoCircle />
                <span>Orders placed before 8 PM will be delivered the next day.</span>
              </div>
            </div>
            
            <div className="payment-methods">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <div 
                  className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <FaCreditCard className="payment-icon" />
                  <span>Credit/Debit Card</span>
                </div>
                <div 
                  className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <FaWallet className="payment-icon" />
                  <span>UPI</span>
                </div>
                <div 
                  className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <FaRegCreditCard className="payment-icon" />
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;