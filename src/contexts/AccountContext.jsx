import React, { createContext, useState, useEffect, useContext } from 'react';
import Praveen from '../assets/Praveen.jpg'
// Create the context
const AccountContext = createContext();

// Sample user data for demonstration
const demoUserProfile = {
  name: "Praveen",
  email: "Praveen.doe@example.com",
  phone: "9876543210",
  profileImage: Praveen
};

// Sample orders data
const demoOrders = [
  {
    id: "ORD123456",
    date: "May 15, 2023",
    total: 849.00,
    status: "Delivered",
    items: [
      { id: 1, name: "Chicken Breast - Boneless", quantity: 2, price: 249.00 },
      { id: 2, name: "Atlantic Salmon", quantity: 1, price: 599.00 }
    ]
  },
  {
    id: "ORD123455",
    date: "Apr 30, 2023",
    total: 1249.00,
    status: "Delivered",
    items: [
      { id: 3, name: "Premium Mutton - Curry Cut", quantity: 1, price: 899.00 },
      { id: 4, name: "Fresh Prawns", quantity: 1, price: 350.00 }
    ]
  },
  {
    id: "ORD123454",
    date: "Apr 10, 2023",
    total: 649.00,
    status: "Delivered",
    items: [
      { id: 5, name: "Chicken Tikka Cut", quantity: 1, price: 349.00 },
      { id: 6, name: "Boneless Chicken", quantity: 1, price: 300.00 }
    ]
  }
];

// Sample addresses data
const demoAddresses = [
  {
    id: 1,
    name: "Home",
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
    address: "456 Work Avenue, Floor 3",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560002",
    phone: "9876543211",
    isDefault: false
  }
];

// Provider component
export const AccountProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userProfile, setUserProfile] = useState(demoUserProfile);
  const [orders, setOrders] = useState(demoOrders);
  const [addresses, setAddresses] = useState(demoAddresses);
  const [wishlist, setWishlist] = useState([]);

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Login function
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = (newProfile) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      ...newProfile
    }));
  };

  // Set default address
  const setDefaultAddress = (id) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
  };

  // Add new address
  const addAddress = (newAddress) => {
    const id = addresses.length > 0 ? Math.max(...addresses.map(addr => addr.id)) + 1 : 1;
    setAddresses(prevAddresses => [
      ...prevAddresses,
      { ...newAddress, id }
    ]);
  };

  // Delete address
  const deleteAddress = (id) => {
    setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      // Check if product already exists in wishlist
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const value = {
    isAuthenticated,
    userProfile,
    orders,
    addresses,
    wishlist,
    login,
    logout,
    updateProfile,
    setDefaultAddress,
    addAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook for using the account context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export default AccountContext;