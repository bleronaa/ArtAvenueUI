import React from 'react';
import { useLocation } from 'react-router-dom';
import './Order.css';

const Order = () => {
  const location = useLocation();
  const { image } = location.state;

  return (
    <div className="order-container">
      <div className="order-image">
        <img src={image.url} alt={image.name} />
        <div className="order-details">
          <p>{image.details}</p>
        </div>
      </div>
      <div className="order-info">
        <h2>{image.name}</h2>
        <p>{image.text}</p>
        <p><strong>Price:</strong> {image.price}</p>
        {/* <p>Complimentary shipping</p> */}
        <button className="add-to-bag-button">Add to Bag</button>
        <p>International shipping available</p>
        <p>Customs duties and taxes may apply. Learn more</p>
        <p>Ships from: {image.location}</p>
        <p>Taxes not included</p>
        <p>VAT and other taxes are not reflected in the listed pricing. Read more</p>
        <p>Authenticity guaranteed</p>
      </div>
    </div>
  );
};

export default Order;
