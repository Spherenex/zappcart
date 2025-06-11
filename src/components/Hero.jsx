import React, { useState, useEffect } from 'react';
import '../styles/hero.css';
import home from '../assets/images/home.jpeg'; // Adjust the path as necessary

const Hero = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  // Add animation classes with delay on component mount
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.hero-description, .hero-buttons, .hero-features');
    
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 200 + (index * 200)); // Stagger the animations
    });
    
    // Add animation to hero image with delay
    const heroImage = document.querySelector('.hero-image-container');
    setTimeout(() => {
      if (heroImage) heroImage.style.opacity = '1';
    }, 500);
  }, []);

  // Handler for "Order Now" button
  const handleOrderNowClick = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 300); // Hide after 300ms
  };

  // Handler for "Learn More" button to scroll to the About section
  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Fresh Meat <br />
            <span className="hero-title-highlight">Delivered</span> To Your Doorstep
          </h1>
          <p className="hero-description">
            Order premium quality, hygienically handled meat products online. From qualified vendors to doorstep just in a few minutes.
          </p>
          <div className="hero-buttons">
            <div className="button-wrapper">
              <button 
                className="hero-button hero-button-primary" 
                onClick={handleOrderNowClick}
                aria-label="Order Now"
              >
                Order Now
              </button>
              {showComingSoon && (
                <div className="coming-soon-message">
                  🚀 Coming Soon!
                </div>
              )}
            </div>
            <button 
              className="hero-button hero-button-secondary" 
              onClick={handleLearnMoreClick}
              aria-label="Know More"
            >
              Know More
            </button>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <svg className="hero-feature-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="hero-feature-text">Fresh</span>
            </div>
            <div className="hero-feature">
              <svg className="hero-feature-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="hero-feature-text">Fast</span>
            </div>
            <div className="hero-feature">
              <svg className="hero-feature-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="hero-feature-text">Safe</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={home} alt="Fresh meat products" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;