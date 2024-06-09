import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import data from './data.json';
import bg from '../images/Hybrid-Homepage-RW-Prog-large.jpg';
import Footer from './Footer';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

const Home = () => {
  const { homeData, imageCarousel, NewDiscoveries } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleBidButtonClick = () => {
    window.location.href = '/Login';
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredImages = selectedCategory === 'All' 
    ? imageCarousel 
    : imageCarousel.filter(image => image.category === selectedCategory);

  return (
    <>
      <Carousel 
        showThumbs={false}
        autoPlay={false}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={true}>
        {homeData.map((carousel) => (
          <div key={carousel.id}>
            <img
              src={carousel.url}
              alt={carousel.name}
              className='slider-image'
            />
            <div className='content flex'>
              <p className='h2text'>{carousel.text}</p>
            </div>
            <div className="carousel-text-box">
              <h2>"Discover extraordinary art at our auctions. Bid, win, and bring home timeless treasures that inspire and enrich your life."</h2>
            </div>
          </div>
        ))}
      </Carousel>
      
      <div className='container'>
       
        <div className="category">
          <h2>Shop by Category</h2>
          <button className='categoryButton' onClick={() => handleCategoryClick('Painting')}>Painting</button>
          <button className='categoryButton' onClick={() => handleCategoryClick('Fine Art Prints')}>Fine Art Prints</button>
          <button className='categoryButton' onClick={() => handleCategoryClick('Sculpture')}>Sculpture</button>
          
        </div>
        <hr className='hrLine'></hr>

        <h2 className='title'>Suggested for you</h2>
        <hr/>
        <div className="image-container">
          {filteredImages.map(image => (
            <div className="image-item" key={image.id}>
              <img src={image.url} alt={image.name} />
              <h2>{image.text}</h2>
              <p className="text" ><IoIosPricetags className="price-icon"/> {image.price}</p>
              <p className="text"><IoLocationSharp  className="location-icon" /> {image.location}</p>
              <button className='bid-button' onClick={handleBidButtonClick}>{image.button}</button>
            </div>
          ))}
        </div>
        <hr className='hrLine'></hr>
        <h2 className='title'>New Arrivals</h2>
        <div className="discoveries">
          {NewDiscoveries.map(image => (
            <div className="discoveries-item" key={image.id}>
              <img src={image.url} alt={image.name} />
              <h2>{image.text}</h2>
            <p className="text" ><IoIosPricetags className="price-icon"/> {image.price}</p>
              <p className="text"><IoLocationSharp  className="location-icon" /> {image.location}</p>
              <button className='bid-button'>{image.button}</button>
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
      </div>
      <Footer/>
    </>
  );
};

export default Home;
