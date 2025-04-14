import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaCreditCard, 
  FaWallet, 
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaPhoneAlt,
  FaUser,
  FaTruck,
  FaClock,
  FaCalendarAlt,
  FaShieldAlt,
  FaInfoCircle
} from 'react-icons/fa';
import '../styles/Checkout.css';

// Sample address data
const savedAddresses = [
  {
    id: 1,
    name: "Home",
    fullName: "Praveen",
    address: "123 Main Street, Apartment 4B",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    phone: "9876543210",
    isDefault: true
  },
  {
    id: 2,
    name: "Office",
    fullName: "praveen",
    address: "456 Work Avenue, Floor 3",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560002",
    phone: "9876543211",
    isDefault: false
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalAmount, clearCart } = useCart();
  
  // States
  const [addressType, setAddressType] = useState('saved');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    type: 'home'
  });
  const [deliveryDate, setDeliveryDate] = useState('tomorrow');
  const [deliveryTime, setDeliveryTime] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});
  
  // Initialize selected address
  useEffect(() => {
    const defaultAddress = savedAddresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
  }, []);
  
  // Calculate delivery and total amounts
  const subtotal = totalAmount || 0;
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const expressDeliveryFee = deliveryTime === 'express' ? 30 : 0;
  const totalOrderAmount = subtotal + deliveryFee + tax + expressDeliveryFee;
  
  // Get estimated delivery date
  const getDeliveryDateText = () => {
    const today = new Date();
    if (deliveryDate === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    } else {
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      return dayAfterTomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
  };
  
  // Get delivery time slot text
  const getDeliveryTimeText = () => {
    if (deliveryTime === 'express') {
      return "Express (8 AM - 11 AM)";
    } else if (deliveryTime === 'standard') {
      return "Standard (2 PM - 6 PM)";
    } else {
      return "Evening (7 PM - 10 PM)";
    }
  };
  
  // Validate address form
  const validateAddress = () => {
    const newErrors = {};
    
    if (!newAddress.fullName) newErrors.fullName = "Name is required";
    if (!newAddress.phone) newErrors.phone = "Phone number is required";
    else if (newAddress.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    
    if (!newAddress.pincode) newErrors.pincode = "Pincode is required";
    else if (newAddress.pincode.length !== 6) newErrors.pincode = "Pincode must be 6 digits";
    
    if (!newAddress.address) newErrors.address = "Address is required";
    if (!newAddress.city) newErrors.city = "City is required";
    if (!newAddress.state) newErrors.state = "State is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate payment details
  const validatePayment = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!cardDetails.number) newErrors.cardNumber = "Card number is required";
      else if (cardDetails.number.replace(/\s/g, '').length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
      
      if (!cardDetails.name) newErrors.cardName = "Cardholder name is required";
      if (!cardDetails.expiry) newErrors.cardExpiry = "Expiry date is required";
      if (!cardDetails.cvv) newErrors.cardCvv = "CVV is required";
      else if (cardDetails.cvv.length !== 3) newErrors.cardCvv = "CVV must be 3 digits";
    } else if (paymentMethod === 'upi') {
      if (!upiId) newErrors.upiId = "UPI ID is required";
      else if (!upiId.includes('@')) newErrors.upiId = "Enter a valid UPI ID";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Handle form input change
  const handleChange = (e, formName) => {
    const { name, value } = e.target;
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    if (formName === 'address') {
      setNewAddress({
        ...newAddress,
        [name]: value
      });
    } else if (formName === 'card') {
      if (name === 'number') {
        setCardDetails({
          ...cardDetails,
          number: formatCardNumber(value)
        });
      } else {
        setCardDetails({
          ...cardDetails,
          [name]: value
        });
      }
    }
  };
  
  // Handle checkout submission
  const handleCheckout = () => {
    // Make sure items exist in cart
    if (!items || items.length === 0) {
      navigate('/cart');
      return;
    }
    
    // Validate address
    if (addressType === 'new' && !validateAddress()) {
      return;
    }
    
    // Validate payment details
    if (!validatePayment()) {
      return;
    }
    
    // Set loading state and simulate API call
    setIsPlacingOrder(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate random order ID
      const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      
      // Complete order
      setIsPlacingOrder(false);
      setOrderComplete(true);
      
      // Clear cart
      clearCart();
    }, 2000);
  };

  // If no items in cart, redirect to cart page
  useEffect(() => {
    if (!items || items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {orderComplete ? (
          <div className="order-success">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-id">Order ID: <span>{orderId}</span></p>
            <p className="success-message">
              Thank you for your order. We've received your order and will begin processing it right away.
              You'll receive a confirmation email shortly.
            </p>
            
            <div className="delivery-details">
              <div className="delivery-detail">
                <FaTruck className="detail-icon" />
                <div className="detail-content">
                  <h4>Delivery Date</h4>
                  <p>{getDeliveryDateText()}</p>
                </div>
              </div>
              <div className="delivery-detail">
                <FaClock className="detail-icon" />
                <div className="detail-content">
                  <h4>Delivery Time</h4>
                  <p>{getDeliveryTimeText()}</p>
                </div>
              </div>
            </div>
            
            <div className="success-actions">
              <Link to="/shop" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              <Link to={`/account?tab=orders`} className="view-order-btn">
                View Order
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="checkout-header">
              <h1>Checkout</h1>
              <Link to="/cart" className="back-to-cart">
                <FaArrowLeft /> Back to Cart
              </Link>
            </div>
            
            <div className="checkout-content">
              <div className="checkout-main">
                {/* Delivery Address Section */}
                <section className="checkout-section address-section">
                  <div className="section-header">
                    <h2>Delivery Address</h2>
                  </div>
                  
                  <div className="address-options">
                    <div className="option-tabs">
                      <button 
                        className={`option-tab ${addressType === 'saved' ? 'active' : ''}`}
                        onClick={() => setAddressType('saved')}
                      >
                        Saved Addresses
                      </button>
                      <button 
                        className={`option-tab ${addressType === 'new' ? 'active' : ''}`}
                        onClick={() => setAddressType('new')}
                      >
                        Add New Address
                      </button>
                    </div>
                    
                    {addressType === 'saved' ? (
                      <div className="saved-addresses">
                        {savedAddresses.map(address => (
                          <div 
                            key={address.id} 
                            className={`address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                            onClick={() => setSelectedAddress(address.id)}
                          >
                            <div className="address-icon">
                              {address.name === 'Home' ? <FaHome /> : <FaBuilding />}
                            </div>
                            <div className="address-details">
                              <h3 className="address-name">{address.name}</h3>
                              <p className="address-recipient">{address.fullName}</p>
                              <p className="address-line">{address.address}</p>
                              <p className="address-city">{address.city}, {address.state} - {address.pincode}</p>
                              <p className="address-phone">
                                <FaPhoneAlt className="phone-icon" /> {address.phone}
                              </p>
                            </div>
                            <div className="address-select">
                              {selectedAddress === address.id && <FaCheckCircle />}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="new-address-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="fullName">Full Name*</label>
                            <input 
                              type="text" 
                              id="fullName" 
                              name="fullName"
                              value={newAddress.fullName}
                              onChange={(e) => handleChange(e, 'address')}
                              className={errors.fullName ? 'error' : ''}
                            />
                            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone Number*</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              name="phone"
                              value={newAddress.phone}
                              onChange={(e) => handleChange(e, 'address')}
                              maxLength={10}
                              className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="pincode">Pincode*</label>
                            <input 
                              type="text" 
                              id="pincode" 
                              name="pincode"
                              value={newAddress.pincode}
                              onChange={(e) => handleChange(e, 'address')}
                              maxLength={6}
                              className={errors.pincode ? 'error' : ''}
                            />
                            {errors.pincode && <div className="error-message">{errors.pincode}</div>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="type">Address Type</label>
                            <div className="address-type-buttons">
                              <button 
                                type="button"
                                className={newAddress.type === 'home' ? 'active' : ''}
                                onClick={() => setNewAddress({...newAddress, type: 'home'})}
                              >
                                <FaHome /> Home
                              </button>
                              <button 
                                type="button"
                                className={newAddress.type === 'office' ? 'active' : ''}
                                onClick={() => setNewAddress({...newAddress, type: 'office'})}
                              >
                                <FaBuilding /> Office
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="address">Address (House No, Building, Street)*</label>
                          <textarea 
                            id="address" 
                            name="address"
                            value={newAddress.address}
                            onChange={(e) => handleChange(e, 'address')}
                            className={errors.address ? 'error' : ''}
                          ></textarea>
                          {errors.address && <div className="error-message">{errors.address}</div>}
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="city">City*</label>
                            <input 
                              type="text" 
                              id="city" 
                              name="city"
                              value={newAddress.city}
                              onChange={(e) => handleChange(e, 'address')}
                              className={errors.city ? 'error' : ''}
                            />
                            {errors.city && <div className="error-message">{errors.city}</div>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="state">State*</label>
                            <input 
                              type="text" 
                              id="state" 
                              name="state"
                              value={newAddress.state}
                              onChange={(e) => handleChange(e, 'address')}
                              className={errors.state ? 'error' : ''}
                            />
                            {errors.state && <div className="error-message">{errors.state}</div>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                
                {/* Delivery Slot Section */}
                <section className="checkout-section delivery-section">
                  <div className="section-header">
                    <h2>Delivery Slot</h2>
                  </div>
                  
                  <div className="delivery-options">
                    <div className="delivery-dates">
                      <h3>Choose Delivery Date</h3>
                      <div className="date-options">
                        <button 
                          className={`date-option ${deliveryDate === 'tomorrow' ? 'selected' : ''}`}
                          onClick={() => setDeliveryDate('tomorrow')}
                        >
                          <FaCalendarAlt className="date-icon" />
                          <div className="date-content">
                            <span className="date-label">Tomorrow</span>
                            <span className="date-value">{new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {weekday: 'short', day: 'numeric', month: 'short'})}</span>
                          </div>
                        </button>
                        
                        <button 
                          className={`date-option ${deliveryDate === 'dayafter' ? 'selected' : ''}`}
                          onClick={() => setDeliveryDate('dayafter')}
                        >
                          <FaCalendarAlt className="date-icon" />
                          <div className="date-content">
                            <span className="date-label">Day After Tomorrow</span>
                            <span className="date-value">{new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString('en-US', {weekday: 'short', day: 'numeric', month: 'short'})}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="delivery-times">
                      <h3>Choose Delivery Time</h3>
                      <div className="time-options">
                        <button 
                          className={`time-option ${deliveryTime === 'express' ? 'selected' : ''}`}
                          onClick={() => setDeliveryTime('express')}
                        >
                          <div className="time-content">
                            <span className="time-label">Express Delivery</span>
                            <span className="time-value">8 AM - 11 AM</span>
                          </div>
                          <span className="time-price">+₹30</span>
                        </button>
                        
                        <button 
                          className={`time-option ${deliveryTime === 'standard' ? 'selected' : ''}`}
                          onClick={() => setDeliveryTime('standard')}
                        >
                          <div className="time-content">
                            <span className="time-label">Standard Delivery</span>
                            <span className="time-value">2 PM - 6 PM</span>
                          </div>
                          <span className="time-price">Free</span>
                        </button>
                        
                        <button 
                          className={`time-option ${deliveryTime === 'evening' ? 'selected' : ''}`}
                          onClick={() => setDeliveryTime('evening')}
                        >
                          <div className="time-content">
                            <span className="time-label">Evening Delivery</span>
                            <span className="time-value">7 PM - 10 PM</span>
                          </div>
                          <span className="time-price">Free</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Payment Method Section */}
                <section className="checkout-section payment-section">
                  <div className="section-header">
                    <h2>Payment Method</h2>
                  </div>
                  
                  <div className="payment-options">
                    <div className="payment-methods">
                      <button 
                        className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <FaCreditCard className="payment-icon" />
                        <div className="payment-content">
                          <span className="payment-label">Credit / Debit Card</span>
                          <span className="payment-info">All major cards accepted</span>
                        </div>
                      </button>
                      
                      <button 
                        className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <FaWallet className="payment-icon" />
                        <div className="payment-content">
                          <span className="payment-label">UPI Payment</span>
                          <span className="payment-info">Google Pay, PhonePe, Paytm, etc.</span>
                        </div>
                      </button>
                      
                      <button 
                        className={`payment-method ${paymentMethod === 'cod' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <FaMoneyBillWave className="payment-icon" />
                        <div className="payment-content">
                          <span className="payment-label">Cash on Delivery</span>
                          <span className="payment-info">Pay when your order arrives</span>
                        </div>
                      </button>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="payment-form card-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cardNumber">Card Number*</label>
                            <input 
                              type="text" 
                              id="cardNumber" 
                              name="number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={(e) => handleChange(e, 'card')}
                              maxLength={19}
                              className={errors.cardNumber ? 'error' : ''}
                            />
                            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cardName">Cardholder Name*</label>
                            <input 
                              type="text" 
                              id="cardName" 
                              name="name"
                              placeholder="Name on card"
                              value={cardDetails.name}
                              onChange={(e) => handleChange(e, 'card')}
                              className={errors.cardName ? 'error' : ''}
                            />
                            {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                          </div>
                        </div>
                        
                        <div className="form-row card-small-inputs">
                          <div className="form-group">
                            <label htmlFor="cardExpiry">Expiry Date*</label>
                            <input 
                              type="text" 
                              id="cardExpiry" 
                              name="expiry"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => handleChange(e, 'card')}
                              maxLength={5}
                              className={errors.cardExpiry ? 'error' : ''}
                            />
                            {errors.cardExpiry && <div className="error-message">{errors.cardExpiry}</div>}
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="cardCvv">CVV*</label>
                            <input 
                              type="password" 
                              id="cardCvv" 
                              name="cvv"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => handleChange(e, 'card')}
                              maxLength={3}
                              className={errors.cardCvv ? 'error' : ''}
                            />
                            {errors.cardCvv && <div className="error-message">{errors.cardCvv}</div>}
                          </div>
                        </div>
                        
                        <div className="card-security">
                          <FaShieldAlt className="security-icon" />
                          <p>Your card information is secure and encrypted</p>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'upi' && (
                      <div className="payment-form upi-form">
                        <div className="form-group">
                          <label htmlFor="upiId">UPI ID*</label>
                          <input 
                            type="text" 
                            id="upiId" 
                            placeholder="yourname@bank"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              if (errors.upiId) {
                                setErrors({...errors, upiId: ''});
                              }
                            }}
                            className={errors.upiId ? 'error' : ''}
                          />
                          {errors.upiId && <div className="error-message">{errors.upiId}</div>}
                        </div>
                        
                        <div className="upi-note">
                          <FaInfoCircle className="note-icon" />
                          <p>You will receive a payment request on your UPI app</p>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'cod' && (
                      <div className="payment-form cod-form">
                        <div className="cod-note">
                          <FaInfoCircle className="note-icon" />
                          <div>
                            <p>Pay the full amount when your order is delivered</p>
                            <p>Cash, UPI and cards accepted on delivery</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
              
              <div className="checkout-sidebar">
                <div className="order-summary">
                  <h2>Order Summary</h2>
                  
                  <div className="order-items">
                    <h3>Items ({totalItems})</h3>
                    <div className="items-list">
                      {items.map(item => (
                        <div key={item.id} className="order-item">
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">x{item.quantity}</span>
                          </div>
                          <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="price-row">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {expressDeliveryFee > 0 && (
                      <div className="price-row">
                        <span>Express Delivery</span>
                        <span>₹{expressDeliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="price-row">
                      <span>Taxes</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="total-row">
                    <span>Total</span>
                    <span>₹{totalOrderAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="delivery-summary">
                    <div className="delivery-row">
                      <FaMapMarkerAlt className="delivery-icon" />
                      <div className="delivery-info">
                        <span className="info-label">Deliver to:</span>
                        <span className="info-value">
                          {addressType === 'saved' && selectedAddress ? (
                            savedAddresses.find(a => a.id === selectedAddress)?.address.substring(0, 30) + '...'
                          ) : (
                            newAddress.address ? newAddress.address.substring(0, 30) + '...' : 'Please select an address'
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="delivery-row">
                      <FaCalendarAlt className="delivery-icon" />
                      <div className="delivery-info">
                        <span className="info-label">Delivery Date:</span>
                        <span className="info-value">{getDeliveryDateText()}</span>
                      </div>
                    </div>
                    
                    <div className="delivery-row">
                      <FaClock className="delivery-icon" />
                      <div className="delivery-info">
                        <span className="info-label">Delivery Time:</span>
                        <span className="info-value">{getDeliveryTimeText()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="place-order-btn"
                    onClick={handleCheckout}
                    disabled={isPlacingOrder}
                  >
                    {isPlacingOrder ? (
                      <>Processing...</>
                    ) : (
                      <>Place Order</>
                    )}
                  </button>
                  
                  <p className="terms-agreement">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;