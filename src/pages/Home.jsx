
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaArrowRight, 
//   FaShieldAlt, 
//   FaClock, 
//   FaLeaf, 
//   FaCheckCircle,
//   FaMedal,
//   FaTruck
// } from 'react-icons/fa';
// import { storage } from '../../firebase';
// import { ref, getDownloadURL, listAll } from 'firebase/storage';
// import Banner from '../components/Banner';
// import ProductCard from '../components/ProductCard';
// import { products } from '../data/products';
// import '../styles/Home.css';

// // Import app store icons - these typically don't need to be dynamic
// import GooglePlay from '../assets/Google Play.jpg';
// import AppStore from '../assets/App Store.png';

// const Home = () => {
//   // Filter products for featured section
//   const featuredProducts = products.slice(0, 4);
  
//   // Categories data - template without images (will load dynamically)
//   const categoriesTemplate = [
//     {
//       id: 1,
//       title: "Chicken",
//       imageFolderPath: "homeCategories/chicken",
//       items: ["Whole Chicken", "Boneless", "Curry Cut", "Wings", "Leg Piece"]
//     },
//     {
//       id: 2,
//       title: "Mutton",
//       imageFolderPath: "homeCategories/mutton",
//       items: ["Curry Cut", "Boneless", "Chops", "Biryani Cut", "Keema"]
//     },
//     {
//       id: 3,
//       title: "Fish & Seafood",
//       imageFolderPath: "homeCategories/fishSeafood",
//       items: ["Fish", "Prawns", "Crab", "Tuna", "Salmon"]
//     }
//   ];
  
//   // Premium selections - template without images (will load dynamically)
//   const premiumSelectionsTemplate = [
//     {
//       id: 1,
//       name: "Premium Chicken Breast",
//       price: 399,
//       imageFolderPath: "premiumSelections/chickenBreast",
//       description: "Farm-raised antibiotic-free premium chicken breast",
//       origin: "Local Farms"
//     },
//     {
//       id: 2,
//       name: "Norwegian Salmon",
//       price: 1299,
//       imageFolderPath: "premiumSelections/norwegianSalmon",
//       description: "Wild caught Atlantic salmon, rich in Omega-3",
//       origin: "Norway"
//     },
//     {
//       id: 3,
//       name: "Premium Mutton Cuts",
//       price: 999,
//       imageFolderPath: "premiumSelections/premiumMutton",
//       description: "Grass-fed, free-range mutton with a rich flavor",
//       origin: "Local Farms"
//     }
//   ];
  
//   // Combo packs - template without images (will load dynamically)
//   const comboPacksTemplate = [
//     {
//       id: 1,
//       name: "Meat Lover's Pack",
//       items: "Chicken Drumsticks + Mutton Curry Cut + Fish Fillets",
//       price: 999,
//       originalPrice: 1299,
//       imageFolderPath: "comboPacks/meatLovers",
//       savings: "Save ₹300"
//     },
//     {
//       id: 2,
//       name: "Premium Seafood Pack",
//       items: "Norwegian Salmon + Prawns + Fish Curry Cut",
//       price: 1499,
//       originalPrice: 1999,
//       imageFolderPath: "comboPacks/premiumSeafood",
//       savings: "Save ₹500"
//     }
//   ];
  
//   // Testimonials - template without images (will load dynamically)
//   const testimonialsTemplate = [
//     {
//       id: 1,
//       name: "Priya S.",
//       rating: 5,
//       text: "The quality of chicken is exceptional! I've been ordering for 6 months now and have never been disappointed. The chicken is always fresh and the delivery is prompt.",
//       imageFolderPath: "testimonials/customers/priya",
//       date: "3 weeks ago"
//     },
//     {
//       id: 2,
//       name: "Rajesh K.",
//       rating: 5,
//       text: "Best seafood in town. Their fish is always fresh and perfectly cleaned. The packaging is excellent and the delivery is always on time.",
//       imageFolderPath: "testimonials/customers/rajesh",
//       date: "1 month ago"
//     },
//     {
//       id: 3,
//       name: "Ananya M.",
//       rating: 4,
//       text: "Great variety of mutton cuts and excellent customer service. The quality is superior to what I get from local markets. Highly recommend!",
//       imageFolderPath: "testimonials/customers/ananya",
//       date: "2 months ago"
//     }
//   ];

//   // State for data with dynamic images
//   const [categories, setCategories] = useState([]);
//   const [premiumSelections, setPremiumSelections] = useState([]);
//   const [comboPacks, setComboPacks] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [promoImage, setPromoImage] = useState("");
//   const [appPreviewImage, setAppPreviewImage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // Quality guarantee features (no images needed)
//   const qualityFeatures = [
//     {
//       icon: <FaShieldAlt />,
//       title: "Premium Quality",
//       description: "Sourced from certified farms and suppliers"
//     },
//     {
//       icon: <FaLeaf />,
//       title: "Antibiotic-Free",
//       description: "No added hormones or antibiotics"
//     },
//     {
//       icon: <FaClock />,
//       title: "Farm to Home",
//       description: "Delivered fresh within 24 hours"
//     },
//     {
//       icon: <FaTruck />,
//       title: "Express Delivery",
//       description: "Same day delivery available"
//     }
//   ];

//   // Function to get the most recent image from a folder (same as Banner component)
//   const getMostRecentImage = async (folderPath) => {
//     try {
//       const folderRef = ref(storage, folderPath);
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

//   // Fetch all dynamic images from Firebase
//   useEffect(() => {
//     const fetchImageURLs = async () => {
//       setIsLoading(true);
      
//       try {
//         // Fetch category images
//         const categoriesWithImages = await Promise.all(
//           categoriesTemplate.map(async (category) => {
//             try {
//               const imageURL = await getMostRecentImage(category.imageFolderPath);
//               return {
//                 ...category,
//                 image: imageURL
//               };
//             } catch (error) {
//               console.error(`Error fetching image for category ${category.title}:`, error);
//               return {
//                 ...category,
//                 image: `https://via.placeholder.com/800x600?text=${category.title}`
//               };
//             }
//           })
//         );
        
//         // Fetch premium selection images
//         const premiumWithImages = await Promise.all(
//           premiumSelectionsTemplate.map(async (item) => {
//             try {
//               const imageURL = await getMostRecentImage(item.imageFolderPath);
//               return {
//                 ...item,
//                 image: imageURL
//               };
//             } catch (error) {
//               console.error(`Error fetching image for premium selection ${item.name}:`, error);
//               return {
//                 ...item,
//                 image: `https://via.placeholder.com/800x600?text=${item.name}`
//               };
//             }
//           })
//         );
        
//         // Fetch combo pack images
//         const combosWithImages = await Promise.all(
//           comboPacksTemplate.map(async (combo) => {
//             try {
//               const imageURL = await getMostRecentImage(combo.imageFolderPath);
//               return {
//                 ...combo,
//                 image: imageURL
//               };
//             } catch (error) {
//               console.error(`Error fetching image for combo pack ${combo.name}:`, error);
//               return {
//                 ...combo,
//                 image: `https://via.placeholder.com/800x600?text=${combo.name}`
//               };
//             }
//           })
//         );
        
//         // Fetch testimonial images
//         const testimonialsWithImages = await Promise.all(
//           testimonialsTemplate.map(async (testimonial) => {
//             try {
//               const imageURL = await getMostRecentImage(testimonial.imageFolderPath);
//               return {
//                 ...testimonial,
//                 image: imageURL
//               };
//             } catch (error) {
//               console.error(`Error fetching image for testimonial ${testimonial.name}:`, error);
//               return {
//                 ...testimonial,
//                 image: `https://via.placeholder.com/200x200?text=${testimonial.name}`
//               };
//             }
//           })
//         );
        
//         // Fetch promotional image
//         const promoImageURL = await getMostRecentImage("promotions/specialOffer");
        
//         // Fetch app preview image
//         const appPreviewImageURL = await getMostRecentImage("promotions/appPreview");
        
//         // Update state with all fetched data
//         setCategories(categoriesWithImages);
//         setPremiumSelections(premiumWithImages);
//         setComboPacks(combosWithImages);
//         setTestimonials(testimonialsWithImages);
//         setPromoImage(promoImageURL);
//         setAppPreviewImage(appPreviewImageURL);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchImageURLs();
    
//     // Set up a refresh interval to check for new images every 5 minutes
//     const refreshInterval = setInterval(fetchImageURLs, 5 * 60 * 1000);
    
//     return () => {
//       clearInterval(refreshInterval);
//     };
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="home-page loading">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-page">
//       {/* Main Banner/Slider */}
//       <Banner />
      
//       {/* Quality Guarantees */}
//       <section className="quality-guarantees">
//         <div className="container">
//           <div className="guarantees-grid">
//             {qualityFeatures.map((feature, index) => (
//               <div key={index} className="guarantee-card">
//                 <div className="guarantee-icon">
//                   {feature.icon}
//                 </div>
//                 <div className="guarantee-content">
//                   <h3>{feature.title}</h3>
//                   <p>{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Category Showcase */}
//       <section className="category-showcase">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Shop by Category</h2>
//             <Link to="/categories" className="view-all">
//               View All Categories <FaArrowRight />
//             </Link>
//           </div>
          
//           <div className="categories-grid">
//             {categories.map((category, index) => (
//               <div key={index} className="category-card">
//                 <div className="category-image">
//                   <img 
//                     src={category.image} 
//                     alt={category.title} 
//                     loading="lazy" 
//                     onError={(e) => {
//                       console.error(`Error loading image for ${category.title}`);
//                       e.target.src = `https://via.placeholder.com/800x600?text=${category.title}`;
//                     }}
//                   />
//                 </div>
//                 <div className="category-content">
//                   <h3>{category.title}</h3>
//                   <ul className="category-items">
//                     {category.items.map((item, idx) => (
//                       <li key={idx}>
//                         <FaCheckCircle className="check-icon" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                   <Link 
//                     to={`/shop?category=${category.title.toLowerCase()}`} 
//                     className="explore-category"
//                   >
//                     Explore {category.title} <FaArrowRight />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Featured Products */}
//       <section className="featured-products">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Featured Products</h2>
//             <Link to="/shop" className="view-all">
//               View All Products <FaArrowRight />
//             </Link>
//           </div>
          
//           <div className="products-grid">
//             {featuredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Promotional Banner */}
//       <section className="promo-banner">
//         <div className="container">
//           <div className="promo-content">
//             <div className="promo-text">
//               <span className="promo-tag">Limited Time Offer</span>
//               <h2>First Order Discount</h2>
//               <p>Get 20% off on your first order with code: <span className="promo-code">FRESH20</span></p>
//               <ul className="promo-features">
//                 <li><FaCheckCircle /> Free delivery on orders above ₹500</li>
//                 <li><FaCheckCircle /> Premium quality guaranteed</li>
//                 <li><FaCheckCircle /> Easy returns within 24 hours</li>
//               </ul>
//               <Link to="/shop" className="promo-btn">
//                 Shop Now <FaArrowRight />
//               </Link>
//             </div>
//             <div className="promo-image">
//               <img 
//                 src={promoImage} 
//                 alt="Special Offer" 
//                 loading="lazy"
//                 onError={(e) => {
//                   console.error('Error loading promo image');
//                   e.target.src = `https://via.placeholder.com/800x600?text=Special+Offer`;
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Premium Selections */}
//       <section className="premium-selections">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Premium Selections</h2>
//             <span className="section-subtitle">Exclusive, high-quality meats for special occasions</span>
//           </div>
          
//           <div className="premium-grid">
//             {premiumSelections.map((item, index) => (
//               <div key={index} className="premium-card">
//                 <div className="premium-image">
//                   <img 
//                     src={item.image} 
//                     alt={item.name} 
//                     loading="lazy"
//                     onError={(e) => {
//                       console.error(`Error loading image for ${item.name}`);
//                       e.target.src = `https://via.placeholder.com/800x600?text=${item.name}`;
//                     }}
//                   />
//                   <div className="origin-tag">
//                     <FaMedal /> {item.origin}
//                   </div>
//                 </div>
//                 <div className="premium-content">
//                   <h3>{item.name}</h3>
//                   <p>{item.description}</p>
//                   <div className="premium-price">₹{item.price}</div>
//                   <button className="premium-btn">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Value Combo Packs */}
//       <section className="combo-packs">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Value Combo Packs</h2>
//             <span className="section-subtitle">Save more with these specially curated combos</span>
//           </div>
          
//           <div className="combo-grid">
//             {comboPacks.map((combo, index) => (
//               <div key={index} className="combo-card">
//                 <div className="combo-image">
//                   <img 
//                     src={combo.image} 
//                     alt={combo.name} 
//                     loading="lazy"
//                     onError={(e) => {
//                       console.error(`Error loading image for ${combo.name}`);
//                       e.target.src = `https://via.placeholder.com/800x600?text=${combo.name}`;
//                     }}
//                   />
//                   <div className="savings-tag">{combo.savings}</div>
//                 </div>
//                 <div className="combo-content">
//                   <h3>{combo.name}</h3>
//                   <p className="combo-items">{combo.items}</p>
//                   <div className="combo-price">
//                     <span className="current-price">₹{combo.price}</span>
//                     <span className="original-price">₹{combo.originalPrice}</span>
//                   </div>
//                   <button className="combo-btn">Add to Cart</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section className="testimonials">
//         <div className="container">
//           <div className="section-header center">
//             <h2 className="section-title">What Our Customers Say</h2>
//             <span className="section-subtitle">Don't just take our word for it</span>
//           </div>
          
//           <div className="testimonials-grid">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-header">
//                   <div className="customer-info">
//                     <div className="customer-image">
//                       <img 
//                         src={testimonial.image} 
//                         alt={testimonial.name} 
//                         loading="lazy"
//                         onError={(e) => {
//                           console.error(`Error loading image for ${testimonial.name}`);
//                           e.target.src = `https://via.placeholder.com/200x200?text=${testimonial.name}`;
//                         }}
//                       />
//                     </div>
//                     <div className="customer-details">
//                       <h4>{testimonial.name}</h4>
//                       <span className="testimonial-date">{testimonial.date}</span>
//                     </div>
//                   </div>
//                   <div className="rating">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <span key={i} className="star">★</span>
//                     ))}
//                     {[...Array(5 - testimonial.rating)].map((_, i) => (
//                       <span key={i} className="star empty">★</span>
//                     ))}
//                   </div>
//                 </div>
//                 <p className="testimonial-text">{testimonial.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* App Download */}
//       <section className="app-download">
//         <div className="container">
//           <div className="app-content">
//             <div className="app-text">
//               <h2>Download Our App</h2>
//               <p>Get exclusive offers and track your orders in real-time</p>
//               <ul className="app-features">
//                 <li><FaCheckCircle /> Exclusive app-only offers</li>
//                 <li><FaCheckCircle /> Real-time order tracking</li>
//                 <li><FaCheckCircle /> Easy re-ordering</li>
//                 <li><FaCheckCircle /> Loyalty rewards</li>
//               </ul>
//               <div className="app-buttons">
//                 <a href="#" className="app-btn">
//                   <img src={GooglePlay} alt="Get it on Google Play" />
//                 </a>
//                 <a href="#" className="app-btn">
//                   <img src={AppStore} alt="Download on App Store" />
//                 </a>
//               </div>
//             </div>
//             <div className="app-image">
//               <img 
//                 src={appPreviewImage} 
//                 alt="App Preview" 
//                 loading="lazy"
//                 onError={(e) => {
//                   console.error('Error loading app preview image');
//                   e.target.src = `https://via.placeholder.com/300x600?text=App+Preview`;
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaShieldAlt, 
  FaClock, 
  FaLeaf, 
  FaCheckCircle,
  FaMedal,
  FaTruck
} from 'react-icons/fa';
import { database, storage } from '../../firebase';
import { ref as dbRef, get, child } from 'firebase/database';
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/Home.css';

// Import app store icons - these typically don't need to be dynamic
import GooglePlay from '../assets/Google Play.jpg';
import AppStore from '../assets/App Store.png';

const Home = () => {
  // Filter products for featured section
  const featuredProducts = products.slice(0, 4);
  
  // State variables for data loaded from Firebase
  const [categories, setCategories] = useState([]);
  const [premiumSelections, setPremiumSelections] = useState([]);
  const [comboPacks, setComboPacks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [promoContent, setPromoContent] = useState({
    title: 'Limited Time Offer',
    subtitle: 'First Order Discount',
    description: 'Get 20% off on your first order with code:',
    promoCode: 'FRESH20',
    features: [
      'Free delivery on orders above ₹500',
      'Premium quality guaranteed',
      'Easy returns within 24 hours'
    ],
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    promoImage: '',
    appPreviewImage: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quality guarantee features (no images needed - static content)
  const qualityFeatures = [
    {
      icon: <FaShieldAlt />,
      title: "Premium Quality",
      description: "Sourced from certified farms and suppliers"
    },
    {
      icon: <FaLeaf />,
      title: "Antibiotic-Free",
      description: "No added hormones or antibiotics"
    },
    {
      icon: <FaClock />,
      title: "Farm to Home",
      description: "Delivered fresh within 24 hours"
    },
    {
      icon: <FaTruck />,
      title: "Express Delivery",
      description: "Same day delivery available"
    }
  ];

  // Function to get the most recent image from a folder
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

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      
      try {
        await Promise.all([
          fetchCategories(),
          fetchPremiumSelections(),
          fetchComboPacks(),
          fetchTestimonials(),
          fetchPromoContent()
        ]);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setError("Failed to load homepage data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
    
    // Set up a refresh interval to check for new data every 5 minutes
    const refreshInterval = setInterval(fetchAllData, 5 * 60 * 1000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);
  
  // Fetch categories from Firebase
  const fetchCategories = async () => {
    try {
      const categoriesRef = dbRef(database, 'homeCategories');
      const snapshot = await get(categoriesRef);
      
      if (snapshot.exists()) {
        const categoriesData = snapshot.val();
        // Convert from object to array if needed
        const categoriesArray = Array.isArray(categoriesData) 
          ? categoriesData 
          : Object.values(categoriesData);
          
        // Fetch images for each category
        const categoriesWithImages = await Promise.all(
          categoriesArray.map(async (category) => {
            try {
              const imageURL = await getMostRecentImage(`homeCategories/${category.title.toLowerCase()}`);
              return { ...category, image: imageURL };
            } catch (error) {
              console.error(`Error fetching image for ${category.title}:`, error);
              return {
                ...category,
                image: `https://via.placeholder.com/800x600?text=${category.title}`
              };
            }
          })
        );
        
        setCategories(categoriesWithImages);
      } else {
        // If no data, use default template
        console.log("No categories found in database, using template data");
        const defaultCategories = [
          {
            id: 1,
            title: "Chicken",
            items: ["Whole Chicken", "Boneless", "Curry Cut", "Wings", "Leg Piece"]
          },
          {
            id: 2,
            title: "Mutton",
            items: ["Curry Cut", "Boneless", "Chops", "Biryani Cut", "Keema"]
          },
          {
            id: 3,
            title: "Fish & Seafood",
            items: ["Fish", "Prawns", "Crab", "Tuna", "Salmon"]
          }
        ];
        
        const defaultCategoriesWithImages = await Promise.all(
          defaultCategories.map(async (category) => {
            try {
              const imageURL = await getMostRecentImage(`homeCategories/${category.title.toLowerCase()}`);
              return { ...category, image: imageURL };
            } catch (error) {
              return {
                ...category,
                image: `https://via.placeholder.com/800x600?text=${category.title}`
              };
            }
          })
        );
        
        setCategories(defaultCategoriesWithImages);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };
  
  // Fetch premium selections from Firebase
  const fetchPremiumSelections = async () => {
    try {
      const premiumRef = dbRef(database, 'premiumSelections');
      const snapshot = await get(premiumRef);
      
      if (snapshot.exists()) {
        const premiumData = snapshot.val();
        // Convert from object to array if needed
        const premiumArray = Array.isArray(premiumData) 
          ? premiumData 
          : Object.values(premiumData);
          
        // Fetch images for each premium selection
        const premiumWithImages = await Promise.all(
          premiumArray.map(async (item) => {
            try {
              const folderPath = `premiumSelections/${item.name.replace(/\s+/g, '').toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...item, image: imageURL };
            } catch (error) {
              console.error(`Error fetching image for ${item.name}:`, error);
              return {
                ...item,
                image: `https://via.placeholder.com/800x600?text=${item.name}`
              };
            }
          })
        );
        
        setPremiumSelections(premiumWithImages);
      } else {
        // If no data, use default template
        console.log("No premium selections found in database, using template data");
        const defaultPremium = [
          {
            id: 1,
            name: "Premium Chicken Breast",
            price: 399,
            description: "Farm-raised antibiotic-free premium chicken breast",
            origin: "Local Farms"
          },
          {
            id: 2,
            name: "Norwegian Salmon",
            price: 1299,
            description: "Wild caught Atlantic salmon, rich in Omega-3",
            origin: "Norway"
          },
          {
            id: 3,
            name: "Premium Mutton Cuts",
            price: 999,
            description: "Grass-fed, free-range mutton with a rich flavor",
            origin: "Local Farms"
          }
        ];
        
        const defaultPremiumWithImages = await Promise.all(
          defaultPremium.map(async (item) => {
            try {
              const folderPath = `premiumSelections/${item.name.replace(/\s+/g, '').toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...item, image: imageURL };
            } catch (error) {
              return {
                ...item,
                image: `https://via.placeholder.com/800x600?text=${item.name}`
              };
            }
          })
        );
        
        setPremiumSelections(defaultPremiumWithImages);
      }
    } catch (error) {
      console.error("Error fetching premium selections:", error);
      throw error;
    }
  };
  
  // Fetch combo packs from Firebase
  const fetchComboPacks = async () => {
    try {
      const comboRef = dbRef(database, 'comboPacks');
      const snapshot = await get(comboRef);
      
      if (snapshot.exists()) {
        const comboData = snapshot.val();
        // Convert from object to array if needed
        const comboArray = Array.isArray(comboData) 
          ? comboData 
          : Object.values(comboData);
          
        // Fetch images for each combo pack
        const combosWithImages = await Promise.all(
          comboArray.map(async (combo) => {
            try {
              const folderPath = `comboPacks/${combo.name.replace(/\s+/g, '').toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...combo, image: imageURL };
            } catch (error) {
              console.error(`Error fetching image for ${combo.name}:`, error);
              return {
                ...combo,
                image: `https://via.placeholder.com/800x600?text=${combo.name}`
              };
            }
          })
        );
        
        setComboPacks(combosWithImages);
      } else {
        // If no data, use default template
        console.log("No combo packs found in database, using template data");
        const defaultCombos = [
          {
            id: 1,
            name: "Meat Lover's Pack",
            items: "Chicken Drumsticks + Mutton Curry Cut + Fish Fillets",
            price: 999,
            originalPrice: 1299,
            savings: "Save ₹300"
          },
          {
            id: 2,
            name: "Premium Seafood Pack",
            items: "Norwegian Salmon + Prawns + Fish Curry Cut",
            price: 1499,
            originalPrice: 1999,
            savings: "Save ₹500"
          }
        ];
        
        const defaultCombosWithImages = await Promise.all(
          defaultCombos.map(async (combo) => {
            try {
              const folderPath = `comboPacks/${combo.name.replace(/\s+/g, '').toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...combo, image: imageURL };
            } catch (error) {
              return {
                ...combo,
                image: `https://via.placeholder.com/800x600?text=${combo.name}`
              };
            }
          })
        );
        
        setComboPacks(defaultCombosWithImages);
      }
    } catch (error) {
      console.error("Error fetching combo packs:", error);
      throw error;
    }
  };
  
  // Fetch testimonials from Firebase
  const fetchTestimonials = async () => {
    try {
      const testimonialsRef = dbRef(database, 'testimonials');
      const snapshot = await get(testimonialsRef);
      
      if (snapshot.exists()) {
        const testimonialsData = snapshot.val();
        // Convert from object to array if needed
        const testimonialsArray = Array.isArray(testimonialsData) 
          ? testimonialsData 
          : Object.values(testimonialsData);
          
        // Fetch images for each testimonial
        const testimonialsWithImages = await Promise.all(
          testimonialsArray.map(async (testimonial) => {
            try {
              const folderPath = `testimonials/customers/${testimonial.name.split(' ')[0].toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...testimonial, image: imageURL };
            } catch (error) {
              console.error(`Error fetching image for ${testimonial.name}:`, error);
              return {
                ...testimonial,
                image: `https://via.placeholder.com/200x200?text=${testimonial.name.split(' ')[0]}`
              };
            }
          })
        );
        
        setTestimonials(testimonialsWithImages);
      } else {
        // If no data, use default template
        console.log("No testimonials found in database, using template data");
        const defaultTestimonials = [
          {
            id: 1,
            name: "Priya S.",
            rating: 5,
            text: "The quality of chicken is exceptional! I've been ordering for 6 months now and have never been disappointed. The chicken is always fresh and the delivery is prompt.",
            date: "3 weeks ago"
          },
          {
            id: 2,
            name: "Rajesh K.",
            rating: 5,
            text: "Best seafood in town. Their fish is always fresh and perfectly cleaned. The packaging is excellent and the delivery is always on time.",
            date: "1 month ago"
          },
          {
            id: 3,
            name: "Ananya M.",
            rating: 4,
            text: "Great variety of mutton cuts and excellent customer service. The quality is superior to what I get from local markets. Highly recommend!",
            date: "2 months ago"
          }
        ];
        
        const defaultTestimonialsWithImages = await Promise.all(
          defaultTestimonials.map(async (testimonial) => {
            try {
              const folderPath = `testimonials/customers/${testimonial.name.split(' ')[0].toLowerCase()}`;
              const imageURL = await getMostRecentImage(folderPath);
              return { ...testimonial, image: imageURL };
            } catch (error) {
              return {
                ...testimonial,
                image: `https://via.placeholder.com/200x200?text=${testimonial.name.split(' ')[0]}`
              };
            }
          })
        );
        
        setTestimonials(defaultTestimonialsWithImages);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }
  };
  
  // Fetch promo content from Firebase
  const fetchPromoContent = async () => {
    try {
      const promoRef = dbRef(database, 'promoContent');
      const snapshot = await get(promoRef);
      
      let promoData = {
        title: 'Limited Time Offer',
        subtitle: 'First Order Discount',
        description: 'Get 20% off on your first order with code:',
        promoCode: 'FRESH20',
        features: [
          'Free delivery on orders above ₹500',
          'Premium quality guaranteed',
          'Easy returns within 24 hours'
        ],
        buttonText: 'Shop Now',
        buttonLink: '/shop'
      };
      
      if (snapshot.exists()) {
        promoData = {...promoData, ...snapshot.val()};
      }
      
      // Get promo images
      try {
        const promoImageURL = await getMostRecentImage("promotions/specialOffer");
        const appPreviewImageURL = await getMostRecentImage("promotions/appPreview");
        
        promoData = {
          ...promoData,
          promoImage: promoImageURL,
          appPreviewImage: appPreviewImageURL
        };
      } catch (error) {
        console.error("Error fetching promo images:", error);
      }
      
      setPromoContent(promoData);
    } catch (error) {
      console.error("Error fetching promo content:", error);
      throw error;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="home-page loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="home-page error">
        <div className="error-message">{error}</div>
        <button onClick={() => window.location.reload()} className="reload-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Main Banner/Slider */}
      <Banner />
      
      {/* Quality Guarantees */}
      <section className="quality-guarantees">
        <div className="container">
          <div className="guarantees-grid">
            {qualityFeatures.map((feature, index) => (
              <div key={index} className="guarantee-card">
                <div className="guarantee-icon">
                  {feature.icon}
                </div>
                <div className="guarantee-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Showcase */}
      <section className="category-showcase">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/categories" className="view-all">
              View All Categories <FaArrowRight />
            </Link>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={category.id || index} className="category-card">
                <div className="category-image">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    loading="lazy" 
                    onError={(e) => {
                      console.error(`Error loading image for ${category.title}`);
                      e.target.src = `https://via.placeholder.com/800x600?text=${category.title}`;
                    }}
                  />
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <ul className="category-items">
                    {category.items && category.items.map((item, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="check-icon" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={`/shop?category=${category.title.toLowerCase()}`} 
                    className="explore-category"
                  >
                    Explore {category.title} <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="view-all">
              View All Products <FaArrowRight />
            </Link>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <span className="promo-tag">{promoContent.title}</span>
              <h2>{promoContent.subtitle}</h2>
              <p>{promoContent.description} <span className="promo-code">{promoContent.promoCode}</span></p>
              <ul className="promo-features">
                {promoContent.features && promoContent.features.map((feature, index) => (
                  <li key={index}><FaCheckCircle /> {feature}</li>
                ))}
              </ul>
              <Link to={promoContent.buttonLink || "/shop"} className="promo-btn">
                {promoContent.buttonText || "Shop Now"} <FaArrowRight />
              </Link>
            </div>
            <div className="promo-image">
              <img 
                src={promoContent.promoImage} 
                alt="Special Offer" 
                loading="lazy"
                onError={(e) => {
                  console.error('Error loading promo image');
                  e.target.src = `https://via.placeholder.com/800x600?text=Special+Offer`;
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Premium Selections */}
      {premiumSelections.length > 0 && (
        <section className="premium-selections">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Premium Selections</h2>
              <span className="section-subtitle">Exclusive, high-quality meats for special occasions</span>
            </div>
            
            <div className="premium-grid">
              {premiumSelections.map((item, index) => (
                <div key={item.id || index} className="premium-card">
                  <div className="premium-image">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Error loading image for ${item.name}`);
                        e.target.src = `https://via.placeholder.com/800x600?text=${item.name}`;
                      }}
                    />
                    <div className="origin-tag">
                      <FaMedal /> {item.origin}
                    </div>
                  </div>
                  <div className="premium-content">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="premium-price">₹{item.price}</div>
                    <button className="premium-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Value Combo Packs */}
      {comboPacks.length > 0 && (
        <section className="combo-packs">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Value Combo Packs</h2>
              <span className="section-subtitle">Save more with these specially curated combos</span>
            </div>
            
            <div className="combo-grid">
              {comboPacks.map((combo, index) => (
                <div key={combo.id || index} className="combo-card">
                  <div className="combo-image">
                    <img 
                      src={combo.image} 
                      alt={combo.name} 
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Error loading image for ${combo.name}`);
                        e.target.src = `https://via.placeholder.com/800x600?text=${combo.name}`;
                      }}
                    />
                    <div className="savings-tag">{combo.savings}</div>
                  </div>
                  <div className="combo-content">
                    <h3>{combo.name}</h3>
                    <p className="combo-items">{combo.items}</p>
                    <div className="combo-price">
                      <span className="current-price">₹{combo.price}</span>
                      <span className="original-price">₹{combo.originalPrice}</span>
                    </div>
                    <button className="combo-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="testimonials">
          <div className="container">
            <div className="section-header center">
              <h2 className="section-title">What Our Customers Say</h2>
              <span className="section-subtitle">Don't just take our word for it</span>
            </div>
            
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id || index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="customer-info">
                      <div className="customer-image">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          loading="lazy"
                          onError={(e) => {
                            console.error(`Error loading image for ${testimonial.name}`);
                            e.target.src = `https://via.placeholder.com/200x200?text=${testimonial.name.split(' ')[0]}`;
                          }}
                        />
                      </div>
                      <div className="customer-details">
                        <h4>{testimonial.name}</h4>
                        <span className="testimonial-date">{testimonial.date}</span>
                      </div>
                    </div>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <span key={i} className="star empty">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* App Download */}
      <section className="app-download">
        <div className="container">
          <div className="app-content">
            <div className="app-text">
              <h2>Download Our App</h2>
              <p>Get exclusive offers and track your orders in real-time</p>
              <ul className="app-features">
                <li><FaCheckCircle /> Exclusive app-only offers</li>
                <li><FaCheckCircle /> Real-time order tracking</li>
                <li><FaCheckCircle /> Easy re-ordering</li>
                <li><FaCheckCircle /> Loyalty rewards</li>
              </ul>
              <div className="app-buttons">
                <a href="#" className="app-btn">
                  <img src={GooglePlay} alt="Get it on Google Play" />
                </a>
                <a href="#" className="app-btn">
                  <img src={AppStore} alt="Download on App Store" />
                </a>
              </div>
            </div>
            <div className="app-image">
              <img 
                src={promoContent.appPreviewImage} 
                alt="App Preview" 
                loading="lazy"
                onError={(e) => {
                  console.error('Error loading app preview image');
                  e.target.src = `https://via.placeholder.com/300x600?text=App+Preview`;
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;