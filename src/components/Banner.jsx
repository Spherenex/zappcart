// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   FaArrowRight, 
//   FaArrowLeft, 
//   FaTruck, 
//   FaShieldAlt, 
//   FaLeaf,
//   FaStar
// } from 'react-icons/fa';
// import { storage, database } from '../../firebase';
// import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
// import { ref as dbRef, get, child } from 'firebase/database';
// import '../styles/Banner.css';

// // Fallback banner data in case database is empty
// const bannerDataTemplate = [
//   {
//     id: 1,
//     title: "Premium Chicken Cuts",
//     subtitle: "Farm Fresh Everyday",
//     description: "Antibiotic-free chicken raised in certified farms",
//     cta: "Shop Now",
//     link: "/shop?category=chicken",
//     imageFolderPath: "banners/Premium Chicken Cuts",
//     discount: "20% OFF",
//     originalPrice: 249,
//     discountedPrice: 199,
//   },
//   {
//     id: 2,
//     title: "Fresh Fish Collection",
//     subtitle: "Ocean to Table",
//     description: "Wild-caught fish rich in Omega-3",
//     cta: "Explore",
//     link: "/shop?category=fish",
//     imageFolderPath: "banners/Fresh Fish Collection",
//     discount: "15% OFF",
//     originalPrice: 599,
//     discountedPrice: 509,
//   },
//   {
//     id: 3,
//     title: "Premium Mutton Selection",
//     subtitle: "Quality Guaranteed",
//     description: "Tender and juicy cuts for your special occasions",
//     cta: "Buy Now",
//     link: "/shop?category=mutton",
//     imageFolderPath: "banners/Premium Mutton Selection",
//     discount: "10% OFF",
//     originalPrice: 449,
//     discountedPrice: 404,
//   }
// ];

// const Banner = () => {
//   const [bannerData, setBannerData] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const autoPlayRef = useRef(null);
  
//   // Fetch the most recent image from a folder
//   const getMostRecentImage = async (folderPath) => {
//     try {
//       const folderRef = storageRef(storage, folderPath);
//       const fileList = await listAll(folderRef);
      
//       if (fileList.items.length === 0) {
//         console.warn(`No images found in ${folderPath}`);
//         return `https://via.placeholder.com/800x600?text=No+Images+In+${folderPath.replace(/\//g, '+')}`;
//       }
      
//       // Sort files by name to get the most recent one (timestamp-based naming)
//       const sortedItems = [...fileList.items].sort((a, b) => {
//         // Extract timestamps if present in the filename (e.g., image_1648293647123.jpg)
//         const getTimestamp = (name) => {
//           const match = name.match(/image_(\d+)/);
//           return match ? parseInt(match[1]) : 0;
//         };
        
//         const timestampA = getTimestamp(a.name);
//         const timestampB = getTimestamp(b.name);
        
//         // Return newest first
//         return timestampB - timestampA;
//       });
      
//       // Get the URL of the most recent image
//       const imageURL = await getDownloadURL(sortedItems[0]);
//       return imageURL;
//     } catch (error) {
//       console.error(`Error fetching images from ${folderPath}:`, error);
//       return `https://via.placeholder.com/800x600?text=Error+Loading+Images+From+${folderPath.replace(/\//g, '+')}`;
//     }
//   };
  
//   // Check if a banner is currently active based on scheduling
//   const isBannerActive = (banner) => {
//     // If no banner data, it's not active
//     if (!banner) return false;
    
//     // If the banner has isActive flag and it's set to false, it's not active
//     if (banner.hasOwnProperty('isActive') && !banner.isActive) return false;
    
//     const now = new Date();
    
//     // Check scheduling if startDate or endDate exists
//     if (banner.startDate || banner.endDate) {
//       // If it has a start date and we're before it, it's not active yet
//       if (banner.startDate && now < new Date(banner.startDate)) return false;
      
//       // If it has an end date and we're after it, it's no longer active
//       if (banner.endDate && now > new Date(banner.endDate)) return false;
//     }
    
//     // If we passed all checks, the banner is active
//     return true;
//   };
  
//   // Fetch data from Realtime Database and images from Storage
//   useEffect(() => {
//     const fetchBanners = async () => {
//       setIsLoading(true);
      
//       try {
//         // First, try to fetch banner data from Realtime Database
//         const bannersRef = dbRef(database, 'banners');
//         const snapshot = await get(bannersRef);
        
//         let bannerDataWithImages = [];
        
//         if (snapshot.exists()) {
//           // Use data from database
//           const dbData = snapshot.val();
          
//           // Convert from object to array and filter active banners
//           bannerDataWithImages = await Promise.all(
//             Object.entries(dbData)
//               .filter(([key, value]) => isBannerActive(value))
//               .map(async ([key, value]) => {
//                 try {
//                   // Get images from Storage for each banner
//                   const imageURL = await getMostRecentImage(`banners/${key}`);
                  
//                   return {
//                     ...value,
//                     id: key, // Use key as ID
//                     imageFolderPath: `banners/${key}`,
//                     backgroundImage: imageURL,
//                     productImage: imageURL
//                   };
//                 } catch (error) {
//                   console.error(`Error fetching images for ${key}:`, error);
                  
//                   // Return with placeholder images
//                   return {
//                     ...value,
//                     id: key,
//                     imageFolderPath: `banners/${key}`,
//                     backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${key}+Background+Error`,
//                     productImage: `https://via.placeholder.com/600x600?text=Banner+${key}+Product+Error`
//                   };
//                 }
//               })
//           );
//         } else {
//           // Fall back to template data if no data in database
//           console.log("No banners found in database, using template data");
          
//           bannerDataWithImages = await Promise.all(
//             bannerDataTemplate
//               .sort((a) => a.title === "Premium Chicken Cuts" ? -1 : 1) // Prioritize chicken
//               .map(async (banner) => {
//                 try {
//                   const imageURL = await getMostRecentImage(banner.imageFolderPath);
                  
//                   return {
//                     ...banner,
//                     backgroundImage: imageURL,
//                     productImage: imageURL
//                   };
//                 } catch (error) {
//                 console.error(`Error fetching images for banner ${banner.id}:`, error);
                
//                 // Return with placeholder images
//                 return {
//                   ...banner,
//                   backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
//                   productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
//                 };
//               }
//             })
//           );
//         }
        
//         setBannerData(bannerDataWithImages);
//       } catch (error) {
//         console.error('Error fetching banner data:', error);
        
//         // In case of error, fall back to template data with placeholder images
//         const fallbackData = bannerDataTemplate.map(banner => ({
//           ...banner,
//           backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
//           productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
//         }));
        
//         setBannerData(fallbackData);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchBanners();
    
//     // Set up timer to check for banner expiration
//     const checkBannersTimer = setInterval(() => {
//       // Check if any active banners should now be expired based on time
//       fetchBanners();
//     }, 60 * 1000); // Check every minute
    
//     // Set up a refresh interval to check for new data every 5 minutes
//     const refreshInterval = setInterval(fetchBanners, 5 * 60 * 1000);
    
//     return () => {
//       clearInterval(checkBannersTimer);
//       clearInterval(refreshInterval);
//     };
//   }, []);
  
//   // Initialize auto-slide functionality
//   useEffect(() => {
//     if (isAutoPlaying && bannerData.length > 0) {
//       autoPlayRef.current = setTimeout(() => {
//         if (!isAnimating) {
//           nextSlide();
//         }
//       }, 5000);
//     }
    
//     return () => {
//       if (autoPlayRef.current) {
//         clearTimeout(autoPlayRef.current);
//       }
//     };
//   }, [currentSlide, isAnimating, isAutoPlaying, bannerData.length]);
  
//   // Handle mouse enter/leave for auto-play
//   const pauseAutoPlay = () => setIsAutoPlaying(false);
//   const resumeAutoPlay = () => setIsAutoPlaying(true);
  
//   // Slide navigation functions
//   const nextSlide = () => {
//     if (isAnimating || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(prev => (prev === bannerData.length - 1 ? 0 : prev + 1));
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   const prevSlide = () => {
//     if (isAnimating || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(prev => (prev === 0 ? bannerData.length - 1 : prev - 1));
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   const goToSlide = (index) => {
//     if (isAnimating || currentSlide === index || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(index);
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };
  
//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };
  
//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       // Swipe left
//       nextSlide();
//     } else if (touchStart - touchEnd < -75) {
//       // Swipe right
//       prevSlide();
//     }
//   };
  
//   const benefits = [
//     { icon: <FaTruck />, text: "Free Delivery" },
//     { icon: <FaShieldAlt />, text: "100% Authentic" },
//     { icon: <FaLeaf />, text: "Farm Fresh" },
//     { icon: <FaStar />, text: "Premium Quality" }
//   ];

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="banner-container loading">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   // Show error state if no banner data
//   if (bannerData.length === 0) {
//     return (
//       <div className="banner-container error">
//         <div className="error-message">No active banners available to display.</div>
//       </div>
//     );
//   }

//   const currentBanner = bannerData[currentSlide];

//   return (
//     <div className="banner-container">
//       <div 
//         className="main-banner" 
//         style={{ 
//           backgroundImage: `url(${currentBanner.backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//         onMouseEnter={pauseAutoPlay}
//         onMouseLeave={resumeAutoPlay}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div className="banner-overlay"></div>
        
//         <div className="banner-content slide-up">
//           <span className="banner-subtitle">{currentBanner.subtitle}</span>
//           <h1 className="banner-title">{currentBanner.title}</h1>
//           <p className="banner-description">{currentBanner.description}</p>
          
//           <div className="banner-benefits">
//             {benefits.map((benefit, index) => (
//               <div key={index} className="benefit-item">
//                 <div className="benefit-icon">{benefit.icon}</div>
//                 <span>{benefit.text}</span>
//               </div>
//             ))}
//           </div>
          
//           <div className="banner-price">
//             <div className="price-tag">
//               <span className="discount-badge">{currentBanner.discount}</span>
//               <div className="price-values">
//                 <span className="original-price">₹{currentBanner.originalPrice}</span>
//                 <span className="current-price">₹{currentBanner.discountedPrice}</span>
//               </div>
//             </div>
            
//             <a 
//               href={currentBanner.link} 
//               className="cta-button"
//             >
//               {currentBanner.cta} <FaArrowRight />
//             </a>
//           </div>
//         </div>
        
//         <div className="banner-image">
//           <img 
//             src={currentBanner.productImage}
//             alt={currentBanner.title} 
//             className={`product-image ${imageLoaded ? 'fade-in' : ''}`}
//             onLoad={() => setImageLoaded(true)}
//             onError={(e) => {
//               console.error('Image load error:', e);
//               e.target.src = 'https://via.placeholder.com/600x600?text=Image+Error';
//             }}
//             loading="lazy"
//           />
//         </div>
        
//         {/* Navigation Controls */}
//         <div className="banner-controls">
//           <button 
//             className="banner-arrow prev-arrow" 
//             onClick={prevSlide}
//             aria-label="Previous slide"
//           >
//             <FaArrowLeft />
//           </button>
          
//           <div className="banner-indicators">
//             {bannerData.map((_, index) => (
//               <button
//                 key={index}
//                 className={`banner-indicator ${currentSlide === index ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           <button 
//             className="banner-arrow next-arrow" 
//             onClick={nextSlide}
//             aria-label="Next slide"
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;



// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   FaArrowRight, 
//   FaArrowLeft, 
//   FaTruck, 
//   FaShieldAlt, 
//   FaLeaf,
//   FaStar
// } from 'react-icons/fa';
// import { storage, database } from '../../firebase';
// import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
// import { ref as dbRef, get, child } from 'firebase/database';
// import '../styles/Banner.css';

// // Fallback banner data in case database is empty
// const bannerDataTemplate = [
//   {
//     id: 1,
//     title: "Premium Chicken Cuts",
//     subtitle: "Farm Fresh Everyday",
//     description: "Antibiotic-free chicken raised in certified farms",
//     cta: "Shop Now",
//     link: "/shop?category=chicken",
//     imageFolderPath: "banners/Premium Chicken Cuts",
//     discount: "20% OFF",
//     originalPrice: 249,
//     discountedPrice: 199,
//   },
//   {
//     id: 2,
//     title: "Fresh Fish Collection",
//     subtitle: "Ocean to Table",
//     description: "Wild-caught fish rich in Omega-3",
//     cta: "Explore",
//     link: "/shop?category=fish",
//     imageFolderPath: "banners/Fresh Fish Collection",
//     discount: "15% OFF",
//     originalPrice: 599,
//     discountedPrice: 509,
//   },
//   {
//     id: 3,
//     title: "Premium Mutton Selection",
//     subtitle: "Quality Guaranteed",
//     description: "Tender and juicy cuts for your special occasions",
//     cta: "Buy Now",
//     link: "/shop?category=mutton",
//     imageFolderPath: "banners/Premium Mutton Selection",
//     discount: "10% OFF",
//     originalPrice: 449,
//     discountedPrice: 404,
//   }
// ];

// const Banner = () => {
//   const [bannerData, setBannerData] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const autoPlayRef = useRef(null);
  
//   // Fetch the most recent image from a folder
//   const getMostRecentImage = async (folderPath) => {
//     try {
//       const folderRef = storageRef(storage, folderPath);
//       const fileList = await listAll(folderRef);
      
//       if (fileList.items.length === 0) {
//         console.warn(`No images found in ${folderPath}`);
//         return `https://via.placeholder.com/800x600?text=No+Images+In+${folderPath.replace(/\//g, '+')}`;
//       }
      
//       // Sort files by name to get the most recent one (timestamp-based naming)
//       const sortedItems = [...fileList.items].sort((a, b) => {
//         // Extract timestamps if present in the filename (e.g., image_1648293647123.jpg)
//         const getTimestamp = (name) => {
//           const match = name.match(/image_(\d+)/);
//           return match ? parseInt(match[1]) : 0;
//         };
        
//         const timestampA = getTimestamp(a.name);
//         const timestampB = getTimestamp(b.name);
        
//         // Return newest first
//         return timestampB - timestampA;
//       });
      
//       // Get the URL of the most recent image
//       const imageURL = await getDownloadURL(sortedItems[0]);
//       return imageURL;
//     } catch (error) {
//       console.error(`Error fetching images from ${folderPath}:`, error);
//       return `https://via.placeholder.com/800x600?text=Error+Loading+Images+From+${folderPath.replace(/\//g, '+')}`;
//     }
//   };
  
//   // Check if a banner is currently active based on scheduling
//   const isBannerActive = (banner) => {
//     // If no banner data, it's not active
//     if (!banner) return false;
    
//     // If the banner has isActive flag and it's set to false, it's not active
//     if (banner.hasOwnProperty('isActive') && !banner.isActive) return false;
    
//     const now = new Date();
    
//     // Check scheduling if startDate or endDate exists
//     if (banner.startDate || banner.endDate) {
//       // If it has a start date and we're before it, it's not active yet
//       if (banner.startDate && now < new Date(banner.startDate)) return false;
      
//       // If it has an end date and we're after it, it's no longer active
//       if (banner.endDate && now > new Date(banner.endDate)) return false;
//     }
    
//     // If we passed all checks, the banner is active
//     return true;
//   };
  
//   // Get current prices for a banner based on price promotion schedule
//   const getCurrentPrices = (banner) => {
//     if (!banner) return { originalPrice: 0, discountedPrice: 0 };
    
//     // Check if banner has price promotion enabled
//     if (banner.pricePromotion && banner.pricePromotion.isEnabled) {
//       const now = new Date();
//       const startDate = banner.pricePromotion.startDate ? new Date(banner.pricePromotion.startDate) : null;
//       const endDate = banner.pricePromotion.endDate ? new Date(banner.pricePromotion.endDate) : null;
      
//       // If promo is active (we're within the promo period)
//       if ((!startDate || now >= startDate) && (!endDate || now <= endDate)) {
//         return {
//           originalPrice: banner.pricePromotion.regularPrice || 0,
//           discountedPrice: banner.pricePromotion.promotionalPrice || 0
//         };
//       } else {
//         // Outside promotion period, show just the regular price
//         return {
//           originalPrice: banner.pricePromotion.regularPrice || 0,
//           discountedPrice: banner.pricePromotion.regularPrice || 0 // Same as original outside promo
//         };
//       }
//     }
    
//     // No promotion scheduling, use the standard prices
//     return {
//       originalPrice: banner.originalPrice || 0,
//       discountedPrice: banner.discountedPrice || 0
//     };
//   };
  
//   // Fetch data from Realtime Database and images from Storage
//   useEffect(() => {
//     const fetchBanners = async () => {
//       setIsLoading(true);
      
//       try {
//         // First, try to fetch banner data from Realtime Database
//         const bannersRef = dbRef(database, 'banners');
//         const snapshot = await get(bannersRef);
        
//         let bannerDataWithImages = [];
        
//         if (snapshot.exists()) {
//           // Use data from database
//           const dbData = snapshot.val();
          
//           // Convert from object to array and filter active banners
//           bannerDataWithImages = await Promise.all(
//             Object.entries(dbData)
//               .filter(([key, value]) => isBannerActive(value))
//               .map(async ([key, value]) => {
//                 try {
//                   // Get images from Storage for each banner
//                   const imageURL = await getMostRecentImage(`banners/${key}`);
                  
//                   return {
//                     ...value,
//                     id: key, // Use key as ID
//                     imageFolderPath: `banners/${key}`,
//                     backgroundImage: imageURL,
//                     productImage: imageURL
//                   };
//                 } catch (error) {
//                   console.error(`Error fetching images for ${key}:`, error);
                  
//                   // Return with placeholder images
//                   return {
//                     ...value,
//                     id: key,
//                     imageFolderPath: `banners/${key}`,
//                     backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${key}+Background+Error`,
//                     productImage: `https://via.placeholder.com/600x600?text=Banner+${key}+Product+Error`
//                   };
//                 }
//               })
//           );
//         } else {
//           // Fall back to template data if no data in database
//           console.log("No banners found in database, using template data");
          
//           bannerDataWithImages = await Promise.all(
//             bannerDataTemplate
//               .sort((a) => a.title === "Premium Chicken Cuts" ? -1 : 1) // Prioritize chicken
//               .map(async (banner) => {
//                 try {
//                   const imageURL = await getMostRecentImage(banner.imageFolderPath);
                  
//                   return {
//                     ...banner,
//                     backgroundImage: imageURL,
//                     productImage: imageURL
//                   };
//                 } catch (error) {
//                 console.error(`Error fetching images for banner ${banner.id}:`, error);
                
//                 // Return with placeholder images
//                 return {
//                   ...banner,
//                   backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
//                   productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
//                 };
//               }
//             })
//           );
//         }
        
//         setBannerData(bannerDataWithImages);
//       } catch (error) {
//         console.error('Error fetching banner data:', error);
        
//         // In case of error, fall back to template data with placeholder images
//         const fallbackData = bannerDataTemplate.map(banner => ({
//           ...banner,
//           backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
//           productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
//         }));
        
//         setBannerData(fallbackData);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchBanners();
    
//     // Set up timer to check for banner expiration and price promotion changes
//     const checkBannersTimer = setInterval(() => {
//       // Check if any active banners should now be expired based on time
//       // Also check if any price promotions should start or end
//       fetchBanners();
//     }, 30 * 1000); // Check every 30 seconds for more responsive price updates
    
//     // Set up a refresh interval to check for new data every 5 minutes
//     const refreshInterval = setInterval(fetchBanners, 5 * 60 * 1000);
    
//     return () => {
//       clearInterval(checkBannersTimer);
//       clearInterval(refreshInterval);
//     };
//   }, []);
  
//   // Initialize auto-slide functionality
//   useEffect(() => {
//     if (isAutoPlaying && bannerData.length > 0) {
//       autoPlayRef.current = setTimeout(() => {
//         if (!isAnimating) {
//           nextSlide();
//         }
//       }, 5000);
//     }
    
//     return () => {
//       if (autoPlayRef.current) {
//         clearTimeout(autoPlayRef.current);
//       }
//     };
//   }, [currentSlide, isAnimating, isAutoPlaying, bannerData.length]);
  
//   // Handle mouse enter/leave for auto-play
//   const pauseAutoPlay = () => setIsAutoPlaying(false);
//   const resumeAutoPlay = () => setIsAutoPlaying(true);
  
//   // Slide navigation functions
//   const nextSlide = () => {
//     if (isAnimating || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(prev => (prev === bannerData.length - 1 ? 0 : prev + 1));
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   const prevSlide = () => {
//     if (isAnimating || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(prev => (prev === 0 ? bannerData.length - 1 : prev - 1));
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   const goToSlide = (index) => {
//     if (isAnimating || currentSlide === index || bannerData.length === 0) return;
    
//     setIsAnimating(true);
//     setCurrentSlide(index);
    
//     // Reset animation flag after transition completes
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };
  
//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };
  
//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };
  
//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       // Swipe left
//       nextSlide();
//     } else if (touchStart - touchEnd < -75) {
//       // Swipe right
//       prevSlide();
//     }
//   };
  
//   const benefits = [
//     { icon: <FaTruck />, text: "Free Delivery" },
//     { icon: <FaShieldAlt />, text: "100% Authentic" },
//     { icon: <FaLeaf />, text: "Farm Fresh" },
//     { icon: <FaStar />, text: "Premium Quality" }
//   ];

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="banner-container loading">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   // Show error state if no banner data
//   if (bannerData.length === 0) {
//     return (
//       <div className="banner-container error">
//         <div className="error-message">No active banners available to display.</div>
//       </div>
//     );
//   }

//   const currentBanner = bannerData[currentSlide];

//   return (
//     <div className="banner-container">
//       <div 
//         className="main-banner" 
//         style={{ 
//           backgroundImage: `url(${currentBanner.backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//         onMouseEnter={pauseAutoPlay}
//         onMouseLeave={resumeAutoPlay}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div className="banner-overlay"></div>
        
//         <div className="banner-content slide-up">
//           <span className="banner-subtitle">{currentBanner.subtitle}</span>
//           <h1 className="banner-title">{currentBanner.title}</h1>
//           <p className="banner-description">{currentBanner.description}</p>
          
//           <div className="banner-benefits">
//             {benefits.map((benefit, index) => (
//               <div key={index} className="benefit-item">
//                 <div className="benefit-icon">{benefit.icon}</div>
//                 <span>{benefit.text}</span>
//               </div>
//             ))}
//           </div>
          
//           <div className="banner-price">
//             <div className="price-tag">
//               <span className="discount-badge">{currentBanner.discount}</span>
//                                 <div className="price-values">
//                 {(() => {
//                   // Get the current prices based on promotion timing
//                   const { originalPrice, discountedPrice } = getCurrentPrices(currentBanner);
                  
//                   // Show both prices only if they're different
//                   return originalPrice !== discountedPrice ? (
//                     <>
//                       <span className="original-price">₹{originalPrice}</span>
//                       <span className="current-price">₹{discountedPrice}</span>
//                     </>
//                   ) : (
//                     // If prices are the same (no active discount), show only one price
//                     <span className="current-price">₹{originalPrice}</span>
//                   );
//                 })()}
//               </div>
//             </div>
            
//             <a 
//               href={currentBanner.link} 
//               className="cta-button"
//             >
//               {currentBanner.cta} <FaArrowRight />
//             </a>
//           </div>
//         </div>
        
//         <div className="banner-image">
//           <img 
//             src={currentBanner.productImage}
//             alt={currentBanner.title} 
//             className={`product-image ${imageLoaded ? 'fade-in' : ''}`}
//             onLoad={() => setImageLoaded(true)}
//             onError={(e) => {
//               console.error('Image load error:', e);
//               e.target.src = 'https://via.placeholder.com/600x600?text=Image+Error';
//             }}
//             loading="lazy"
//           />
//         </div>
        
//         {/* Navigation Controls */}
//         <div className="banner-controls">
//           <button 
//             className="banner-arrow prev-arrow" 
//             onClick={prevSlide}
//             aria-label="Previous slide"
//           >
//             <FaArrowLeft />
//           </button>
          
//           <div className="banner-indicators">
//             {bannerData.map((_, index) => (
//               <button
//                 key={index}
//                 className={`banner-indicator ${currentSlide === index ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           <button 
//             className="banner-arrow next-arrow" 
//             onClick={nextSlide}
//             aria-label="Next slide"
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;


import React, { useState, useEffect, useRef } from 'react';
import { 
  FaArrowRight, 
  FaArrowLeft, 
  FaTruck, 
  FaShieldAlt, 
  FaLeaf,
  FaStar
} from 'react-icons/fa';
import { storage, database } from '../../firebase';
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import { ref as dbRef, get, child } from 'firebase/database';
import '../styles/Banner.css';

// Fallback banner data in case database is empty
const bannerDataTemplate = [
  {
    id: 1,
    title: "Premium Chicken Cuts",
    subtitle: "Farm Fresh Everyday",
    description: "Antibiotic-free chicken raised in certified farms",
    cta: "Shop Now",
    link: "/shop?category=chicken",
    imageFolderPath: "banners/Premium Chicken Cuts",
    discount: "20% OFF",
    originalPrice: 249,
    discountedPrice: 199,
  },
  {
    id: 2,
    title: "Fresh Fish Collection",
    subtitle: "Ocean to Table",
    description: "Wild-caught fish rich in Omega-3",
    cta: "Explore",
    link: "/shop?category=fish",
    imageFolderPath: "banners/Fresh Fish Collection",
    discount: "15% OFF",
    originalPrice: 599,
    discountedPrice: 509,
  },
  {
    id: 3,
    title: "Premium Mutton Selection",
    subtitle: "Quality Guaranteed",
    description: "Tender and juicy cuts for your special occasions",
    cta: "Buy Now",
    link: "/shop?category=mutton",
    imageFolderPath: "banners/Premium Mutton Selection",
    discount: "10% OFF",
    originalPrice: 449,
    discountedPrice: 404,
  }
];

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const autoPlayRef = useRef(null);
  
  // Fetch the most recent image from a folder
  const getMostRecentImage = async (folderPath) => {
    try {
      const folderRef = storageRef(storage, folderPath);
      const fileList = await listAll(folderRef);
      
      if (fileList.items.length === 0) {
        console.warn(`No images found in ${folderPath}`);
        return `https://via.placeholder.com/800x600?text=No+Images+In+${folderPath.replace(/\//g, '+')}`;
      }
      
      // Sort files by name to get the most recent one (timestamp-based naming)
      const sortedItems = [...fileList.items].sort((a, b) => {
        // Extract timestamps if present in the filename (e.g., image_1648293647123.jpg)
        const getTimestamp = (name) => {
          const match = name.match(/image_(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        
        const timestampA = getTimestamp(a.name);
        const timestampB = getTimestamp(b.name);
        
        // Return newest first
        return timestampB - timestampA;
      });
      
      // Get the URL of the most recent image
      const imageURL = await getDownloadURL(sortedItems[0]);
      return imageURL;
    } catch (error) {
      console.error(`Error fetching images from ${folderPath}:`, error);
      return `https://via.placeholder.com/800x600?text=Error+Loading+Images+From+${folderPath.replace(/\//g, '+')}`;
    }
  };
  
  // Check if a banner is currently active based on scheduling
  const isBannerActive = (banner) => {
    // If no banner data, it's not active
    if (!banner) return false;
    
    // If the banner has isActive flag and it's set to false, it's not active
    if (banner.hasOwnProperty('isActive') && !banner.isActive) return false;
    
    const now = new Date();
    
    // Check scheduling if startDate or endDate exists
    if (banner.startDate || banner.endDate) {
      // If it has a start date and we're before it, it's not active yet
      if (banner.startDate && now < new Date(banner.startDate)) return false;
      
      // If it has an end date and we're after it, it's no longer active
      if (banner.endDate && now > new Date(banner.endDate)) return false;
    }
    
    // If we passed all checks, the banner is active
    return true;
  };
  
  // Get current prices for a banner based on price promotion schedule
  const getCurrentPrices = (banner) => {
    if (!banner) return { originalPrice: 0, discountedPrice: 0 };
    
    // Check if banner has price promotion enabled
    if (banner.pricePromotion && banner.pricePromotion.isEnabled) {
      const now = new Date();
      const startDate = banner.pricePromotion.startDate ? new Date(banner.pricePromotion.startDate) : null;
      const endDate = banner.pricePromotion.endDate ? new Date(banner.pricePromotion.endDate) : null;
      
      // If promo is active (we're within the promo period)
      if ((!startDate || now >= startDate) && (!endDate || now <= endDate)) {
        return {
          originalPrice: banner.pricePromotion.regularPrice || 0,
          discountedPrice: banner.pricePromotion.promotionalPrice || 0
        };
      } else {
        // Outside promotion period, show just the regular price
        return {
          originalPrice: banner.pricePromotion.regularPrice || 0,
          discountedPrice: banner.pricePromotion.regularPrice || 0 // Same as original outside promo
        };
      }
    }
    
    // No promotion scheduling, use the standard prices
    return {
      originalPrice: banner.originalPrice || 0,
      discountedPrice: banner.discountedPrice || 0
    };
  };

  // Get current discount text based on discount promotion schedule
  const getCurrentDiscountText = (banner) => {
    if (!banner) return '';
    
    // Check if banner has discount promotion enabled
    if (banner.discountPromotion && banner.discountPromotion.isEnabled) {
      const now = new Date();
      const startDate = banner.discountPromotion.startDate ? new Date(banner.discountPromotion.startDate) : null;
      const endDate = banner.discountPromotion.endDate ? new Date(banner.discountPromotion.endDate) : null;
      
      // If discount promotion is active (we're within the promo period)
      if ((!startDate || now >= startDate) && (!endDate || now <= endDate)) {
        return banner.discountPromotion.discountText || '';
      } else {
        // Outside promotion period, no discount text
        return '';
      }
    }
    
    // No discount promotion scheduling, use the standard discount text
    return banner.discount || '';
  };
  
  // Fetch data from Realtime Database and images from Storage
  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      
      try {
        // First, try to fetch banner data from Realtime Database
        const bannersRef = dbRef(database, 'banners');
        const snapshot = await get(bannersRef);
        
        let bannerDataWithImages = [];
        
        if (snapshot.exists()) {
          // Use data from database
          const dbData = snapshot.val();
          
          // Convert from object to array and filter active banners
          bannerDataWithImages = await Promise.all(
            Object.entries(dbData)
              .filter(([key, value]) => isBannerActive(value))
              .map(async ([key, value]) => {
                try {
                  // Get images from Storage for each banner
                  const imageURL = await getMostRecentImage(`banners/${key}`);
                  
                  return {
                    ...value,
                    id: key, // Use key as ID
                    imageFolderPath: `banners/${key}`,
                    backgroundImage: imageURL,
                    productImage: imageURL
                  };
                } catch (error) {
                  console.error(`Error fetching images for ${key}:`, error);
                  
                  // Return with placeholder images
                  return {
                    ...value,
                    id: key,
                    imageFolderPath: `banners/${key}`,
                    backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${key}+Background+Error`,
                    productImage: `https://via.placeholder.com/600x600?text=Banner+${key}+Product+Error`
                  };
                }
              })
          );
        } else {
          // Fall back to template data if no data in database
          console.log("No banners found in database, using template data");
          
          bannerDataWithImages = await Promise.all(
            bannerDataTemplate
              .sort((a) => a.title === "Premium Chicken Cuts" ? -1 : 1) // Prioritize chicken
              .map(async (banner) => {
                try {
                  const imageURL = await getMostRecentImage(banner.imageFolderPath);
                  
                  return {
                    ...banner,
                    backgroundImage: imageURL,
                    productImage: imageURL
                  };
                } catch (error) {
                console.error(`Error fetching images for banner ${banner.id}:`, error);
                
                // Return with placeholder images
                return {
                  ...banner,
                  backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
                  productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
                };
              }
            })
          );
        }
        
        setBannerData(bannerDataWithImages);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        
        // In case of error, fall back to template data with placeholder images
        const fallbackData = bannerDataTemplate.map(banner => ({
          ...banner,
          backgroundImage: `https://via.placeholder.com/1200x600?text=Banner+${banner.id}+Background+Error`,
          productImage: `https://via.placeholder.com/600x600?text=Banner+${banner.id}+Product+Error`
        }));
        
        setBannerData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBanners();
    
    // Set up timer to check for banner expiration and price promotion changes
    const checkBannersTimer = setInterval(() => {
      // Check if any active banners should now be expired based on time
      // Also check if any price promotions should start or end
      fetchBanners();
    }, 30 * 1000); // Check every 30 seconds for more responsive price updates
    
    // Set up a refresh interval to check for new data every 5 minutes
    const refreshInterval = setInterval(fetchBanners, 5 * 60 * 1000);
    
    return () => {
      clearInterval(checkBannersTimer);
      clearInterval(refreshInterval);
    };
  }, []);
  
  // Initialize auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && bannerData.length > 0) {
      autoPlayRef.current = setTimeout(() => {
        if (!isAnimating) {
          nextSlide();
        }
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAnimating, isAutoPlaying, bannerData.length]);
  
  // Handle mouse enter/leave for auto-play
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  // Slide navigation functions
  const nextSlide = () => {
    if (isAnimating || bannerData.length === 0) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => (prev === bannerData.length - 1 ? 0 : prev + 1));
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isAnimating || bannerData.length === 0) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => (prev === 0 ? bannerData.length - 1 : prev - 1));
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToSlide = (index) => {
    if (isAnimating || currentSlide === index || bannerData.length === 0) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    } else if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };
  
  const benefits = [
    { icon: <FaTruck />, text: "Free Delivery" },
    { icon: <FaShieldAlt />, text: "100% Authentic" },
    { icon: <FaLeaf />, text: "Farm Fresh" },
    { icon: <FaStar />, text: "Premium Quality" }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="banner-container loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Show error state if no banner data
  if (bannerData.length === 0) {
    return (
      <div className="banner-container error">
        <div className="error-message">No active banners available to display.</div>
      </div>
    );
  }

  const currentBanner = bannerData[currentSlide];

  return (
    <div className="banner-container">
      <div 
        className="main-banner" 
        style={{ 
          backgroundImage: `url(${currentBanner.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="banner-overlay"></div>
        
        <div className="banner-content slide-up">
          <span className="banner-subtitle">{currentBanner.subtitle}</span>
          <h1 className="banner-title">{currentBanner.title}</h1>
          <p className="banner-description">{currentBanner.description}</p>
          
          <div className="banner-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">{benefit.icon}</div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <div className="banner-price">
            {/* Show discount text based on promotion status */}
            {(() => {
              const discountText = getCurrentDiscountText(currentBanner);
              if (discountText) {
                return <span className="discount-badge">{discountText}</span>;
              }
              return null;
            })()}
            
            {/* Show prices based on promotion status */}
            {(() => {
              const { originalPrice, discountedPrice } = getCurrentPrices(currentBanner);
              
              // Show both prices only if they're different
              if (originalPrice !== discountedPrice) {
                return (
                  <div className="price-values">
                    <span className="original-price">₹{originalPrice}</span>
                    <span className="current-price">₹{discountedPrice}</span>
                  </div>
                );
              } else if (originalPrice > 0) {
                // If prices are the same (no active discount), show only one price
                return (
                  <div className="price-values">
                    <span className="current-price">₹{originalPrice}</span>
                  </div>
                );
              }
              return null;
            })()}
            
            <a 
              href={currentBanner.link} 
              className="cta-button"
            >
              {currentBanner.cta} <FaArrowRight />
            </a>
          </div>
        </div>
        
        <div className="banner-image">
          <img 
            src={currentBanner.productImage}
            alt={currentBanner.title} 
            className={`product-image ${imageLoaded ? 'fade-in' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Image load error:', e);
              e.target.src = 'https://via.placeholder.com/600x600?text=Image+Error';
            }}
            loading="lazy"
          />
        </div>
        
        {/* Navigation Controls */}
        <div className="banner-controls">
          <button 
            className="banner-arrow prev-arrow" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </button>
          
          <div className="banner-indicators">
            {bannerData.map((_, index) => (
              <button
                key={index}
                className={`banner-indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="banner-arrow next-arrow" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;