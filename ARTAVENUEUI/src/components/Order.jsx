import React from 'react';
import { useLocation } from 'react-router-dom';
import { IoEarthOutline, IoCalculator } from "react-icons/io5";
import './Order.css';
import Footer from './Footer';

const Order = () => {
  const location = useLocation();
  const image = location.state?.image || {};

  return (
    <>
      <div className="order-container">
        <div className="order-image">
          <img src={image.url || ''} alt={image.name || ''} />
          <div className="order-details">
            <h1>Details</h1>
            <h2>Description</h2>
            <p>{image.description || ''}</p>
            <h2>Dimensions</h2>
            <p>Height: {image.height || ''}</p>
            <p>Width: {image.width || ''}</p>
            <h2>Country of Origin</h2>
            <p>{image.origin || ''}</p>
          </div>
        </div>
        <div className="order-info">
          <h1 className='image-name'>{image.text || ''}</h1>
          <hr className='hrline'/>
          <div className='price'>
            <p>Price:</p> {image.price || ''}
          </div>
          {image.text && ( // Check if image.text exists before rendering the button
            <button className="add-to-bag-button">Add to Bag</button>
          )}
          <div className='shipping'>
            <div className='info-logo'>
              <IoEarthOutline />
            </div>
            <div className='info-text'>
              <h4>International shipping available</h4>
              <h5>Customs duties and taxes may apply.</h5>
              <h5>Ships from: {image.location || ''}</h5>
            </div>
          </div>
          <div className='shipping'>
            <div className='info-logo'>
              <IoCalculator />
            </div>
            <div className='info-text'>
              <h4>Taxes not included</h4>
              <h5>VAT and other taxes are not reflected in the listed pricing.</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Order;
