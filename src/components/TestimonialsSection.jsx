import React, { useEffect } from 'react';
import '../styles/testimonials.css';
import { showToast } from '../utils/toastUtils';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      author: "James Davis",
      location: "Seattle, WA",
      text: "ZappCart has completely changed how I shop. Their same-day delivery is incredible - I ordered groceries at noon and had them by 3 PM! The app is intuitive and their customer service team resolved my one issue immediately.",
      rating: 5,
      date: "March 15, 2025"
    },
    {
      id: 2,
      author: "Sarah Lin",
      location: "Chicago, IL",
      text: "As a busy mom of three, ZappCart has been a lifesaver. The subscription service ensures we never run out of essentials, and the quality of fresh produce is consistently excellent. Worth every penny!",
      rating: 5,
      date: "April 2, 2025"
    },
    {
      id: 3,
      author: "Robert Martinez",
      location: "Austin, TX",
      text: "I've tried several meat delivery services, and ZappCart stands out for their wide selection and competitive prices. Their mobile app makes reordering previous purchases super easy. Only wish they had more organic options.",
      rating: 4,
      date: "March 27, 2025"
    }
  ];

  // Animation for testimonial cards
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger the animations for each testimonial
          const testimonialCards = entry.target.querySelectorAll('.testimonial-card');
          testimonialCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe testimonials grid
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
      observer.observe(testimonialsGrid);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        fill={i < rating ? "currentColor" : "none"} 
        stroke={i < rating ? "none" : "currentColor"}
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Customers Say</h2>
          <p className="testimonials-description">Don't just take our word for it. Here's what our happy customers have to say about ZappCart.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <div>{getInitials(testimonial.author)}</div>
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
              <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-date">{testimonial.date}</p>
            </div>
          ))}
        </div>

        <div className="testimonial-more">
          <a
            href="#"
            className="btn-more"
            onClick={(e) => {
              e.preventDefault();
              showToast('More testimonials coming soon!');
            }}
          >
            <span>Read more testimonials</span>
            <span className="arrow-icon">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;