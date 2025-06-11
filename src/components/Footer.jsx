

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import applogo from '../assets/images/logo1.png';
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaLinkedinIn, FaTwitter, FaInstagram, FaPaperPlane } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle logo click - navigate to home and scroll to top
  const handleLogoClick = () => {
    scrollToTop();
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* <h2 className="footer-brand-title">ZAPPCART</h2> */}
            <Link to="/" onClick={handleLogoClick}>
              <img src={applogo} alt="ZappCart Mobile App" className="footer-brand-title" />
            </Link>
            <p className="footer-brand-description">
              Your trusted partner for premium quality meat delivered fresh to your doorstep.
            </p>
            <div className="social-links">
             <a href="https://x.com/zappcart" target="_blank" rel="noopener noreferrer" className="social-link ">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/zapp-cart-31b9aa365/" target="_blank" rel="noopener noreferrer" className="social-link ">
                  <FaLinkedinIn />
                </a>
                <a href="https://www.instagram.com/_zappcart/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram />
                </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-links-title">Quick Links</h3>
            <ul className="footer-links-list">
              <li><Link to="/" onClick={scrollToTop} className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
              
            </ul>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-links-title">Categories</h3>
            <ul className="footer-links-list">
             
              <li><Link  className="footer-link">Chicken</Link></li>
              <li><Link className="footer-link">Mutton</Link></li>
              <li><Link className="footer-link">Fish & Seafood</Link></li>
              <li><Link className="footer-link">Prawns</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-contact-title">Contact Info</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="footer-contact-text">
                Sri kalabhairaveshwara chicken center, <br/>Rajeev Gandhi circle,
                kebbehala sunkadakatte<br />
                Bangalore -560091
                </span>
              </li>
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918722237574" className="footer-contact-text">+91 8722237574</a>
              </li>
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
                <a href="mailto:official.tazatabutchers@gmail.com" className="footer-contact-text">official.tazatabutchers@gmail.com</a>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-grid">
            <p className="footer-copyright">
              © {currentYear} ZappCart. All rights reserved.
            </p>
            <div className="footer-policies">
              <Link to="/privacy-policy" className="footer-policy-link">Privacy Policy</Link>
              <Link to="/terms-of-service" className="footer-policy-link">Terms of Service</Link>
              <Link to="/refund-policy" className="footer-policy-link">Refund Policy</Link>
              <Link to="/standardPolicy" className="footer-policy-link">Quality & Standards Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;