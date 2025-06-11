import React, { useEffect } from 'react';
import '../styles/products.css';
import { showToast } from '../utils/toastUtils';
import chicken from '../assets/images/chicken.jpg';
import mutton from '../assets/images/mutton.jpg';
import seafood from '../assets/images/seafood.jpg';
import prones from '../assets/images/prones.jpg';

const ProductsSection = () => {
  const productCategories = [
    {
      name: "Chicken",
      description: "Farm-raised, antibiotic-free chicken cuts",
      image: chicken
    },
    {
      name: "Mutton",
      description: "Premium quality goat meat cuts",
      image: mutton
    },
    {
      name: "Fish & Seafood",
      description: "Fresh-caught fish and seafood varieties",
      image: seafood
    },
    {
      name: "Prawns",
      description: "Ready-to-cook prawns products",
      image: prones
    }
  ];

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
          const children = entry.target.querySelectorAll('.product-card');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('fade-in');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const productGrid = document.querySelector('.products-grid');
    if (productGrid) {
      observer.observe(productGrid);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleExploreProduct = (category) => {
    showToast(`${category} products coming soon!`);
  };

  return (
    <section id="products">
      <div className="container">
        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-description">
            Discover our wide range of fresh, high-quality meat products to satisfy your culinary needs.
          </p>
        </div>

        <div className="products-grid">
          {productCategories.map((category, index) => (
            <div key={index} className="product-card">
              <img src={category.image} alt={category.name} className="product-image" />
              <div className="product-content">
                <h3 className="product-name">{category.name}</h3>
                <p className="product-description">{category.description}</p>
                {/* <button 
                  className="explore-button"
                  onClick={() => handleExploreProduct(category.name)}
                  aria-label={`Explore ${category.name} products`}
                >
                  Explore
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="browse-all-container">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              showToast('Browse all products coming soon!');
            }}
          >
            Browse All Products
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ProductsSection;