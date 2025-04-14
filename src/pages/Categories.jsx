// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowRight, FaShoppingBasket, FaRegListAlt, FaClock } from 'react-icons/fa';
// import WholeMutton from '../assets/Mutton Curry Cut1.jpg'
// import FishSeafood from '../assets/Norwegian Salmon1.jpg'
// import MuttonSelection from '../assets/Mutton Curry Cut1.jpg'
// import wholefish from '../assets/Fish & Seafood1.jpg'
// import Subscription from '../assets/Subscription.png'
// import WholeChicken from '../assets/Whole Chicken.jpg'
// import '../styles/Categories.css';

// // Detailed category data - only including chicken, mutton, and fish
// const meatCategories = [
//   { 
//     id: 1, 
//     name: "Chicken", 
//     image: WholeChicken, 
//     description: "Antibiotic-free, farm-raised chicken cuts that are cleaned and ready to cook.",
//     popularItems: ["Boneless Breast", "Curry Cut", "Wings", "Drumsticks"],
//     tagline: "Farm Fresh Daily"
//   },
//   { 
//     id: 2, 
//     name: "Mutton", 
//     image: WholeMutton, 
//     description: "Premium quality tender and juicy mutton for your special dishes.",
//     popularItems: ["Curry Cut", "Boneless", "Keema", "Biryani Cut"],
//     tagline: "Premium Cuts"
//   },
//   { 
//     id: 3, 
//     name: "Fish & Seafood", 
//     image: FishSeafood, 
//     description: "Freshly caught and cleaned fish and seafood options delivered to your home.",
//     popularItems: ["Rohu", "Pomfret", "Prawns", "Salmon"],
//     tagline: "Ocean Fresh"
//   }
// ];

// // Special collections - modified to focus on our three categories
// const specialCollections = [
//   {
//     id: 1,
//     name: "Chicken Specials",
//     image: WholeChicken,
//     description: "Premium chicken cuts for your everyday meals",
//     products: 8,
//   },
//   {
//     id: 2,
//     name: "Mutton Selection",
//     image: MuttonSelection,
//     description: "High-quality mutton for special occasions",
//     products: 6,
//   },
//   {
//     id: 3,
//     name: "Fresh Fish",
//     image: wholefish,
//     description: "Ocean-fresh fish and seafood options",
//     products: 7,
//   }
// ];

// const Categories = () => {
//   return (
//     <div className="categories-page">
//       <div className="categories-hero">
//         <div className="categories-hero-content">
//           <h1>Explore Fresh Categories</h1>
//           <p>Premium quality meat and seafood delivered to your doorstep</p>
//         </div>
//       </div>
      
//       <div className="categories-container">
//         {/* Features Banner */}
//         <div className="features-banner">
//           <div className="feature-item">
//             <FaShoppingBasket className="feature-icon" />
//             <div className="feature-content">
//               <h3>Premium Quality</h3>
//               <p>Sourced from certified farms</p>
//             </div>
//           </div>
          
//           <div className="feature-item">
//             <FaRegListAlt className="feature-icon" />
//             <div className="feature-content">
//               <h3>150+ Quality Checks</h3>
//               <p>For the best quality assurance</p>
//             </div>
//           </div>
          
//           <div className="feature-item">
//             <FaClock className="feature-icon" />
//             <div className="feature-content">
//               <h3>Express Delivery</h3>
//               <p>Same day delivery available</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Main Categories */}
//         <section className="main-categories">
//           <h2 className="section-title">
//             <span className="highlight">Premium</span> Categories
//           </h2>
          
//           <div className="categories-grid">
//             {meatCategories.map((category) => (
//               <div key={category.id} className="category-card">
//                 <div className="category-image-container">
//                   <img 
//                     src={category.image} 
//                     alt={category.name}
//                     className="category-image"
//                   />
//                   <div className="category-tag">{category.tagline}</div>
//                 </div>
                
//                 <div className="category-content">
//                   <h3 className="category-title">{category.name}</h3>
//                   <p className="category-description">{category.description}</p>
                  
//                   <div className="popular-items">
//                     <h4>Popular Items:</h4>
//                     <ul className="popular-items-list">
//                       {category.popularItems.map((item, index) => (
//                         <li key={index} className="popular-item">{item}</li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <Link to={`/shop?category=${category.name.toLowerCase()}`} className="shop-category-btn">
//                     Explore {category.name} <FaArrowRight />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
        
//         {/* Special Collections */}
//         <section className="special-collections">
//           <h2 className="section-title">
//             Special <span className="highlight">Collections</span>
//           </h2>
          
//           <div className="collections-grid">
//             {specialCollections.map(collection => (
//               <div key={collection.id} className="collection-card">
//                 <div className="collection-image-wrapper">
//                   <img 
//                     src={collection.image}
//                     alt={collection.name}
//                     className="collection-image"
//                   />
//                 </div>
                
//                 <div className="collection-content">
//                   <h3 className="collection-title">{collection.name}</h3>
//                   <p className="collection-description">{collection.description}</p>
//                   <div className="collection-products">{collection.products} Products</div>
                  
//                   <Link to={`/shop?collection=${collection.name.toLowerCase().replace(/\s+/g, '-')}`} className="view-collection-btn">
//                     View Collection
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
        
//         {/* Subscription Banner */}
//         <section className="subscription-banner">
//           <div className="subscription-content">
//             <h2>Subscribe & Save</h2>
//             <p>Get your favorite meat & seafood delivered weekly or monthly and save up to 15%</p>
//             <Link to="/subscription" className="subscribe-btn">
//               Explore Plans
//             </Link>
//           </div>
//           <div className="subscription-image">
//             <img src={Subscription} alt="Subscription" />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingBasket, FaRegListAlt, FaClock } from 'react-icons/fa';
import { storage } from '../../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import '../styles/Categories.css';

// Define the template data without images (images will be loaded dynamically)
const meatCategoriesTemplate = [
  { 
    id: 1, 
    name: "Chicken", 
    imageFolderPath: "categories/chicken", 
    description: "Antibiotic-free, farm-raised chicken cuts that are cleaned and ready to cook.",
    popularItems: ["Boneless Breast", "Curry Cut", "Wings", "Drumsticks"],
    tagline: "Farm Fresh Daily"
  },
  { 
    id: 2, 
    name: "Mutton", 
    imageFolderPath: "categories/mutton", 
    description: "Premium quality tender and juicy mutton for your special dishes.",
    popularItems: ["Curry Cut", "Boneless", "Keema", "Biryani Cut"],
    tagline: "Premium Cuts"
  },
  { 
    id: 3, 
    name: "Fish & Seafood", 
    imageFolderPath: "categories/fishSeafood", 
    description: "Freshly caught and cleaned fish and seafood options delivered to your home.",
    popularItems: ["Rohu", "Pomfret", "Prawns", "Salmon"],
    tagline: "Ocean Fresh"
  }
];

// Special collections template data without images
const specialCollectionsTemplate = [
  {
    id: 1,
    name: "Chicken Specials",
    imageFolderPath: "collections/chickenSpecials",
    description: "Premium chicken cuts for your everyday meals",
    products: 8,
  },
  {
    id: 2,
    name: "Mutton Selection",
    imageFolderPath: "collections/muttonSelection",
    description: "High-quality mutton for special occasions",
    products: 6,
  },
  {
    id: 3,
    name: "Fresh Fish",
    imageFolderPath: "collections/freshFish",
    description: "Ocean-fresh fish and seafood options",
    products: 7,
  }
];

const Categories = () => {
  // State to hold data with dynamic images
  const [meatCategories, setMeatCategories] = useState([]);
  const [specialCollections, setSpecialCollections] = useState([]);
  const [subscriptionImage, setSubscriptionImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Function to get the most recent image from a folder (same as your Banner component)
  const getMostRecentImage = async (folderPath) => {
    try {
      const folderRef = ref(storage, folderPath);
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

  // Fetch images from Firebase Storage for all content
  useEffect(() => {
    const fetchImageURLs = async () => {
      setIsLoading(true);
      
      try {
        // Fetch meat category images
        const categoriesWithImages = await Promise.all(
          meatCategoriesTemplate.map(async (category) => {
            try {
              // Get the most recent image from the folder
              const imageURL = await getMostRecentImage(category.imageFolderPath);
              
              return {
                ...category,
                image: imageURL,
              };
            } catch (error) {
              console.error(`Error fetching images for category ${category.id}:`, error);
              
              // Return with placeholder image
              return {
                ...category,
                image: `https://via.placeholder.com/800x600?text=Category+${category.name}+Error`,
              };
            }
          })
        );
        
        // Fetch special collections images
        const collectionsWithImages = await Promise.all(
          specialCollectionsTemplate.map(async (collection) => {
            try {
              // Get the most recent image from the folder
              const imageURL = await getMostRecentImage(collection.imageFolderPath);
              
              return {
                ...collection,
                image: imageURL,
              };
            } catch (error) {
              console.error(`Error fetching images for collection ${collection.id}:`, error);
              
              // Return with placeholder image
              return {
                ...collection,
                image: `https://via.placeholder.com/800x600?text=Collection+${collection.name}+Error`,
              };
            }
          })
        );
        
        // Fetch subscription banner image
        const subImageURL = await getMostRecentImage("promotions/subscription");
        
        // Update state with all fetched images
        setMeatCategories(categoriesWithImages);
        setSpecialCollections(collectionsWithImages);
        setSubscriptionImage(subImageURL);
      } catch (error) {
        console.error('Error fetching category images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchImageURLs();
    
    // Set up a refresh interval to check for new images every 5 minutes
    // This ensures content will update without requiring a page refresh
    const refreshInterval = setInterval(fetchImageURLs, 5 * 60 * 1000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="categories-page loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-hero">
        <div className="categories-hero-content">
          <h1>Explore Fresh Categories</h1>
          <p>Premium quality meat and seafood delivered to your doorstep</p>
        </div>
      </div>
      
      <div className="categories-container">
        {/* Features Banner */}
        <div className="features-banner">
          <div className="feature-item">
            <FaShoppingBasket className="feature-icon" />
            <div className="feature-content">
              <h3>Premium Quality</h3>
              <p>Sourced from certified farms</p>
            </div>
          </div>
          
          <div className="feature-item">
            <FaRegListAlt className="feature-icon" />
            <div className="feature-content">
              <h3>150+ Quality Checks</h3>
              <p>For the best quality assurance</p>
            </div>
          </div>
          
          <div className="feature-item">
            <FaClock className="feature-icon" />
            <div className="feature-content">
              <h3>Express Delivery</h3>
              <p>Same day delivery available</p>
            </div>
          </div>
        </div>
        
        {/* Main Categories */}
        <section className="main-categories">
          <h2 className="section-title">
            <span className="highlight">Premium</span> Categories
          </h2>
          
          <div className="categories-grid">
            {meatCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image-container">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="category-image"
                    onError={(e) => {
                      console.error(`Error loading image for ${category.name}`);
                      e.target.src = `https://via.placeholder.com/800x600?text=${category.name}`;
                    }}
                  />
                  <div className="category-tag">{category.tagline}</div>
                </div>
                
                <div className="category-content">
                  <h3 className="category-title">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  
                  <div className="popular-items">
                    <h4>Popular Items:</h4>
                    <ul className="popular-items-list">
                      {category.popularItems.map((item, index) => (
                        <li key={index} className="popular-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to={`/shop?category=${category.name.toLowerCase()}`} className="shop-category-btn">
                    Explore {category.name} <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Special Collections */}
        <section className="special-collections">
          <h2 className="section-title">
            Special <span className="highlight">Collections</span>
          </h2>
          
          <div className="collections-grid">
            {specialCollections.map(collection => (
              <div key={collection.id} className="collection-card">
                <div className="collection-image-wrapper">
                  <img 
                    src={collection.image}
                    alt={collection.name}
                    className="collection-image"
                    onError={(e) => {
                      console.error(`Error loading image for ${collection.name}`);
                      e.target.src = `https://via.placeholder.com/800x600?text=${collection.name}`;
                    }}
                  />
                </div>
                
                <div className="collection-content">
                  <h3 className="collection-title">{collection.name}</h3>
                  <p className="collection-description">{collection.description}</p>
                  <div className="collection-products">{collection.products} Products</div>
                  
                  <Link to={`/shop?collection=${collection.name.toLowerCase().replace(/\s+/g, '-')}`} className="view-collection-btn">
                    View Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Subscription Banner */}
        <section className="subscription-banner">
          <div className="subscription-content">
            <h2>Subscribe & Save</h2>
            <p>Get your favorite meat & seafood delivered weekly or monthly and save up to 15%</p>
            <Link to="/subscription" className="subscribe-btn">
              Explore Plans
            </Link>
          </div>
          <div className="subscription-image">
            <img 
              src={subscriptionImage} 
              alt="Subscription"
              onError={(e) => {
                console.error('Error loading subscription image');
                e.target.src = `https://via.placeholder.com/800x600?text=Subscription`;
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;