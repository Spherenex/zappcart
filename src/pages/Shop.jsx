import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaLeaf } from 'react-icons/fa';
import ProductList from "../components/ProductList";
import { products } from "../data/products";
import "../styles/Shop.css";

const Shop = () => {
  const [initialCategory, setInitialCategory] = useState('all');

  // Effect to handle initial category from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category');

    if (categoryParam) {
      // Capitalize first letter and handle special case for "Fish & Seafood"
      const formattedCategory = categoryParam === 'fish' 
        ? 'Fish & Seafood' 
        : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      
      setInitialCategory(formattedCategory);
    }
  }, []);

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="hero-content">
          <h1>Fresh & Quality Meats</h1>
          <p>Discover premium chicken, mutton, and seafood products sourced with care</p>
          
          <div className="hero-features">
            <div className="feature-item">
              <FaTruck className="feature-icon" />
              <span>Free Delivery</span>
            </div>
            <div className="feature-item">
              <FaLeaf className="feature-icon" />
              <span>Fresh Produce</span>
            </div>
            <div className="feature-item">
              <FaShoppingCart className="feature-icon" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img 
            src="/api/placeholder/500/400?text=Fresh+Meats" 
            alt="Fresh Meat Selection" 
            className="hero-image" 
          />
        </div>
      </div>

      {/* Product List with Advanced Filtering */}
      <div className="shop-products-section">
        <ProductList 
          products={products} 
          initialCategory={initialCategory} 
        />
      </div>
    </div>
  );
};

export default Shop;

// import React, { useState, useEffect } from "react";
// import { FaShoppingCart, FaTruck, FaLeaf } from 'react-icons/fa';
// import ProductList from "../components/ProductList";
// import { useProductsData } from "../data/products"; // Import the context hook instead of direct products
// import "../styles/Shop.css";

// const Shop = () => {
//   const [initialCategory, setInitialCategory] = useState('all');
//   const { products, isLoading } = useProductsData(); // Get products from context

//   // Effect to handle initial category from URL
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const categoryParam = searchParams.get('category');

//     if (categoryParam) {
//       // Capitalize first letter and handle special case for "Fish & Seafood"
//       const formattedCategory = categoryParam === 'fish' 
//         ? 'Fish & Seafood' 
//         : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      
//       setInitialCategory(formattedCategory);
//     }
//   }, []);

//   return (
//     <div className="shop-page">
//       {/* Hero Section */}
//       <div className="shop-hero">
//         <div className="hero-content">
//           <h1>Fresh & Quality Meats</h1>
//           <p>Discover premium chicken, mutton, and seafood products sourced with care</p>
          
//           <div className="hero-features">
//             <div className="feature-item">
//               <FaTruck className="feature-icon" />
//               <span>Free Delivery</span>
//             </div>
//             <div className="feature-item">
//               <FaLeaf className="feature-icon" />
//               <span>Fresh Produce</span>
//             </div>
//             <div className="feature-item">
//               <FaShoppingCart className="feature-icon" />
//               <span>Quality Guaranteed</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="hero-image-container">
//           <img 
//             src="/api/placeholder/500/400?text=Fresh+Meats" 
//             alt="Fresh Meat Selection" 
//             className="hero-image" 
//           />
//         </div>
//       </div>

//       {/* Product List with Advanced Filtering */}
//       <div className="shop-products-section">
//         {isLoading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading products...</p>
//           </div>
//         ) : (
//           <ProductList 
//             products={products} 
//             initialCategory={initialCategory} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop;