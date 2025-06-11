

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/terms-of-service.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-page">
      <Header />
      
      <div className="main-content">
        <div className="terms-container">
          <div className="terms-header">
            <div className="logo-icon"></div>
            <h1>Terms and Conditions for ZappCart</h1>
          </div>
          
          <div className="terms-section">
            <p>Welcome to ZappCart. These Terms and Conditions govern your use of the ZappCart website and mobile 
application (collectively referred to as “Platform”) for purchasing fresh meat products. By using our services, 
you agree to comply with and be bound by these Terms. 
If you are a Vendor, these terms also apply to your business relationship with ZappCart for listing and selling 
products through the platform. </p>
          </div>
          
          <div className="terms-section">
          <h2>1. Definitions</h2>
            <ul>
              <li><strong>Customer:</strong> Refers to individuals who use ZappCart to order fresh meat products through the Platform.</li>
              <li><strong>Vendor:</strong>  Refers to meat suppliers or vendors who partner with ZappCart to sell their products on the 
              platform.</li>
              <li><strong>Platform:</strong>Refers to the ZappCart mobile app, website. </li>
              <li><strong>Order:</strong> Refers to the process of where a customer purchases products from the Website Platform or 
              Application. </li>
              </ul>
          </div>
          
          <div className="terms-section">
            <h2>2. Service Description</h2>
            <p>By using our Website Platform or Application, Customers agree to:</p>
            <ul>
              <li><strong>Eligibility:</strong> You must be at least 18 years of age to use our Platform and place an order. </li>
              <li><strong>Account Information:</strong> Customers are responsible for maintaining the confidentiality of their account 
              information and for all activities under their account.</li>
              <li><strong>Product Availability:</strong>ZappCart strives to offer fresh products. However, product availability may vary, 
              and we cannot guarantee that all items will always be available.</li>
              <li><strong>Pricing:</strong> Prices displayed on the Platform are subject to change at any time. All prices include taxes unless 
              stated otherwise.</li>
              <li><strong>Order Cancellation:</strong> You may cancel your order within a reasonable time, provided the product has not 
              been dispatched. Once the order is dispatched, cancellation may not be possible.</li>
              <li><strong>Delivery Policy:</strong>Delivery times are approximate and subject to availability. ZappCart will deliver 
              products to the address provided at checkout.</li>
              <li><strong>Returns and Refunds:</strong> <li><strong>Returnable Items:</strong> Only incorrect items are eligible for return. Please refer to our Return and 
              Refund Policy for further details.</li>
              <li><strong>Non-Returnable Items:</strong> Due to hygiene and health reasons, opened or consumed products are not 
              returnable. </li>
              <li><strong>Refunds:</strong>Refunds will be processed by the original payment method and may take 5-7 business 
              days to reflect. </li></li>
              </ul>
          </div>
          
          <div className="terms-section">
            <h2>3. General Terms for Vendors</h2>
            <p>By partnering with ZappCart, Vendors agree to:</p>
            <ul>
              <li><strong>Eligibility:</strong>  Vendors must be legally authorized to sell fresh meat products and must comply with all 
              applicable food safety and health regulations.</li>
              <li><strong>Product Listings:</strong> Vendors are responsible for ensuring that all product information (descriptions, prices, 
                and images) is accurate and up to date.</li>
              <li><strong>Quality Control:</strong> Vendors must ensure that all products meet ZappCart quality standards and are delivered 
              in a timely manner. </li>
              <li><strong>Pricing and Commission:</strong>ZappCart may charge a commission on each sale. The agreed-upon 
              commission rate will be outlined in the Vendor Agreement.</li>
              <li><strong>Order Fulfillment:</strong> Vendors are responsible for fulfilling orders within the delivery time frame. Failure 
              to do so may result in penalties or removal from the platform. </li>
              <li><strong>Refunds and Returns:</strong>Vendors must comply with ZappCart Returns and Refund Policy for any issues 
              with product quality, incorrect orders, or damaged product. </li>
              <li><strong>Compliance:</strong>Vendors must comply with all laws regarding food safety, hygiene, and packaging, as well 
              as relevant e-commerce regulations.</li>
              </ul>
          </div>
          
          <div className="terms-section">
            <h2>4.Prohibited Activities</h2>
            <p>Both Customers and Vendors agree not to engage in the following activities: </p>
            <ul>
              <li>Using the Platform for any unlawful or fraudulent activity. </li>
              <li>Interfering with or disrupting the operation of the Platform or other users experience.</li>
              <li>Impersonating another person or entity.</li>
              <li>Uploading or transmitting any harmful or malicious content, including viruses, malware, or other types of 
              interference.</li>
              <li>Violating intellectual property rights (e.g., copying product images or descriptions without permission).</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h2>5. Limitation of Liability </h2>
            <p>ZappCart will not be liable for:</p>
            <ul>
              <li>Any indirect, incidental, or consequential damage resulting from the use of the Platform.</li>
              <li>The quality of products provided by the vendors. While we make every effort to ensure that all products 
are fresh and meet health standards, ZappCart is not responsible for any product defects, spoilage, or safety 
concerns beyond our control. </li>
              <li>Delays in delivery due to unforeseen circumstances, such as weather or traffic challenges. </li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h2>6. Indemnity</h2>
            <p>Customers and Vendors agree to indemnify and hold harmless ZappCart, its affiliates, employees, and partners 
against any claims, damages, losses, or expenses arising out of their use of the Platform or any violation of 
these Terms and Conditions. </p>
          </div>
          
          <div className="terms-section">
            <h2>7.  Privacy Policy </h2>
            <p>ZappCart is committed to protecting your privacy. Our Privacy Policy outlines how we collect, use, and protect 
            your personal information. By using the Platform, you agree to the terms of the Privacy Policy.</p>
          </div>
          
          <div className="terms-section">
            <h2>8. Modifications to Terms</h2>
            <p>ZappCart reserves the right to modify, update, or amend these Terms and Conditions at any time. All changes 
will be communicated through the Platform or via email. It is your responsibility to review these Terms 
periodically to stay informed of any changes.</p>
          </div>
          
          <div className="terms-section">
            <h2>9. Termination </h2>
            <p>ZappCart reserves the right to suspend or terminate any user’s account (whether Customer or Vendor) if they 
            violate these Terms and Conditions, or if ZappCart deems it necessary for business or legal reasons. </p>
          </div>
          
          <div className="terms-section">
            <h2>10. Governing Law</h2>
            <p>These Terms and Conditions shall be governed by the laws of India. Any disputes arising out of or in 
connection with these Terms shall be resolved under the exclusive jurisdiction of the courts in Bengaluru, 
Karnataka. </p>
          </div>
          <div className="terms-section">
            <h2>14. Contact Information</h2>
            <p>If you have any questions about these Terms and Conditions, you can reach us at;</p>
            <ul>
            <li>Email: <a href="mailto:official.tazatabutchers@gmail.com">official.tazatabutchers@gmail.com</a></li>
              <li>Phone: <a href="tel:+918722237574">+91 8722237574</a></li>
              <li>Address: <a href="https://maps.google.com/?q=123+Tech+Park,+Silicon+Valley,+Bangalore,+560001" target="_blank" rel="noopener noreferrer">Sri kalabhairaveshwara chicken center, Rajeev Gandhi circle,
              kebbehala sunkadakatte Bangalore -560091</a></li>
            </ul>
          </div>
          
          <div className="terms-date">
            <p>Last updated: April 30, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;