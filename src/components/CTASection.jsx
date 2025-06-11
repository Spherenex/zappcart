import React, { useState, useEffect } from 'react';
import '../styles/cta.css';
import { showToast } from '../utils/toastUtils';
import appStore from '../assets/images/appStore.webp';
import playStore from '../assets/images/playstore.webp';

const CTASection = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    phone: true
  });

  // Animation for CTA section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const ctaElements = document.querySelectorAll('.cta-left, .cta-form-box');
    ctaElements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3})?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/;
    
    const newIsValid = {
      name: formData.name.trim().length > 0,
      email: emailRegex.test(formData.email),
      phone: phoneRegex.test(formData.phone) || formData.phone.trim() === ''
    };
    
    setIsValid(newIsValid);
    return Object.values(newIsValid).every(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show success message
      setShowComingSoon(true);
      setTimeout(() => {
        setShowComingSoon(false);
      }, 300000); // Show for 3 seconds
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    }
  };

  const handleStoreClick = () => {
    showToast('App download coming soon!');
  };

  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-left">
            <h2 className="cta-title">Ready to Experience Fresh Meat Delivery?</h2>
            <p className="cta-subtitle">
              Download the ZappCart app now and get 20% off on your first order. Fresh, hygienic meat is just a few taps away!
            </p>
            <div className="app-buttons">
              <img 
                src={appStore} 
                alt="App Store" 
                className="store-badge" 
                onClick={handleStoreClick}
                style={{ cursor: 'pointer' }}
              />
              <img 
                src={playStore}
                alt="Google Play" 
                className="store-badge" 
                onClick={handleStoreClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="cta-form-box">
            <h3 className="form-title">Get Updates & Offers</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={!isValid.name ? 'error' : ''}
                />
                {!isValid.name && <small className="error-text">Please enter your name</small>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={!isValid.email ? 'error' : ''}
                />
                {!isValid.email && <small className="error-text">Please enter a valid email</small>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={!isValid.phone ? 'error' : ''}
                />
                {!isValid.phone && <small className="error-text">Please enter a valid phone number</small>}
              </div>
            
              <div className="button-wrapper">
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Subscribe Now
                </button>
                {showComingSoon && (
                  <div className="coming-soon-message">
                    🚀 Stay Tuned to get Fresh and Quality Meat
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;