import React, {useState}from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import data  from './data.json';
import bg from '../images/Hybrid-Homepage-RW-Prog-large.jpg'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6";

const Home = () => {
  const { homeData,imageCarousel,NewDiscoveries } = data;





  const imageCarouselSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
  };

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
      <h2 className='title'>Suggested for you</h2>
      <hr/>

      <div className="image-container">
        {imageCarousel.map(image => (
          <div className="image-item" key={image.id}>
            <img src={image.url} alt={image.name} />
            <p>{image.text}</p>
            <p className='text'>Estimate: {image.estimate}</p>
            <button className='bid-button'>{image.button}</button>
          </div>
        ))}
        
      </div>
           <hr className='hrLine'></hr>
           <div className="category">
            <h2>Shop by Category</h2>
            <button className='categoryButton'>Painting</button>
            <button className='categoryButton'>Fine Art Prints</button>
            <button className='categoryButton'>Sculpture</button>

           </div>
           <hr className='hrLine'></hr>
           <h2 className='title'>New Discoveries</h2>


           <div className="discoveries">
            {NewDiscoveries.map(image => (
          <div className="discoveries-item" key={image.id}>
            <img src={image.url} alt={image.name} />
            <p>{image.text}</p>
            <p className='text'>Estimate: {image.estimate}</p>
            <button className='bid-discoveries-button'>{image.button}</button>
          </div>
        ))}
           </div>
           <hr className='hrLine'></hr> 
           <div className="BB">
            <div className="img">
                <img src={bg} width={650}/>
            </div>

           <div className="us">
            <h2>Find Art You Love</h2>
            <p>“At B&B , we make it our mission to help you discover and buy from the best emerging artists around the world.Whether you’re looking to discover a new artist, add a statement piece to your home, or commemorate an important life event, Saatchi Art is your portal to thousands of original works by today’s top artists.”</p>
           </div>
           </div>
        </div>
        <footer>
  <div className="footer">
    {/* "Follow Us" section */}
    <div className="socials">
      <h2>Follow Us</h2>
      <div className="icons">
        <FaTwitter />
        <FaFacebookSquare />
        <FaSquareInstagram />
        <FaLinkedin />
      </div>
    </div>
    
    {/* Additional links section */}
    <div className="additional-links">
      <div className="support">
        <h3 className='header'>Support</h3>
        <a href="#">Help Center</a>
        <a href="#">Locations</a>
        <a href="#">Download the App</a>
      </div>
      <div className="support">
        <h3 className='header'>Corporate</h3>
        <a href="#">Press</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Corporate Governance</a>
        <a href="#">Careers</a>
      </div>
      <div className="support">
        <h3 className='header'>More</h3>
        <a href="#">Security</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Conditions of Business</a>
        <a href="#">Modern Slavery Statement </a>
        <a href="#">Do Not Sell My Personal Information</a>
      </div>
    </div>
  </div>
</footer>

        </>
  

  );
};

export default Home;
