import React, { useState, useEffect } from "react";
import Footer from './Footer';

import "./Home.css";



const PrivacyPolicy = () => {

    return (
        <>
        <div className="privacy-policy-container">
          <h1 className="privacy-header">Privacy Policy</h1>
    
          <p className="privacy-text">
            Welcome to our Art Auction platform. We value your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and share your information when you use our services, and your
            rights regarding that information. By using our platform, you consent to the data practices described in this policy.
          </p>
    
          <h2 className="privacy-subheader">1. Information We Collect</h2>
          <p className="privacy-text">
            We collect various types of information to provide and improve our services:
          </p>
          <ul className="privacy-list">
            <li><strong>Personal Information:</strong> Your name, email address, phone number, and billing address when you register or place bids.</li>
            <li><strong>Payment Information:</strong> Payment card details or other payment methods to process transactions for purchased art items.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and usage data such as pages visited, time spent on our platform, and user preferences.</li>
            <li><strong>Communication Data:</strong> Messages, feedback, or emails you send to us.</li>
          </ul>
    
          <h2 className="privacy-subheader">2. How We Use Your Information</h2>
          <p className="privacy-text">
            We use your information for the following purposes:
          </p>
          <ul className="privacy-list">
            <li>To provide and maintain the services, including enabling your participation in auctions.</li>
            <li>To process and confirm transactions for the sale and purchase of art items.</li>
            <li>To send you auction updates, personalized notifications, or promotional content related to our services.</li>
            <li>To improve the user experience by analyzing trends and user interactions on our platform.</li>
            <li>To respond to your queries, requests, or complaints.</li>
          </ul>
    
          <h2 className="privacy-subheader">3. Cookies and Tracking Technologies</h2>
          <p className="privacy-text">
            We use cookies and similar technologies to enhance your experience, including:
          </p>
          <ul className="privacy-list">
            <li>Remembering your login information for future visits.</li>
            <li>Tracking user interactions to improve our platform's functionality and performance.</li>
            <li>Providing personalized content and advertisements based on your browsing behavior.</li>
          </ul>
          <p className="privacy-text">
            You can modify your browser settings to reject cookies, but this may affect your ability to use some features of our platform.
          </p>
    
          <h2 className="privacy-subheader">4. Data Retention</h2>
          <p className="privacy-text">
            We retain your personal information only for as long as is necessary to fulfill the purposes outlined in this policy, or as required by law. After this period, your data will either be securely deleted or anonymized so that it cannot be associated with you.
          </p>
    
          <h2 className="privacy-subheader">5. Sharing Your Information</h2>
          <p className="privacy-text">
            We do not sell or rent your personal information to third parties. However, we may share your data with the following parties:
          </p>
          <ul className="privacy-list">
            <li><strong>Service Providers:</strong> Third-party companies we use to assist in processing payments, providing hosting services, or analyzing data.</li>
            <li><strong>Legal Authorities:</strong> We may disclose your information if required by law or to protect our rights and interests, or those of other users.</li>
            <li><strong>Business Transfers:</strong> If our company merges or is acquired, your personal information may be transferred as part of the transaction.</li>
          </ul>
    
          <h2 className="privacy-subheader">6. Third-Party Services</h2>
          <p className="privacy-text">
            Our platform may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party services you use.
          </p>
    
          <h2 className="privacy-subheader">7. Security of Your Data</h2>
          <p className="privacy-text">
            We take the security of your data seriously and implement a variety of security measures to ensure your information is protected. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
    
          <h2 className="privacy-subheader">8. Your Rights and Choices</h2>
          <p className="privacy-text">
            You have certain rights regarding your personal information, including:
          </p>
          <ul className="privacy-list">
            <li><strong>Access:</strong> The right to request access to the personal data we hold about you.</li>
            <li><strong>Correction:</strong> The right to request corrections to inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> The right to request the deletion of your data, subject to certain legal requirements.</li>
            <li><strong>Data Portability:</strong> The right to receive a copy of your data in a commonly used format.</li>
          </ul>
          <p className="privacy-text">
            To exercise any of these rights, please contact us at privacy@artauction.com. We will respond to your request in accordance with applicable data protection laws.
          </p>
    
          <h2 className="privacy-subheader">9. Changes to This Privacy Policy</h2>
          <p className="privacy-text">
            We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last Updated" date below.
          </p>
    
          <p className="privacy-text">Last updated: [Insert Date]</p>
          
        </div>
        <Footer/>
        </>
      );
};

export default PrivacyPolicy;
