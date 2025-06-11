

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/refund-policy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-page">
      <Header />
      
      <div className="main-content">
        <div className="refund-container">
          <div className="refund-header">
            <div className="logo-icon"></div>
            <h1>Return and Refund Policy</h1>
          </div>
          
          <div className="refund-section">
            <p>ZappCart allows returns or refunds only for damaged, incorrect, or quality-compromised products. Customers 
            must report issues within 1 hour of delivery along with clear photos/videos for verification.</p>
          </div>
          
          <div className="refund-section">
            <h2>1. Eligibility for Returns</h2>
            <ul>
              <li><strong>Damaged Products:</strong> If the product is damaged during delivery or the wrong product is delivered, please 
              contact us immediately with supporting evidence (photos, order details).</li>
              <li><strong>Quality Issues:</strong>  If the product is not fresh or not up to standard, we will provide a replacement or refund 
              based on verification.</li>
            </ul>
          </div>
          
          <div className="refund-section">
            <h2>2. Refund Process</h2>
            <ul>
              <li><strong>Refund Method:</strong> Refunds will be issued to the original payment method used for the order.</li>
              <li><strong>Refund Timeframe:</strong> Please allow up to 5-7 business days for the refund to be processed and reflected in 
              your account.</li>
            </ul>
          </div>
          
          <div className="refund-section">
            <h2>3. When Returns or Refunds Are NOT Allowed</h2>
            <ul>
              <li><strong>Change of Mind:</strong> We do not accept returns if the customer simply changes their mind after the order is 
              delivered.</li>
              <li><strong>Opened or Partially Consumed Products:</strong>  If the product has been opened, cooked, or consumed partially, 
              it is not eligible for a return.</li>
              <li><strong>Incorrect Storage by Customer:</strong> If the product has been stored improperly (e.g., left at room temperature 
                for too long), we cannot offer a refund. </li>
            </ul>
          </div>
          
          <div className="refund-section">
            <h2>4. Replacement Policy</h2>
            <ul>
            <li> If you opt for a replacement instead of a refund, we will arrange for a new delivery of the same product.</li>
            <li>Customers opting for a replacement will receive a new delivery within 2-4 hours (for same-day deliveries) 
or in the next available slot. If the same product is unavailable, the customer may choose an alternate 
product or receive a refund.</li>
            </ul>
          </div>
          
          <div className="refund-section">
            <h2>5. Special Cases & Dispute Resolution </h2>
            
            <ul>
              <li>If a customer repeatedly requests refunds or misuses the return policy, we reserve the right to block their 
              account or reject future refund requests. </li>
              <li>If the customer is not satisfied with our resolution, they can contact customer support via mail/call for 
              further escalation.</li>
          
            </ul>
          </div>
          
          <div className="refund-section">
          <h2>6. Vendor Responsibilities for Returns & Refunds</h2>
          <p>As a ZappCart Vendor, you are expected to:</p>
            <ul>
              <li><strong>Maintain Freshness:</strong>  Ensure products are stored and packaged correctly before dispatch. </li>
              <li><strong>Accept Return Requests:</strong> If a valid customer complaint is received, vendors must cooperate in processing 
              refunds or replacements and respond to return requests within 1-2 hours.</li>
              <li><strong>Stock & Inventory Updates:</strong> Vendors should update stock availability in real-time to avoid wrong 
              deliveries.</li>
              <li><strong>Follow Hygiene Standards:</strong>Consistently provide high-quality, fresh products to avoid refund claims.</li>
              <li><strong> Penalty for Repeated Quality Issues: </strong> Vendors with frequent complaints about quality or wrong deliveries 
may face temporary suspension or removal from the platform.</li>

            </ul>
          </div>
          
          <div className="refund-section">
            <h2>7. Contact Information</h2>
            <p>For any refund or return-related inquiries, customers can reach out to ZappCart through multiple channels. 
They can contact our support team via email at support@zappcart.com or call us directly at +91
XXXXXXXXXX for immediate assistance. Additionally, customers are welcome to visit our office at 
(address) for further inquiries.</p>
            <ul>
            <li>Email: <a href="mailto:official.tazatabutchers@gmail.com">official.tazatabutchers@gmail.com</a></li>
              <li>Phone: <a href="tel:+918722237574">+91 8722237574</a></li>
              <li>Address: <a href="https://maps.google.com/?q=123+Tech+Park,+Silicon+Valley,+Bangalore,+560001" target="_blank" rel="noopener noreferrer">Sri kalabhairaveshwara chicken center, Rajeev Gandhi circle,
              kebbehala sunkadakatte Bangalore -560091</a></li>
            </ul>
          </div>
          <div className="refund-section">
            <h2>8. Modifications to policy</h2>
            <p>This return and refund policy applies exclusively to purchases made through the ZappCart app or website, 
ensuring that customers receive the best possible service when ordering fresh meat products. By using our 
platform, customers agree to abide by these terms and conditions. ZappCart also reserves the right to modify 
or update this policy at any time without prior notice to accommodate changes in business operations or legal 
requirements.</p>
          </div>
          
          <div className="refund-date">
            <p>Last updated: April 30, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;