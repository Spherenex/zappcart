import React, { useEffect } from 'react';
import '../styles/about.css';
import premiummeat from '../assets/images/premiummeat.jpg'; // Adjust the path as necessary

const AboutSection = () => {
  // Add animation when elements come into view
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
    
    // Observe elements that should animate
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => observer.observe(item));
    
    const zappcartCard = document.querySelector('.zappcart-card');
    if (zappcartCard) observer.observe(zappcartCard);

    return () => {
      // Clean up the observer when component unmounts
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="text-center section-header">
          <h2 className="section-title">About ZappCart</h2>
          <h3 className="section-subtitle">
            Your trusted partner for premium quality meat delivered fresh to your door.
          </h3>
          <p>
            ZappCart is an innovative E-commerce platform designed to revolutionize the fresh meat delivery industry in 
            Bengaluru. Our business model connects local, certified meat vendors to customers, delivering fresh, high
            quality meat directly to their doorsteps. Unlike other competitors, ZappCart operates as a marketplace where 
            we manage customer experience and delivery logistics while working with trusted local vendors for product 
            fulfillment.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <h3 className="promise-title">Our Mission & Vision</h3>
            <p className="description">
              Our mission is to offer fresh, hygienic, and convenient meat delivery to urban consumers, ensuring the highest 
              standards of quality and customer satisfaction. We aim to build a trusted, seamless online meat marketplace 
              that not only meets the needs of modern consumers but also supports and empowers local meat vendors.
            </p>
            <div className="features">
              <div className="feature-item">
                <div className="icon">✔️</div>
                <div className="feature-text">
                  <h4 className="feature-title">Hyperlocal Delivery</h4>
                  <p>ZappCart ensures faster deliveries by sourcing fresh meat from nearby local 
                  vendors.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="icon">✔️</div>
                <div className="feature-text">
                  <h4 className="feature-title">Hygienic Processing</h4>
                  <p>Our meat is processed in state-of-the-art facilities maintaining strict hygiene protocols.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="icon">✔️</div>
                <div className="feature-text">
                  <h4 className="feature-title">Quick Delivery</h4>
                  <p>Our cold chain logistics ensure your order arrives fresh in the quickest time possible.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="icon">✔️</div>
                <div className="feature-text">
                  <h4 className="feature-title">Brand Control</h4>
                  <p>Customers interact only with the ZappCart platform, ensuring a consistent, premium 
                  experience.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="icon">✔️</div>
                <div className="feature-text">
                  <h4 className="feature-title">Convenience & Quality</h4>
                  <p>We focus on providing a seamless online ordering process and guaranteeing 
                  freshness and hygiene.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Product Card */}
          <div className="zappcart-container">
            <div className="zappcart-card">
              <div className="card-image">
                <img src={premiummeat} alt="Premium meat selection" />
                <div className="card-tag">Premium Quality</div>
              </div>
              <div className="card-content">
                <h3>Fresh Meat Selection</h3>
                <p>Locally sourced, certified meat delivered directly to your doorstep within hours.</p>
                <div className="card-features">
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Hygienically Processed</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>100% Fresh Guarantee</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Delivered in 45 Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;