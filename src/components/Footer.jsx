import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaAngleRight,
  FaPaperPlane
} from 'react-icons/fa';
import '../styles/Footer.css';
import Logo from '../assets/zapp.jpeg'; // Using the same logo as header

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={Logo} alt="Fresh Deliver Logo" />
          </Link>
          <p className="footer-tagline">
            Delivering fresh, high-quality chicken products directly to your doorstep with care and convenience.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" className="social-link" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/shop"><FaAngleRight /> Shop</Link>
            <Link to="/categories"><FaAngleRight /> Categories</Link>
            <Link to="/account"><FaAngleRight /> My Account</Link>
            <Link to="/about"><FaAngleRight /> About Us</Link>
            <Link to="/privacy"><FaAngleRight /> Privacy Policy</Link>
            <Link to="/terms"><FaAngleRight /> Terms of Service</Link>
            <Link to="/faq"><FaAngleRight /> FAQ</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div className="contact-text">
                N/35, 10th Main Rd, LIC Colony, Bangalore, 560021
              </div>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <div className="contact-text">
                +91 98765 43210
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div className="contact-text">
                support@freshdeliver.com
              </div>
            </div>
            <div className="contact-item">
              <FaClock className="contact-icon" />
              <div className="contact-text">
                Mon - Sat: 9am - 8pm<br />
                Sunday: 10am - 5pm
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="newsletter-text">
            Subscribe to our newsletter to receive updates, special offers, and recipes.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Fresh Deliver. All rights reserved.
        </p>
        <div className="bottom-links">
          <Link to="/shipping">Shipping Policy</Link>
          <Link to="/returns">Returns & Refunds</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;