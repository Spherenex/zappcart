import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "../contexts/AccountContext";
import { 
  FaUser, 
  FaShoppingBag, 
  FaHeart, 
  FaAddressCard, 
  FaSignOutAlt,
  FaShippingFast,
  FaEdit,
  FaArrowLeft,
  FaHistory,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaPhoneAlt,
  FaCheckCircle,
  FaTruck,
  FaWallet,
  FaHeadset,
  FaChevronRight
} from "react-icons/fa";
import "../styles/Account.css";
import LoginModal from "../components/LoginModal";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    isAuthenticated, 
    userProfile, 
    orders, 
    addresses, 
    wishlist,
    logout,
    updateProfile,
    setDefaultAddress,
    deleteAddress
  } = useAccount();
  
  // States
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({...userProfile});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Get query parameter for tab selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [isAuthenticated]);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  // Save profile function
  const saveProfile = () => {
    updateProfile(editableProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };
  
  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/');
  };

  // If not authenticated, show login modal
  if (!isAuthenticated) {
    return (
      <div className="account-page">
        <div className="login-prompt">
          <h2>Please login to access your account</h2>
          <button 
            className="login-btn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login Now
          </button>
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => navigate('/')}
            onLogin={handleLoginSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="user-dashboard">
          <div className="dashboard-sidebar">
            <div className="user-info-brief">
              <div className="user-avatar">
                <img src={userProfile.profileImage || "/api/placeholder/150/150?text=User"} alt={userProfile.name} />
              </div>
              <div className="user-details-brief">
                <h3>{userProfile.name}</h3>
                <p>{userProfile.phone}</p>
              </div>
            </div>
            
            <nav className="dashboard-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser /> My Profile
              </button>
              <button 
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <FaShoppingBag /> My Orders
              </button>
              <button 
                className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <FaAddressCard /> Manage Addresses
              </button>
              <button 
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <FaHeart /> My Wishlist
              </button>
              <button 
                className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                <FaWallet /> Saved Payments
              </button>
              <button 
                className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
                onClick={() => setActiveTab('support')}
              >
                <FaHeadset /> Help & Support
              </button>
              <button 
                className="nav-item logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </nav>
          </div>
          
          <div className="dashboard-content">
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <div className="tab-header">
                  <h2>My Profile</h2>
                  {!isEditing ? (
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditableProfile({...userProfile});
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={saveProfile}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="profile-content">
                  <div className="profile-image-section">
                    <div className="profile-image-container">
                      <img 
                        src={isEditing ? editableProfile.profileImage : userProfile.profileImage} 
                        alt="Profile" 
                      />
                      {isEditing && (
                        <button className="change-photo-btn">
                          Change Photo
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="profile-details">
                    <div className="detail-group">
                      <label>Full Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editableProfile.name}
                          onChange={(e) => setEditableProfile({
                            ...editableProfile,
                            name: e.target.value
                          })}
                        />
                      ) : (
                        <p>{userProfile.name}</p>
                      )}
                    </div>
                    
                    <div className="detail-group">
                      <label>Email Address</label>
                      {isEditing ? (
                        <input 
                          type="email" 
                          value={editableProfile.email}
                          onChange={(e) => setEditableProfile({
                            ...editableProfile,
                            email: e.target.value
                          })}
                        />
                      ) : (
                        <p>{userProfile.email}</p>
                      )}
                    </div>
                    
                    <div className="detail-group">
                      <label>Phone Number</label>
                      {isEditing ? (
                        <input 
                          type="tel" 
                          value={editableProfile.phone}
                          onChange={(e) => setEditableProfile({
                            ...editableProfile,
                            phone: e.target.value.replace(/\D/g, '')
                          })}
                          maxLength={10}
                        />
                      ) : (
                        <p>{userProfile.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="orders-tab">
                <div className="tab-header">
                  <h2>My Orders</h2>
                </div>
                
                {selectedOrder ? (
                  <div className="order-details">
                    <div className="order-details-header">
                      <button 
                        className="back-to-orders"
                        onClick={closeOrderDetails}
                      >
                        <FaArrowLeft /> Back to Orders
                      </button>
                      <h3>Order #{selectedOrder.id}</h3>
                      <div className="order-meta">
                        <span className="order-date">
                          Placed on {selectedOrder.date}
                        </span>
                        <span className={`order-status ${selectedOrder.status.toLowerCase()}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      <h4>Order Items</h4>
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map(item => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>₹{item.price.toFixed(2)}</td>
                              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="order-total-label">Order Total</td>
                            <td className="order-total-value">₹{selectedOrder.total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    
                    <div className="delivery-info">
                      <h4>Delivery Information</h4>
                      <div className="delivery-address">
                        <p><strong>Address:</strong> 123 Main Street, Apartment 4B</p>
                        <p><strong>City:</strong> Bangalore, Karnataka - 560001</p>
                        <p><strong>Phone:</strong> 9876543210</p>
                      </div>
                      <div className="delivery-status">
                        <h4>Delivery Status</h4>
                        <div className="status-timeline">
                          <div className="status-step completed">
                            <div className="status-icon"><FaCheckCircle /></div>
                            <div className="status-text">
                              <p className="status-title">Order Placed</p>
                              <p className="status-time">May 15, 2023, 11:30 AM</p>
                            </div>
                          </div>
                          <div className="status-connector completed"></div>
                          
                          <div className="status-step completed">
                            <div className="status-icon"><FaCheckCircle /></div>
                            <div className="status-text">
                              <p className="status-title">Order Processed</p>
                              <p className="status-time">May 15, 2023, 2:45 PM</p>
                            </div>
                          </div>
                          <div className="status-connector completed"></div>
                          
                          <div className="status-step completed">
                            <div className="status-icon"><FaCheckCircle /></div>
                            <div className="status-text">
                              <p className="status-title">Out for Delivery</p>
                              <p className="status-time">May 16, 2023, 10:15 AM</p>
                            </div>
                          </div>
                          <div className="status-connector completed"></div>
                          
                          <div className="status-step completed">
                            <div className="status-icon"><FaCheckCircle /></div>
                            <div className="status-text">
                              <p className="status-title">Delivered</p>
                              <p className="status-time">May 16, 2023, 2:30 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-actions">
                      <button className="track-button">
                        <FaShippingFast /> Track Order
                      </button>
                      <button className="reorder-button">
                        Reorder
                      </button>
                      <button className="help-button">
                        <FaHeadset /> Need Help
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="orders-list">
                    <div className="orders-filter">
                      <button className="filter-option active">All Orders</button>
                      <button className="filter-option">Recent</button>
                      <button className="filter-option">Past 30 Days</button>
                    </div>
                    
                    {orders.length > 0 ? (
                      orders.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div className="order-id">Order #{order.id}</div>
                            <div className={`order-status ${order.status.toLowerCase()}`}>
                              {order.status}
                            </div>
                          </div>
                          
                          <div className="order-info">
                            <div className="order-date">
                              <span className="label">Placed on:</span>
                              <span className="value">{order.date}</span>
                            </div>
                            <div className="order-amount">
                              <span className="label">Total:</span>
                              <span className="value">₹{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="order-items-preview">
                            {order.items.map((item, index) => (
                              <div key={item.id} className="preview-item">
                                <div className="item-image-placeholder"></div>
                                <div className="item-details">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-qty">Qty: {item.quantity}</span>
                                </div>
                              </div>
                            )).slice(0, 2)}
                            {order.items.length > 2 && (
                              <div className="more-items">+{order.items.length - 2} more items</div>
                            )}
                          </div>
                          
                          <div className="order-actions">
                            <button 
                              className="view-details-btn"
                              onClick={() => viewOrderDetails(order)}
                            >
                              View Details <FaChevronRight />
                            </button>
                            <button className="track-order-btn">
                              <FaShippingFast /> Track Order
                            </button>
                            <button className="reorder-btn">
                              Reorder
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-orders">
                        <div className="empty-state">
                          <FaHistory className="empty-icon" />
                          <h3>No Orders Yet</h3>
                          <p>You haven't placed any orders yet.</p>
                          <button 
                            className="start-shopping-btn"
                            onClick={() => navigate('/shop')}
                          >
                            Browse Products
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="addresses-tab">
                <div className="tab-header">
                  <h2>Manage Addresses</h2>
                  <button className="add-button">
                    <FaMapMarkerAlt /> Add New Address
                  </button>
                </div>
                
                <div className="address-types">
                  <button className="address-type active">All</button>
                  <button className="address-type">Home</button>
                  <button className="address-type">Work</button>
                  <button className="address-type">Other</button>
                </div>
                
                <div className="addresses-list">
                  {addresses.map(address => (
                    <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                      {address.isDefault && (
                        <div className="default-badge">Default</div>
                      )}
                      <div className="address-icon">
                        {address.name === 'Home' ? <FaHome /> : <FaBuilding />}
                      </div>
                      <div className="address-info">
                        <h3 className="address-name">{address.name}</h3>
                        <div className="address-details">
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state} - {address.pincode}</p>
                          <p><FaPhoneAlt /> {address.phone}</p>
                        </div>
                      </div>
                      <div className="address-actions">
                        <button className="edit-address-btn">Edit</button>
                        <button 
                          className="delete-address-btn"
                          onClick={() => {
                            deleteAddress(address.id);
                            toast.success("Address removed successfully!");
                          }}
                        >
                          Delete
                        </button>
                        {!address.isDefault && (
                          <button 
                            className="set-default-btn"
                            onClick={() => {
                              setDefaultAddress(address.id);
                              toast.success("Default address updated!");
                            }}
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="address-card add-address-card">
                    <div className="add-address-content">
                      <FaMapMarkerAlt className="add-icon" />
                      <h3>Add New Address</h3>
                      <p>Add a new delivery address for your orders</p>
                      <button className="add-address-btn">Add Address</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="wishlist-tab">
                <div className="tab-header">
                  <h2>My Wishlist</h2>
                </div>
                
                {wishlist && wishlist.length > 0 ? (
                  <div className="wishlist-products">
                    <div className="wishlist-grid">
                      {/* Would render wishlist products here */}
                      <div className="wishlist-empty-placeholder">
                        <p>Wishlist items would appear here</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-wishlist">
                    <div className="empty-state">
                      <FaHeart className="empty-icon" />
                      <h3>Your Wishlist is Empty</h3>
                      <p>Save your favorite items to your wishlist.</p>
                      <button 
                        className="start-shopping-btn"
                        onClick={() => navigate('/shop')}
                      >
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div className="payments-tab">
                <div className="tab-header">
                  <h2>Saved Payments</h2>
                  <button className="add-button">
                    <FaWallet /> Add New Card
                  </button>
                </div>
                
                <div className="empty-payments">
                  <div className="empty-state">
                    <FaWallet className="empty-icon" />
                    <h3>No Saved Payment Methods</h3>
                    <p>Add a payment method for faster checkout.</p>
                    <button className="add-payment-btn">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'support' && (
              <div className="support-tab">
                <div className="tab-header">
                  <h2>Help & Support</h2>
                </div>
                
                <div className="support-options">
                  <div className="support-card">
                    <div className="support-icon">
                      <FaHeadset />
                    </div>
                    <div className="support-content">
                      <h3>Contact Customer Support</h3>
                      <p>Our team is here to help with any questions or issues</p>
                      <button className="contact-support-btn">
                        Chat with Us
                      </button>
                    </div>
                  </div>
                  
                  <div className="support-card">
                    <div className="support-icon">
                      <FaShoppingBag />
                    </div>
                    <div className="support-content">
                      <h3>Order Issues</h3>
                      <p>Need help with an existing order?</p>
                      <button 
                        className="view-orders-btn"
                        onClick={() => setActiveTab('orders')}
                      >
                        View My Orders
                      </button>
                    </div>
                  </div>
                  
                  <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faq-list">
                      <div className="faq-item">
                        <div className="faq-question">
                          <span>How do I track my order?</span>
                          <FaChevronRight />
                        </div>
                      </div>
                      <div className="faq-item">
                        <div className="faq-question">
                          <span>What is your return policy?</span>
                          <FaChevronRight />
                        </div>
                      </div>
                      <div className="faq-item">
                        <div className="faq-question">
                          <span>How can I cancel my order?</span>
                          <FaChevronRight />
                        </div>
                      </div>
                      <div className="faq-item">
                        <div className="faq-question">
                          <span>What payment methods do you accept?</span>
                          <FaChevronRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;