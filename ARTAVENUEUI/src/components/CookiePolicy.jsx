import React from 'react';
import "./Home.css";
import Footer from './Footer';


const CookiePolicy = () => {
  return (
    <>
    <div className="cookie-policy-container">
      <h1 className="cookie-header">Cookie Policy</h1>

      <p className="cookie-text">
        This Cookie Policy explains how our Art Auction platform uses cookies and similar technologies to improve your
        experience on our site. By continuing to use our platform, you consent to the use of cookies in accordance with this
        policy. Please read this policy carefully to understand how we use cookies and how you can control them.
      </p>

      <h2 className="cookie-subheader">1. What Are Cookies?</h2>
      <p className="cookie-text">
        Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a
        website. They allow the website to recognize your device and remember your preferences or actions over time.
        Cookies help improve your browsing experience by providing relevant features and functionality.
      </p>

      <h2 className="cookie-subheader">2. Types of Cookies We Use</h2>
      <p className="cookie-text">
        Our platform uses different types of cookies for various purposes:
      </p>
      <ul className="cookie-list">
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the basic functionality of our platform.
        They enable you to navigate the site and use its features, such as accessing secure areas.</li>
        <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use our platform,
        such as which pages are most popular or if users encounter any errors. The data is aggregated and anonymous.</li>
        <li><strong>Functional Cookies:</strong> These cookies allow our platform to remember your preferences and
        choices, such as language settings or login details, to provide a more personalized experience.</li>
        <li><strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver personalized ads relevant to
        you and your interests. They may also limit the number of times you see an advertisement and help measure the
        effectiveness of ad campaigns.</li>
      </ul>

      <h2 className="cookie-subheader">3. How We Use Cookies</h2>
      <p className="cookie-text">
        We use cookies to:
      </p>
      <ul className="cookie-list">
        <li>Ensure the smooth functioning of the platform.</li>
        <li>Remember your preferences and settings.</li>
        <li>Collect analytical data to improve the performance and usability of the platform.</li>
        <li>Personalize your experience by showing relevant content and advertisements.</li>
      </ul>

      <h2 className="cookie-subheader">4. Third-Party Cookies</h2>
      <p className="cookie-text">
        In addition to the cookies we set, some third parties may place cookies on your device when you use our platform.
        These cookies may be used to analyze how you use the platform, deliver personalized content, or provide
        advertisements that are relevant to you. We do not control third-party cookies, so we recommend reviewing the
        privacy and cookie policies of these third parties for more information.
      </p>

      <h2 className="cookie-subheader">5. Managing Cookies</h2>
      <p className="cookie-text">
        You have the right to decide whether to accept or reject cookies. Most browsers allow you to control cookies
        through their settings. You can choose to block or delete cookies, but please note that doing so may affect the
        functionality of the platform, and some features may become unavailable.
      </p>
      <p className="cookie-text">
        To manage your cookie settings, please refer to the instructions provided by your browser:
      </p>
      <ul className="cookie-list">
        <li><strong>Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647">Google Chrome Help</a></li>
        <li><strong>Firefox:</strong> <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">Mozilla Firefox Help</a></li>
        <li><strong>Safari:</strong> <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac">Apple Safari Help</a></li>
        <li><strong>Edge:</strong> <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">Microsoft Edge Help</a></li>
      </ul>

      <h2 className="cookie-subheader">6. Changes to This Cookie Policy</h2>
      <p className="cookie-text">
        We may update this Cookie Policy from time to time to reflect changes in how we use cookies or for other operational,
        legal, or regulatory reasons. Please review this page periodically to stay informed about our use of cookies.
      </p>

      <p className="cookie-text">Last updated: [Insert Date]</p>
    </div>
    <Footer/>
    </>
  );
};

export default CookiePolicy;
