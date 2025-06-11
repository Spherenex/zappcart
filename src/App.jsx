import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProductsSection from './components/ProductsSection.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import CTASection from './components/CTASection.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import RefundPolicy from './components/RefundPolicy.jsx';
import StandardPolicy from './components/standardpolicy.jsx';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// LazyLoad component to handle intersection observer for lazy loading
const LazyLoad = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all sections with lazy-load class
    const lazyLoadElements = document.querySelectorAll('.lazy-load');
    lazyLoadElements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

// NotFound component for 404 pages
const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </div>
  );
};

// Coming Soon component for placeholder pages
const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <h1>{title || 'Coming Soon'}</h1>
        <p>We're working on this page. Please check back later.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      <LazyLoad />
      
      <Routes>
        {/* Main homepage with all sections visible */}
        <Route 
          path="/" 
          element={
            <>
              <Header />
              <main>
                <section id="home" className="lazy-load"><Hero /></section>
                <section id="about" className="lazy-load"><AboutSection /></section>
                <section id="products" className="lazy-load"><ProductsSection /></section>
                <section id="how-it-works" className="lazy-load"><HowItWorksSection /></section>
                {/* <section className="lazy-load"><TestimonialsSection /></section> */}
                <section className="lazy-load"><CTASection /></section>
              </main>
              <Footer />
            </>
          } 
        />

        {/* Legal pages */}
        <Route path="/privacy-policy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms-of-service" element={<><Header /><TermsOfService /><Footer /></>} />
        <Route path="/refund-policy" element={<><Header /><RefundPolicy /><Footer /></>} />
        <Route path="/standardpolicy" element={<><Header /><StandardPolicy /><Footer /></>} />

        {/* Redirect section links to homepage with anchor */}
        <Route path="/about" element={<><Header /><AboutSection /><Footer /></>} />
        <Route path="/products" element={<><Header /><ProductsSection /><Footer /></>} />
        <Route path="/how-it-works" element={<><Header /><HowItWorksSection /><Footer /></>} />
        <Route path="/contact" element={<><Header /><CTASection /><Footer /></>} />
        
        {/* Placeholder pages */}
        <Route path="/download" element={<><Header /><ComingSoon title="App Download" /><Footer /></>} />
        <Route path="/help" element={<><Header /><ComingSoon title="Help Center" /><Footer /></>} />
        <Route path="/products/chicken" element={<><Header /><ComingSoon title="Chicken Products" /><Footer /></>} />
        <Route path="/products/mutton" element={<><Header /><ComingSoon title="Mutton Products" /><Footer /></>} />
        <Route path="/products/fish-seafood" element={<><Header /><ComingSoon title="Fish & Seafood" /><Footer /></>} />
        <Route path="/products/prawns" element={<><Header /><ComingSoon title="Prawns Products" /><Footer /></>} />
        <Route path="/faq" element={<><Header /><ComingSoon title="FAQ" /><Footer /></>} />
        
        {/* 404 page */}
        <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
      </Routes>
      
      {/* Global Toast Container */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="zappcart-toast"
        theme="dark"
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          padding: '0', 
          margin: '0', 
          width: '100%', 
          maxWidth: '400px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 1000 
        }}
      />
    </>
  );
}

export default App;