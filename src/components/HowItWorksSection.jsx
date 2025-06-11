import React, { useEffect } from 'react';
import '../styles/how-it-works.css';
import { showToast } from '../utils/toastUtils';
import appstore from '../assets/images/appStore.webp';
import playstore from '../assets/images/playstore.webp';
import applogo from '../assets/images/logo1.png'; // Adjust the path as necessary

const HowItWorksSection = () => {
  const steps = [
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      title: "Choose Your Products",
      description: "Browse our extensive selection of premium meat cuts and select your favorites."
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      ),
      title: "Place Your Order",
      description: "Add products to your cart and place your order with secure payment options."
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
      title: "We Deliver on Time",
      description: "Our experts prepare your order and deliver it to your doorstep in temperature-controlled packaging."
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      title: "Enjoy & Rate",
      description: "Cook and enjoy your premium meat products, then share your experience with us."
    }
  ];

  // Add scroll animations for steps
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger the animations for each step
          const steps = entry.target.querySelectorAll('.step-item');
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add('fade-in');
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe steps grid
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
      observer.observe(stepsGrid);
    }

    // Observe app promo section
    const appPromo = document.querySelector('.app-promo');
    if (appPromo) {
      observer.observe(appPromo);
    }

    return () => {
      // Clean up
      observer.disconnect();
    };
  }, []);

  const handleAppStoreClick = () => {
    showToast('App Store download coming soon!');
  };

  const handlePlayStoreClick = () => {
    showToast('Play Store download coming soon!');
  };

  return (
    <section id="how-it-works">
      <div className="container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-description">Ordering fresh meat from ZappCart is simple, fast, and convenient.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {/* Conditional rendering for the arrow */}
              {index < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="app-promo">
          <div className="app-promo-grid">
            <div className="app-promo-content">
              <h3 className="app-promo-title">Download Our App</h3>
              <p className="app-promo-text">Get the ZappCart app for a seamless meat ordering experience. Track your order in real-time, access exclusive deals, and more.</p>
              <div className="app-buttons">
                <img 
                  src={playstore}
                  alt="Play Store" 
                  className="app-button-img"
                  onClick={handlePlayStoreClick}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={appstore}
                  alt="App Store" 
                  className="app-button-img"
                  onClick={handleAppStoreClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className="app-promo-image-wrapper">
              <img src={applogo} alt="ZappCart Mobile App" className="app-promo-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;