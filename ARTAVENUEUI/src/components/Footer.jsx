import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
  return (
    <footer>
      <div className="socials">
        <h2>Follow Us</h2>
        <div className="icons">
          <FaTwitter className="icon" />
          <FaFacebookSquare className="icon" />
          <FaSquareInstagram className="icon" />
          <FaLinkedin className="icon" />
        </div>
      </div>
      <div className="footer-container">
        <div className="additional-links">
          <div className="column">
            <div className="support">
              <h3>Support</h3>
              <Link to='/' className='header'>Home</Link>
              <Link to='/Buy' className='header'>Buy Now</Link>
              <Link to='/Auctions' className='header'>Auctions</Link>
              <Link to='/About' className='header'>About Us</Link>
              <Link to='/Sell' className='header'>Sell</Link>
            </div>
          </div>
          <div className="column">
            <div className="legal">
              <h3>Legal</h3>
              <a href="#" className='header'>Privacy Policy</a>
              <a href="#" className='header'>Terms of Service</a>
              <a href="#" className='header'>Cookie Policy</a>
              <a href="#" className='header'>Disclaimer</a>
            </div>
          </div>
          <div className="column">
            <div className="contact">
              <h3>Contact</h3>
              <a href="#" className='contactlink'>info@artsb.com</a>
              <a href="#" className='contactlink'>+38349111222</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
