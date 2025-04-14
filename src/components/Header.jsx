import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAccount } from "../contexts/AccountContext";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaHeart,
  FaAngleDown
} from "react-icons/fa";
import "../styles/Header.css";
import Logo from '../assets/zapp.jpeg';
import LoginModal from "./LoginModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationAddress, setLocationAddress] = useState("N/35, 10th Main Rd, LIC Colony,...");
  const [popularSearches] = useState([
    "Chicken Breast", "Boneless Chicken", "Whole Chicken", "Drumsticks", "Chicken Wings", "Marinated Chicken"
  ]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isAuthenticated, login, logout } = useAccount();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Locations data
  const locations = [
    { id: 1, city: "Bangalore", areas: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "JP Nagar"] },
    { id: 2, city: "Mumbai", areas: ["Andheri", "Bandra", "Juhu", "Powai", "Worli"] },
    { id: 3, city: "Delhi", areas: ["Connaught Place", "Hauz Khas", "Dwarka", "Rohini", "Saket"] },
    { id: 4, city: "Chennai", areas: ["T Nagar", "Adyar", "Anna Nagar", "Velachery", "Besant Nagar"] },
  ];

  const [selectedCity, setSelectedCity] = useState(locations[0]);
  const [selectedArea, setSelectedArea] = useState(locations[0].areas[0]);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click Outside Handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }

      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  // Popular search click handler
  const handlePopularSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchFocused(false);
  };

  // Location selection handlers
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedArea(city.areas[0]);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setLocationAddress(`${area}, ${selectedCity.city}`);
    setIsLocationOpen(false);
  };

  // Use current location
  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAddress("Current Location");
          setIsLocationOpen(false);
          // Here you'd normally do geocoding to get the actual address
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Show error notification
        }
      );
    } else {
      // Show browser not supported notification
    }
  };

  // Handle login click
  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Handle login success
  const handleLoginSuccess = () => {
    login();
    setIsLoginModalOpen(false);
    navigate('/account');
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <img src={Logo} alt="Fresh Chicken Deliver Logo" className="logo-image" />
          </Link>

          {/* Location Selector */}
          <div className="location-container" ref={locationRef}>
            <div
              className="location-display"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <FaMapMarkerAlt className="location-icon" />
              <div className="location-text">
                <div className="location-label">Delivery to</div>
                <div className="selected-location">
                  {locationAddress}
                  <FaAngleDown className={`dropdown-icon ${isLocationOpen ? 'open' : ''}`} />
                </div>
              </div>
            </div>

            {isLocationOpen && (
              <div className="location-popup scale-in">
                <h4 className="location-popup-title">Choose your delivery location</h4>

                <button
                  className="use-current-location"
                  onClick={handleUseCurrentLocation}
                >
                  <FaMapMarkerAlt />
                  <span>Use current location</span>
                </button>

                <div className="location-tabs">
                  {locations.map(city => (
                    <button
                      key={city.id}
                      className={`location-tab ${selectedCity.id === city.id ? 'active' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.city}
                    </button>
                  ))}
                </div>

                <div className="location-areas">
                  {selectedCity.areas.map(area => (
                    <button
                      key={area}
                      className="area-btn"
                      onClick={() => handleAreaSelect(area)}
                    >
                      <FaMapMarkerAlt className="area-icon" />
                      <span>{area}, {selectedCity.city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div
            className={`search-container ${isSearchFocused ? 'focused' : ''}`}
            ref={searchContainerRef}
          >
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for chicken products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="search-input"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </form>

            {isSearchFocused && (
              <div className="search-dropdown scale-in">
                <div className="popular-searches">
                  <h4>Popular Searches</h4>
                  <div className="search-tags">
                    {popularSearches.map(term => (
                      <button
                        key={term}
                        className="search-tag"
                        onClick={() => handlePopularSearch(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/categories" className="nav-item">
              Categories
            </Link>
            <Link to="/shop" className="nav-item">
              Shop 
            </Link>
            <button 
              className="nav-item account-btn"
              onClick={handleLoginClick}
            >
              <FaUser className="nav-icon" />
              <span>{isAuthenticated ? 'Profile' : 'Login'}</span>
            </button>
            
            <Link to="/cart" className="nav-item cart-link">
              <FaShoppingCart className="nav-icon" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </>
  );
};

export default Header;