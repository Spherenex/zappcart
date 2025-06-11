
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../styles/header.css';
// import applogo from '../assets/images/logo1.png'; // Adjust the path as necessary

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showComingSoon, setShowComingSoon] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     let timeout;
//     if (showComingSoon) {
//       timeout = setTimeout(() => {
//         setShowComingSoon(false);
//       }, 300); // Hide after 300ms
//     }
//     return () => clearTimeout(timeout);
//   }, [showComingSoon]);

//   const handleLogoClick = (e) => {
//     if (location.pathname === '/') {
//       e.preventDefault();
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleDownloadClick = (e) => {
//     e.preventDefault();
//     setShowComingSoon(true);
//   };

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobileMenuOpen && !event.target.closest('.mobile-menu-button') && !event.target.closest('.mobile-nav')) {
//         setIsMobileMenuOpen(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isMobileMenuOpen]);
  
//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   return (
//     <>
//       <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="header-container">
//           <div className="logo">
//             <Link to="/" onClick={handleLogoClick}>
//               <img src={applogo} alt="ZappCart Mobile App" className="app-promo-image" />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="desktop-nav">
//             <a href="#home" onClick={(e) => { e.preventDefault(); window.location.href = '/#home'; }}>Home</a>
//             <a href="#about" onClick={(e) => { e.preventDefault(); window.location.href = '/#about'; }}>About</a>
//             <a href="#products" onClick={(e) => { e.preventDefault(); window.location.href = '/#products'; }}>Products</a>
//             <a href="#how-it-works" onClick={(e) => { e.preventDefault(); window.location.href = '/#how-it-works'; }}>How It Works</a>
//             <Link
//               to="/download"
//               href="#contact"
//               className="download-btn"
//               onClick={handleDownloadClick}
//             >
//               Download App
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button 
//             className="mobile-menu-button" 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-expanded={isMobileMenuOpen}
//             aria-label="Toggle navigation menu"
//           >
//             <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <nav className="mobile-nav">
//             <a href="#home" onClick={(e) => { e.preventDefault(); window.location.href = '/#home'; }}>Home</a>
//             <a href="#about" onClick={(e) => { e.preventDefault(); window.location.href = '/#about'; }}>About</a>
//             <a href="#products" onClick={(e) => { e.preventDefault(); window.location.href = '/#products'; }}>Products</a>
//             <a href="#how-it-works" onClick={(e) => { e.preventDefault(); window.location.href = '/#how-it-works'; }}>How It Works</a>
//             <Link
//               to="/download"
//               href="#contact"
//               className="download-btn"
//               onClick={handleDownloadClick}
//             >
//               Download App
//             </Link>
//           </nav>
//         )}
//       </header>

//       {/* Simple Coming Soon Notification */}
//       {showComingSoon && (
//         <div className="coming-soon-notification">
//           <span>🚀 Coming Soon!</span>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';
import applogo from '../assets/images/logo1.png'; // Adjust the path as necessary

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timeout;
    if (showComingSoon) {
      timeout = setTimeout(() => {
        setShowComingSoon(false);
      }, 300); // Hide after 300ms
    }
    return () => clearTimeout(timeout);
  }, [showComingSoon]);

  const handleLogoClick = () => {
    window.open('https://zappcart-control-panel.web.app/', '_blank');
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-button') && !event.target.closest('.mobile-nav')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <button 
              onClick={handleLogoClick}
              className="logo-button"
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 0, 
                cursor: 'pointer' 
              }}
            >
              <img src={applogo} alt="ZappCart Mobile App" className="app-promo-image" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.location.href = '/#home'; }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); window.location.href = '/#about'; }}>About</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); window.location.href = '/#products'; }}>Products</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); window.location.href = '/#how-it-works'; }}>How It Works</a>
            <Link
              to="/download"
              href="#contact"
              className="download-btn"
              onClick={handleDownloadClick}
            >
              Download App
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.location.href = '/#home'; }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); window.location.href = '/#about'; }}>About</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); window.location.href = '/#products'; }}>Products</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); window.location.href = '/#how-it-works'; }}>How It Works</a>
            <Link
              to="/download"
              href="#contact"
              className="download-btn"
              onClick={handleDownloadClick}
            >
              Download App
            </Link>
          </nav>
        )}
      </header>

      {/* Simple Coming Soon Notification */}
      {showComingSoon && (
        <div className="coming-soon-notification">
          <span>🚀 Coming Soon!</span>
        </div>
      )}
    </>
  );
};

export default Header;