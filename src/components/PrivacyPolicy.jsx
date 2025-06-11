

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/privacy-policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <Header />

      <div className="main-content">
        <div className="policy-container">
          <div className="policy-header">
            <div className="logo-icon"></div>
            <h1>Privacy Policy</h1>
          </div>

          <div className="policy-section">
            <p>At ZappCart, we are committed to protecting the privacy and personal information of our customers, vendors,
              and delivery partners. This Privacy Policy explains how we collect, use, store, and safeguard your data when
              you interact with our platform, including the ZappCart mobile app, website, and related services. By using our
              platform, you consent to the terms outlined in this Privacy Policy.</p>
          </div>

          <div className="policy-section">
            <h2>Information We Collect</h2>
            <p>ZappCart collects different types of information to enhance user experience and ensure smooth operations.
              For customers, we collect personal details such as name, phone number, email address, and delivery location
              when an order is placed. Additionally, we store payment information such as UPI IDs, debit/credit card details,
              and other digital payment methods through secure third-party gateways. To improve our services, we also
              track order history, customer preferences, and feedback.
              For vendors, we collect business-related information, including shope name, FSSAI license and banking
              details for payouts. Vendors performance is also monitored based on order fulfillment, product quality, and
              customer ratings.
              For delivery partners, we collect personal identification details such as name, phone number, email, and valid
              government-issued ID proofs (Aadhaar, Driving License). Additionally, we require real-time GPS tracking
              data to ensure timely order deliveries.
              Our platform may also collect automated data, such as device information, IP addresses, browser details, and
              interactions with customer support, using cookies and analytics tools.</p>
          </div>

          <div className="policy-section">
            <h2>How We Use Your Information</h2>
            <p>ZappCart primarily collects information to process orders, facilitate deliveries, and enhances user experience.
              Customer data is used to confirm orders, provide real-time tracking, and ensure smooth transactions. Contact
              information is utilized for customer support, order notifications, and personal recommendations.
              Vendor data is used for account verification, inventory management, and timely payouts, while delivery
              partner details enable efficient routing, payment processing, and fraud prevention. Additionally, data analytics
              helps us improve product offerings, streamline logistics, and detect security risks.
              Marketing and promotional activities, such as discounts, special offers, and referral programs, also rely on
              collected data. Customers can opt out promotional communications through account settings at any time. </p>
          </div>

          <div className="policy-section">
            <h2>How We Share Your Information </h2>
            <p>ZappCart does not sell or rent personal data to third parties. However, to ensure efficient service, we may
              share limited customer and vendor information with trusted partners. Delivery personnel receive order
              details, including address and contact number, to facilitate order fulfillment. Vendors receive customer order
              details but do not have direct access to personal data unless required for delivery coordination.
              Payment-related information is processed through secure third-party payment gateways, ensuring financial
              transactions remain encrypted and protected. We may also share data with government authorities if required
              for legal investigations or compliance with taxation laws.</p>
            <p>We do not sell or rent your personal information to third parties for marketing purposes.</p>
          </div>

          <div className="policy-section">
            <h2>Data Security and Storage </h2>
            <p>We take strong security measures to protect your data from unauthorized access, breaches, or misuse. ZappCart
              implements encryption protocols for payment processing, ensuring sensitive financial details remain
              protected. User data is stored in secure cloud servers with restricted access, and only authorized personnel can
              handle sensitive information.
              Regular security audits and software updates are conducted to detect and prevent data vulnerabilities. If a
              customer or vendor wishes to delete their account or request data removal, they can submit a request via email
              at support@zappcart.com, and our team will process the request within a defined timeframe.</p>
          </div>

          <div className="policy-section">
            <h2>Customer Rights and Data Control </h2>
            <p>Customers and vendors have complete control over their personal data. Users can access, update, or modify
              their account information through the ZappCart app or website. If customers want to opt out of data collection
              for marketing purposes, they can do so via the privacy settings in their account.
              Additionally, customers have the right to request information regarding the data stored about them. They can
              also delete their account permanently, which will erase their personal details from our database, except for any
              legally required to be stored for compliance purposes.</p>
          </div>

          <div className="policy-section">
            <h2>Cookies and Tracking Technologies</h2>
            <p>To improve user experience, ZappCart uses cookies and tracking technologies. These help us understand
              browsing behavior, personalize content, and enhance website performance. Cookies are small text files
              stored on a user’s device to remember preferences, track interactions, and enable seamless login experiences.
              Users can disable cookies through their browser settings, but doing so may limit the functionality of the
              ZappCart platform, affecting personalized recommendations and order tracking features.</p>
          </div>

          <div className="policy-section">
            <h2>Third-Party Services and External Links</h2>
            <p>ZappCart may contain links to third-party services, such as payment processors, social media platforms, and
              logistics providers. While we ensure that our partners follow strict security measures, ZappCart is not
              responsible for the privacy policies of external services. Customers are advised to review the privacy terms of
              these third-party platforms before sharing personal data with them. </p>
          </div>

          <div className="policy-section">
            <h2>Policy Updates and Changes</h2>
            <p>ZappCart reserves the right to update or modify this Privacy Policy at any time. Any changes will be
              communicated through the website, mobile app, or email notifications. Users are encouraged to review this
              policy periodically to stay informed about how their data is managed. Continued use of ZappCart services
              after any modifications to the Privacy Policy will indicate acceptance of the revised terms.</p>
          </div>

          <div className="policy-section">
            <h2>Contact Us</h2>
            <p>For any privacy-related concerns, data access requests, or account deletion inquiries, customers and vendors
              can contact ZappCart through the following channels:</p>
            <ul>
              <li>Email: <a href="mailto:official.tazatabutchers@gmail.com">official.tazatabutchers@gmail.com</a></li>
              <li>Phone: <a href="tel:+918722237574">+91 8722237574</a></li>
              <li>Address: <a href="https://maps.google.com/?q=123+Tech+Park,+Silicon+Valley,+Bangalore,+560001" target="_blank" rel="noopener noreferrer">Sri kalabhairaveshwara chicken center, Rajeev Gandhi circle,
              kebbehala sunkadakatte Bangalore -560091</a></li>
            </ul>
          </div>

          <div className="policy-date">
            <p>Last updated: April 30, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;