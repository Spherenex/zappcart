import { useState, useEffect, createContext, useContext } from 'react';
import { storage } from '../../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

// Import fallback images
import FreshChickenBreast from '../assets/c-brest1.jpg';
import BonelessCuts from '../assets/Boneless Chicken.jpg';
import ChickenDrumsticks from '../assets/Chicken Drumsticks1.jpg';
import PrmiumMutton from '../assets/Mutton Curry Cut1.jpg';
import WildSalman from '../assets/Wild Caught Salmon.jpg';
import Prawn from '../assets/Fresh Prawn.jpg';
import FishCurryCut from '../assets/Fish Curry Cut1.jpg';
import MuttonCurryCut from '../assets/Mutton Curry Cut1.jpg';

// Product data template without images (will be loaded dynamically)
const productsTemplate = [
  {
    id: 1,
    name: 'Fresh Chicken Breast',
    price: 299,
    category: 'Chicken',
    description: 'Farm fresh chicken breast, antibiotic-free',
    fallbackImage: FreshChickenBreast,
    imageFolderPath: 'products/chicken/1',
    rating: 4.5,
    ratingCount: 128,
    discount: 10,
    inStock: true,
    weight: '500g',
    features: ['Antibiotic-free', 'Farm-raised']
  },
  {
    id: 2,
    name: 'Premium Mutton',
    price: 899,
    category: 'Mutton',
    description: 'Grass-fed premium mutton cuts',
    fallbackImage: PrmiumMutton,
    imageFolderPath: 'products/mutton/2',
    rating: 4.3,
    ratingCount: 89,
    inStock: true,
    weight: '1kg',
    features: ['Grass-fed', 'Premium cuts']
  },
  {
    id: 3,
    name: 'Wild Caught Salmon',
    price: 799,
    category: 'Fish & Seafood',
    description: 'Fresh Norwegian salmon fillet',
    fallbackImage: WildSalman,
    imageFolderPath: 'products/fishseafood/3',
    rating: 4.7,
    ratingCount: 156,
    discount: 15,
    inStock: true,
    weight: '500g',
    features: ['Wild-caught', 'Omega-3 rich']
  },
  {
    id: 4,
    name: 'Fresh Prawns',
    price: 499,
    category: 'Fish & Seafood',
    description: 'Daily caught & cleaned prawns',
    fallbackImage: Prawn,
    imageFolderPath: 'products/fishseafood/4',
    rating: 4.4,
    ratingCount: 95,
    inStock: true,
    weight: '250g',
    features: ['Cleaned', 'Deveined']
  },
  {
    id: 7,
    name: 'Boneless Chicken',
    price: 379,
    category: 'Chicken',
    description: 'Clean boneless chicken chunks',
    fallbackImage: BonelessCuts,
    imageFolderPath: 'products/chicken/7',
    rating: 4.8,
    ratingCount: 203,
    inStock: true,
    weight: '500g',
    features: ['Boneless', 'Premium quality']
  },
  {
    id: 8,
    name: 'Fish Curry Cut',
    price: 299,
    category: 'Fish & Seafood',
    description: 'Perfect cuts for curry',
    fallbackImage: FishCurryCut,
    imageFolderPath: 'products/fishseafood/8',
    rating: 4.3,
    ratingCount: 167,
    discount: 5,
    inStock: true,
    weight: '500g',
    features: ['Fresh', 'Curry cut']
  },
  {
    id: 9,
    name: 'Chicken Drumsticks',
    price: 329,
    category: 'Chicken',
    description: 'Juicy chicken drumsticks, perfect for grilling',
    fallbackImage: ChickenDrumsticks,
    imageFolderPath: 'products/chicken/9',
    rating: 4.6,
    ratingCount: 125,
    inStock: true,
    weight: '500g',
    features: ['Fresh', 'Bone-in']
  },
  {
    id: 10,
    name: 'Mutton Curry Cut',
    price: 799,
    category: 'Mutton',
    description: 'Perfect cut pieces for your traditional curry',
    fallbackImage: MuttonCurryCut,
    imageFolderPath: 'products/mutton/10',
    rating: 4.5,
    ratingCount: 92,
    discount: 8,
    inStock: true,
    weight: '500g',
    features: ['Bone-in', 'Fresh cut']
  }
];

// Available categories
export const categories = [
  'Chicken',
  'Mutton',
  'Fish & Seafood'
];

// Function to get the most recent image from a folder (same as Banner component)
const getMostRecentImage = async (folderPath, fallbackImage) => {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);
    
    if (fileList.items.length === 0) {
      console.warn(`No images found in ${folderPath}, using fallback`);
      return fallbackImage;
    }
    
    // Sort files by timestamp in filename (newest first)
    const sortedItems = [...fileList.items].sort((a, b) => {
      // Extract timestamps from filename
      const getTimestamp = (name) => {
        const match = name.match(/image_(\d+)/);
        return match ? parseInt(match[1]) : 0;
      };
      
      const timestampA = getTimestamp(a.name);
      const timestampB = getTimestamp(b.name);
      
      return timestampB - timestampA;
    });
    
    // Get URL of the most recent image
    const imageURL = await getDownloadURL(sortedItems[0]);
    return imageURL;
  } catch (error) {
    console.error(`Error fetching images from ${folderPath}:`, error);
    return fallbackImage;
  }
};

// For backward compatibility - create static products with the same structure as before
// This ensures existing code that imports products directly continues to work
const staticProducts = productsTemplate.map(product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category,
  description: product.description,
  image: product.fallbackImage,
  rating: product.rating,
  ratingCount: product.ratingCount,
  discount: product.discount,
  inStock: product.inStock,
  weight: product.weight,
  features: product.features
}));

// Export the static products array as both named export and default export
// This maintains compatibility with any import style that was used before
export const products = staticProducts;
export default staticProducts;

// Create a context to provide dynamic products data
const ProductsContext = createContext({
  products: staticProducts,
  isLoading: false
});

// Hook to use products data in components
export const useProductsData = () => useContext(ProductsContext);

// Hook to get dynamically updated products
export const useProducts = () => {
  const [dynamicProducts, setDynamicProducts] = useState(staticProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductImages = async () => {
      setIsLoading(true);
      
      try {
        const productsWithImages = await Promise.all(
          productsTemplate.map(async (product) => {
            try {
              // Get dynamic image or use fallback
              const imageURL = await getMostRecentImage(
                product.imageFolderPath, 
                product.fallbackImage
              );
              
              return {
                ...product,
                image: imageURL,
              };
            } catch (error) {
              console.error(`Error fetching image for product ${product.id}:`, error);
              
              // Return with fallback image
              return {
                ...product,
                image: product.fallbackImage,
              };
            }
          })
        );
        
        setDynamicProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching product images:', error);
        
        // Use template with fallback images if error occurs
        setDynamicProducts(staticProducts);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductImages();
    
    // Set up refresh interval (every 5 minutes like Banner)
    const refreshInterval = setInterval(fetchProductImages, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  return { products: dynamicProducts, isLoading };
};

// ProductsProvider component for wrapping your app
export const ProductsProvider = ({ children }) => {
  const { products, isLoading } = useProducts();
  
  // Make products available via context
  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

// import { useState, useEffect, createContext, useContext } from 'react';
// import { database, storage } from '../../firebase';
// import { ref as dbRef, get } from 'firebase/database';
// import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';

// // Import fallback images
// import FreshChickenBreast from '../assets/c-brest1.jpg';
// import BonelessCuts from '../assets/Boneless Chicken.jpg';
// import ChickenDrumsticks from '../assets/Chicken Drumsticks1.jpg';
// import PrmiumMutton from '../assets/Mutton Curry Cut1.jpg';
// import WildSalman from '../assets/Wild Caught Salmon.jpg';
// import Prawn from '../assets/Fresh Prawn.jpg';
// import FishCurryCut from '../assets/Fish Curry Cut1.jpg';
// import MuttonCurryCut from '../assets/Mutton Curry Cut1.jpg';

// // Fallback product data (used when Firebase fails or during loading)
// const fallbackProducts = [
//   {
//     id: '1',
//     name: 'Fresh Chicken Breast',
//     price: 299,
//     category: 'Chicken',
//     description: 'Farm fresh chicken breast, antibiotic-free',
//     fallbackImage: FreshChickenBreast,
//     imageFolderPath: 'products/chicken/1',
//     rating: 4.5,
//     ratingCount: 128,
//     discount: 10,
//     inStock: true,
//     weight: '500g',
//     features: ['Antibiotic-free', 'Farm-raised']
//   },
//   {
//     id: '2',
//     name: 'Premium Mutton',
//     price: 899,
//     category: 'Mutton',
//     description: 'Grass-fed premium mutton cuts',
//     fallbackImage: PrmiumMutton,
//     imageFolderPath: 'products/mutton/2',
//     rating: 4.3,
//     ratingCount: 89,
//     inStock: true,
//     weight: '1kg',
//     features: ['Grass-fed', 'Premium cuts']
//   },
//   {
//     id: '3',
//     name: 'Wild Caught Salmon',
//     price: 799,
//     category: 'Fish & Seafood',
//     description: 'Fresh Norwegian salmon fillet',
//     fallbackImage: WildSalman,
//     imageFolderPath: 'products/fishseafood/3',
//     rating: 4.7,
//     ratingCount: 156,
//     discount: 15,
//     inStock: true,
//     weight: '500g',
//     features: ['Wild-caught', 'Omega-3 rich']
//   },
//   {
//     id: '4',
//     name: 'Fresh Prawns',
//     price: 499,
//     category: 'Fish & Seafood',
//     description: 'Daily caught & cleaned prawns',
//     fallbackImage: Prawn,
//     imageFolderPath: 'products/fishseafood/4',
//     rating: 4.4,
//     ratingCount: 95,
//     inStock: true,
//     weight: '250g',
//     features: ['Cleaned', 'Deveined']
//   },
//   {
//     id: '7',
//     name: 'Boneless Chicken',
//     price: 379,
//     category: 'Chicken',
//     description: 'Clean boneless chicken chunks',
//     fallbackImage: BonelessCuts,
//     imageFolderPath: 'products/chicken/7',
//     rating: 4.8,
//     ratingCount: 203,
//     inStock: true,
//     weight: '500g',
//     features: ['Boneless', 'Premium quality']
//   },
//   {
//     id: '8',
//     name: 'Fish Curry Cut',
//     price: 299,
//     category: 'Fish & Seafood',
//     description: 'Perfect cuts for curry',
//     fallbackImage: FishCurryCut,
//     imageFolderPath: 'products/fishseafood/8',
//     rating: 4.3,
//     ratingCount: 167,
//     discount: 5,
//     inStock: true,
//     weight: '500g',
//     features: ['Fresh', 'Curry cut']
//   },
//   {
//     id: '9',
//     name: 'Chicken Drumsticks',
//     price: 329,
//     category: 'Chicken',
//     description: 'Juicy chicken drumsticks, perfect for grilling',
//     fallbackImage: ChickenDrumsticks,
//     imageFolderPath: 'products/chicken/9',
//     rating: 4.6,
//     ratingCount: 125,
//     inStock: true,
//     weight: '500g',
//     features: ['Fresh', 'Bone-in']
//   },
//   {
//     id: '10',
//     name: 'Mutton Curry Cut',
//     price: 799,
//     category: 'Mutton',
//     description: 'Perfect cut pieces for your traditional curry',
//     fallbackImage: MuttonCurryCut,
//     imageFolderPath: 'products/mutton/10',
//     rating: 4.5,
//     ratingCount: 92,
//     discount: 8,
//     inStock: true,
//     weight: '500g',
//     features: ['Bone-in', 'Fresh cut']
//   }
// ];

// // Map of product id to fallback image (for reference when loading from Firebase)
// const fallbackImageMap = {
//   '1': FreshChickenBreast,
//   '2': PrmiumMutton,
//   '3': WildSalman,
//   '4': Prawn,
//   '7': BonelessCuts,
//   '8': FishCurryCut,
//   '9': ChickenDrumsticks,
//   '10': MuttonCurryCut,
// };

// // For backward compatibility - create static products with the same structure as before
// // This ensures existing code that imports products directly continues to work until Firebase data loads
// const staticProducts = fallbackProducts.map(product => ({
//   id: product.id,
//   name: product.name,
//   price: product.price,
//   category: product.category,
//   description: product.description,
//   image: product.fallbackImage,
//   rating: product.rating,
//   ratingCount: product.ratingCount,
//   discount: product.discount,
//   inStock: product.inStock,
//   weight: product.weight,
//   features: product.features
// }));

// // Available categories
// export const categories = [
//   'Chicken',
//   'Mutton',
//   'Fish & Seafood'
// ];

// // Function to get the most recent image from a folder
// const getMostRecentImage = async (folderPath, fallbackImage) => {
//   try {
//     const folderRef = storageRef(storage, folderPath);
//     const fileList = await listAll(folderRef);
    
//     if (fileList.items.length === 0) {
//       console.warn(`No images found in ${folderPath}, using fallback`);
//       return fallbackImage;
//     }
    
//     // Sort files by timestamp in filename (newest first)
//     const sortedItems = [...fileList.items].sort((a, b) => {
//       // Extract timestamps from filename
//       const getTimestamp = (name) => {
//         const match = name.match(/image_(\d+)/);
//         return match ? parseInt(match[1]) : 0;
//       };
      
//       const timestampA = getTimestamp(a.name);
//       const timestampB = getTimestamp(b.name);
      
//       return timestampB - timestampA;
//     });
    
//     // Get URL of the most recent image
//     const imageURL = await getDownloadURL(sortedItems[0]);
//     return imageURL;
//   } catch (error) {
//     console.error(`Error fetching images from ${folderPath}:`, error);
//     return fallbackImage;
//   }
// };

// // Export the static products array as both named export and default export
// // This maintains compatibility with any import style that was used before
// export const products = staticProducts;
// export default staticProducts;

// // Create a context to provide dynamic products data
// const ProductsContext = createContext({
//   products: staticProducts,
//   isLoading: true,
//   error: null
// });

// // Hook to use products data in components
// export const useProductsData = () => useContext(ProductsContext);

// // Hook to get dynamically updated products from Firebase
// export const useProducts = () => {
//   const [dynamicProducts, setDynamicProducts] = useState(staticProducts);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         // Step 1: Fetch product data from Firebase Realtime Database
//         const productsRef = dbRef(database, 'products');
//         const snapshot = await get(productsRef);
        
//         let productsData;
        
//         if (snapshot.exists()) {
//           // Convert from object to array with IDs
//           const rawData = snapshot.val();
//           productsData = Object.entries(rawData).map(([id, data]) => ({
//             id,
//             ...data,
//             // Use fallback image if available, otherwise use placeholder
//             fallbackImage: fallbackImageMap[id] || `https://via.placeholder.com/400x300?text=Product+${id}`
//           }));
//         } else {
//           console.log("No products found in database, using fallback data");
//           productsData = fallbackProducts;
//         }
        
//         // Step 2: Fetch images for each product
//         const productsWithImages = await Promise.all(
//           productsData.map(async (product) => {
//             try {
//               // If product has a defined imageFolderPath, use it
//               const imagePath = product.imageFolderPath || `products/${product.category?.toLowerCase() || 'other'}/${product.id}`;
              
//               // Get dynamic image or use fallback
//               const imageURL = await getMostRecentImage(
//                 imagePath, 
//                 product.fallbackImage
//               );
              
//               return {
//                 ...product,
//                 image: imageURL,
//               };
//             } catch (error) {
//               console.error(`Error fetching image for product ${product.id}:`, error);
              
//               // Return with fallback image
//               return {
//                 ...product,
//                 image: product.fallbackImage,
//               };
//             }
//           })
//         );
        
//         setDynamicProducts(productsWithImages);
        
//         // For backward compatibility - update the static products export as well
//         // This isn't ideal (mutating exports), but it ensures any direct imports will eventually get updated data
//         productsWithImages.forEach((product, index) => {
//           if (index < staticProducts.length) {
//             Object.assign(staticProducts[index], product);
//           }
//         });
        
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setError(error.message || 'Failed to load products');
        
//         // Use fallback products if error occurs
//         setDynamicProducts(staticProducts);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchProducts();
    
//     // Set up refresh interval (every 5 minutes)
//     const refreshInterval = setInterval(fetchProducts, 5 * 60 * 1000);
    
//     return () => clearInterval(refreshInterval);
//   }, []);

//   return { products: dynamicProducts, isLoading, error };
// };

// // ProductsProvider component for wrapping your app
// export const ProductsProvider = ({ children }) => {
//   const { products, isLoading, error } = useProducts();
  
//   // Make products available via context
//   return (
//     <ProductsContext.Provider value={{ products, isLoading, error }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };