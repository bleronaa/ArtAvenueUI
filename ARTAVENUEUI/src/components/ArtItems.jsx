import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { IoEarthOutline, IoCalculator } from "react-icons/io5";
import './ArtItems.css';
import data from './data.json';
import bg from '../images/Hybrid-Homepage-RW-Prog-large.jpg';
import Footer from './Footer';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import { BsEasel2 } from "react-icons/bs";
import { TbCurrencyDollar } from "react-icons/tb";
import { RiAuctionLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";


const ArtItems = () => {
//   const location = useLocation();
//   const image = location.state?.image || {};
const { homeData, imageCarousel, NewDiscoveries } = data;
const [selectedCategory, setSelectedCategory] = useState('All');
const navigate = useNavigate();

const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // const handleBuyButtonClick = (image) => {
  //   navigate('/order', { state: { image } });
  // };

  return (
    <>
      <h1 className='art-title'>Paintings listing</h1>
        <hr/>
      
        <div className="discoveries">
          {NewDiscoveries.map(image => (
            <div className="discoveries-item" key={image.id}>
              <img src={image.url} alt={image.name} />
              <h2>{image.text}</h2>
              {/* <p className="desc"> {image.description}</p> */}
            <div className='iconss'>
            <p className="text" ><IoIosPricetags className="price-icon"/> {image.estimate}</p>
              <p className="text"><IoLocationSharp  className="location-icon" /> {image.location}</p>
            </div>
            <button className="buy-button" onClick={() => handleBuyButtonClick(image)}>
                Details
              </button>
            </div>
          ))}
        </div>
        <hr className='hrLine'></hr> 
        <div className="BB">
          <div className="img">
            <img src={bg} width={500}/>
          </div>
          <div className="us">
            <h2>Find Art You Love</h2>
            <p>“At B&B, we make it our mission to help you discover and buy from the best emerging artists around the world. Whether you’re looking to discover a new artist, add a statement piece to your home, or commemorate an important life event, Saatchi Art is your portal to thousands of original works by today’s top artists.”</p>
          </div>
        </div>
  
    </>
  );
};

export default ArtItems;
