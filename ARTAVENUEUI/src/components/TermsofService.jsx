import React from 'react';
import Footer from './Footer';

import "./Home.css";


const TermsOfService = () => {
  return (
    <>
    <div className="terms-container">
      <h1 className="terms-header">Terms of Service</h1>

      <p className="terms-text">
        Welcome to our Art Auction platform. These Terms of Service ("Terms") govern your use of our website and
        services. By using our platform, you agree to comply with these Terms. Please read them carefully.
      </p>

      <h2 className="terms-subheader">1. Acceptance of Terms</h2>
      <p className="terms-text">
        By accessing or using our platform, you agree to be bound by these Terms and all applicable laws and regulations.
        If you do not agree to these Terms, you must not use our services.
      </p>

      <h2 className="terms-subheader">2. Account Registration</h2>
      <p className="terms-text">
        To participate in auctions or use certain features, you must register for an account. You agree to provide
        accurate, complete, and up-to-date information during the registration process. You are responsible for
        maintaining the confidentiality of your account credentials and for all activities that occur under your account.
      </p>

      <h2 className="terms-subheader">3. User Conduct</h2>
      <p className="terms-text">
        You agree to use the platform only for lawful purposes and in compliance with all applicable laws. You must not:
      </p>
      <ul className="terms-list">
        <li>Engage in fraudulent activities or impersonate any person or entity.</li>
        <li>Post or transmit content that is unlawful, harmful, or offensive.</li>
        <li>Attempt to interfere with the proper functioning of our platform.</li>
        <li>Use the platform for unauthorized advertising or promotional material (spam).</li>
      </ul>

      <h2 className="terms-subheader">4. Bidding and Purchasing</h2>
      <p className="terms-text">
        All bids placed on auction items are binding, and you are responsible for fulfilling any winning bids. Once you
        place a bid, you cannot withdraw it unless the auction is canceled or the terms of the auction specify otherwise.
        The highest bidder at the end of an auction is required to purchase the item at the winning price, subject to
        the seller’s approval.
      </p>

      <h2 className="terms-subheader">5. Payment and Fees</h2>
      <p className="terms-text">
        By purchasing an item through our platform, you agree to provide valid payment information. Payment is due
        immediately upon completion of the auction, and you are responsible for paying any applicable taxes, shipping,
        and handling fees. Failure to complete a purchase may result in the suspension or termination of your account.
      </p>

      <h2 className="terms-subheader">6. Intellectual Property</h2>
      <p className="terms-text">
        All content on the platform, including text, images, graphics, and logos, is the property of the platform or its
        content creators and is protected by copyright and other intellectual property laws. You may not reproduce,
        distribute, or otherwise use any content without prior written permission.
      </p>

      <h2 className="terms-subheader">7. Termination</h2>
      <p className="terms-text">
        We reserve the right to suspend or terminate your access to the platform at our sole discretion if we believe
        you have violated these Terms or engaged in illegal or harmful activities. In such cases, we may delete your
        account and all associated data without prior notice.
      </p>

      <h2 className="terms-subheader">8. Disclaimers and Limitation of Liability</h2>
      <p className="terms-text">
        Our platform is provided "as is" without any warranties of any kind. We do not guarantee the accuracy, reliability,
        or availability of the platform or the content. You use the platform at your own risk. To the maximum extent
        permitted by law, we are not liable for any direct, indirect, incidental, or consequential damages arising from
        your use of the platform.
      </p>

      <h2 className="terms-subheader">9. Governing Law and Dispute Resolution</h2>
      <p className="terms-text">
        These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes
        arising from or relating to these Terms shall be resolved through binding arbitration in [Insert Location],
        except where prohibited by law.
      </p>

      <h2 className="terms-subheader">10. Changes to the Terms</h2>
      <p className="terms-text">
        We reserve the right to modify these Terms at any time. If we make changes, we will notify you by updating the
        Terms on this page and revising the "Last Updated" date. Your continued use of the platform following any changes
        constitutes acceptance of the new Terms.
      </p>

      <p className="terms-text">Last updated: [Insert Date]</p>
    </div>
    <Footer/>
    </>
  );
};

export default TermsOfService;
