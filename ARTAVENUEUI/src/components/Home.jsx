import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import bg from '../images/Hybrid-Homepage-RW-Prog-large.jpg';
import Footer from './Footer';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { BsEasel2 } from "react-icons/bs";
import { TbCurrencyDollar } from "react-icons/tb";
import { RiAuctionLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import data from './data.json'; // Import JSON data directly
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import LocationIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import en from './en.json';
import al from './al.json';
import { useLanguage} from './LanguageContext';

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [imageCarousel, setImageCarousel] = useState([]);
  const [NewDiscoveries, setNewDiscoveries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [suggestedData, setSuggestedData] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const translations = language === 'en' ? en : al;

  useEffect(() => {
     fetchData();
    fetchCategories();
    fetchSuggested();
  }, []);

  const fetchData = () => {
    // Use imported JSON data
    setHomeData(data.homeData);
    setImageCarousel(data.imageCarousel);
    setNewDiscoveries(data.NewDiscoveries);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:44340/api/Category/getCategoryList');
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSuggested = async () => {
    try {
      const response = await axios.get('https://localhost:44340/api/ArtItem/getSuggestedArtitems');
      setSuggestedData(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleBidButtonClick = (artAuctionId) => {
    navigate(`/order/${artAuctionId}/false`);
  };

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
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
              {/* <p className='h2text'>{carousel.text}</p> */}
            </div>
            <div className="carousel-text-box">
              <h2>{translations.sliderTxt}</h2>
              <div style={{display:'flex',flexDirection:'column', width:'50%', textAlign:'center',margin:'10px auto'}}>
        <a href="/SignUp" class="mr-6 inline-flex h-12 items-center justify-center rounded bg-orange-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-orange-400 focus:ring">{translations.sliderBtn}</a>
        <a href="/LogIn" style={{fontSize:'13px'}} aria-label="" class="inline-flex ml-4 pt-4 items-center font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-400">{translations.sliderAcc}</a>
                </div>

            </div>
          </div>
        ))}
      </Carousel>
      <div className="category">
      <h2>{translations.ShopBy}</h2>
      {categories.map(category => (
        <button 
          key={category.categroyId} 
          className='categoryButton'
        >
          {category.categoryName}
        </button>
      ))}
    </div>

        <h2 className='title text-center '>{translations.Suggested}</h2>
       
        <div className="image-container">
          {suggestedData.map(item => (
           <div  style={{ width: '20%' }}class="m-10 max-w-lg imgContainer " onClick={()=>handleBidButtonClick(item.id)}>
           <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg suggestedContainer">
             <div class="relative mx-auto h-40 rounded-full" style={{display:'flex',  justifyContent:'center'}}>
               <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
               {/* <img class="mx-auto h-auto w-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" /> */}
               <img className='h-40'  src={transformImagePath(item.images[0]?.photoFormat||'')} alt={item.artName} />
             
             </div>
             <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900">{item.artName}</h1>
             <p class="text-center text-sm leading-6 text-gray-500 hover:text-gray-600"> {item.description.length > 30
        ? item.description.substring(0, 30) + '...'
        : item.description}</p>
             <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
               <li class="flex items-center py-3 text-sm">
                 <span><ShoppingCartIcon/> {translations.StartPrice}:</span>
                 <span class="ml-auto"><span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{item.startPrice}</span></span>
               </li>
               <li class="flex items-center py-3 text-sm">
                 <span><CategoryIcon  />{translations.Category}</span>
                 <span class="ml-auto">{item.categoryName}</span>
               </li>
             </ul>
           </div>
         </div>
         
          ))}
        </div>
        <div className='hrLine'></div>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap" rel="stylesheet" />

<div class="w-screen bg-orange-50">

<div class="relative mx-auto flex flex-col px-4 sm:max-w-xl md:max-w-screen-xl md:flex-row">
  <div class="mx-auto mt-10 w-full max-w-xl md:mt-36 lg:max-w-screen-xl">
    <div class="mb-16 lg:mb-0 lg:max-w-lg">
      <div class="mb-6 max-w-xl">
        <div>
          <p class="bg-teal-accent-400 mb-2 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-indigo-900">{translations.Welcome}</p>
        </div>
        <h2 class="mb-6 max-w-lg text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
          {translations.RegisterNow} <br />
          <span class="inline-block font-bold text-orange-600">{translations.ForFree}</span>
        </h2>
        <p class="text-base text-gray-700 md:text-lg">{translations.RegisterTxt}</p>
      </div>
      <div class="flex items-center">
        <a href="/SignUp" class="mr-6 inline-flex h-12 items-center justify-center rounded bg-orange-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-orange-400 focus:ring">{translations.GetStarted} </a>
        <a href="/LogIn" aria-label="" class="inline-flex items-center font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-400">{translations.sliderAcc}</a>
      </div>
    </div>
  </div>

  <div class="flex h-full w-full space-x-3 overflow-hidden px-2 md:justify-end">
    <div class="my-auto hidden w-72 flex-col space-y-3 md:mt-20 lg:flex  ">
      <img class="rounded" src="https://thumbs.dreamstime.com/b/abstract-figures-crowd-colorful-background-social-gathering-concept-community-diversity-unity-oil-painting-abstract-322314963.jpg" alt="" />
    </div>
    <div class="my-auto w-80 flex-col space-y-3 md:mt-36 lg:flex bg-white shadow-lg rounded-xl px-4 py-4">
      <div class="flex py-2 px-2 text-gray-700">
        <div class="my-auto mr-4 bg-white p-3 text-orange-500 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div class="">
          <p class="text-2xl font-bold">1420</p>
          <p class="text-sm">{translations.MonthlyUsers}</p>
        </div>
      </div>
      <div class="flex py-2 px-2 text-gray-700">
        <div class="my-auto mr-4 bg-white p-3 text-orange-500 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <div class="">
          <p class="text-2xl font-bold">550</p>
          <p class="text-sm">{translations.Graduates}</p>
        </div>
      </div>
      <div class="flex py-2 px-2 text-gray-700">
        <div class="my-auto mr-4 bg-white p-3 text-orange-500 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div class="">
          <p class="text-2xl font-bold">240</p>
          <p class="text-sm">{translations.FortuneEmployed}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


        <div className='hrLine'></div>


        <section class="w-screen bg-white py-10 text-gray-800">
  <div class="container mx-auto w-full max-w-screen-xl">
    <div class="w-full"> 
      <h2 class="text-center text-3xl font-extrabold">{translations.OurValues}</h2>
      <p class="mx-auto mb-4 max-w-xl py-2 text-center text-gray-600 sm:text-lg">{translations.OurValuesTxt}</p>
    </div>
    <div class="flex flex-col lg:flex-row">
      <div class="w-full p-4 text-left lg:w-1/3">
        <hr class="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 class="font-sans text-4xl font-light leading-10">{translations.INNOVATE}</h3>
        <p class="my-5 text-gray-600">{translations.INNOVATETxt}</p>
      </div>
      <div class="w-full p-4 text-left lg:w-1/3">
        <hr class="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 class="font-sans text-4xl font-light leading-10">{translations.GROW}</h3>
        <p class="my-5 text-gray-600">{translations.GROWTxt}</p>
      </div>
      <div class="w-full p-4 text-left lg:w-1/3">
        <hr class="mb-4 h-1.5 w-1/4 bg-blue-600" />
        <h3 class="font-sans text-4xl font-light leading-10">{translations.SERVE}</h3>
        <p class="my-5 text-gray-600">{translations.SERVETxt}</p>
      </div>
    </div>
  </div>
</section>



        <div className=" content about-auction-container">
          <div className='about-auction'>
            <span><BsEasel2 /></span>
            <h3>{translations.VariousOptions}</h3>
            <p>{translations.VariousOptionsTxt}</p>
          </div>
          <div className='about-auction'>
            <span><TbCurrencyDollar /></span>
            <h3>{translations.ReasonablePrices}</h3>
            <p>{translations.ReasonablePricesTxt}</p>
          </div>
          <div className='about-auction'>
            <span><RiAuctionLine /></span>
            <h3>{translations.ArtAuctions}</h3>
            <p>{translations.ArtAuctionsTxt}</p>
          </div>
          <div className='about-auction'>
            <span><FiTruck /></span>
            <h3>{translations.Transport}</h3>
            <p>{translations.TransportTxt}</p>
          </div>
        </div>
        <h2 className='title'>{translations.NewArrivals}</h2>
        <div className="discoveries">
        {/* {suggestedData.map(item => (
            <div className="image-item" key={item.id}>
              <img  src={transformImagePath(item.images[0]?.photoFormat||'')} alt={item.artName} />
              <h2>{item.artName}</h2>
              <div className='iconss'>
                <p className="text" ><IoIosPricetags className="price-icon"/> {item.buyimmediatelyPrice}</p>
                <p className="text"><IoLocationSharp  className="location-icon" /> {item.description}</p>
              </div>
              <button style={{ fontSize: '10px' }} className='bid-button' onClick={() => handleBidButtonClick(item.id)}>Check Out</button>

            </div>
          ))} */}
          <div className='newarrivals'>
         {suggestedData.map(item => (

          <div class="m-10 mx-4 max-w-screen-lg overflow-hidden  rounded-xl border shadow-lg md:pl-8" style={{ width: '40%' }}>
          <div class="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
         <div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
       <h2 class="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">{item.artName}</h2>
       <p class="mt-2 text-lg">By {item.firstArtist}</p>
        <p class="mt-2 mb-4 max-w-md text-gray-500">{item.description.length > 60 
        ? item.description.substring(0, 40) + '...'
        : item.description}</p>
        <p class="mt-2 mb-2 max-w-md text-gray-500"><CategoryIcon className="mr-2" style={{color:'#e4f1ee'}} /> {item.categoryName}</p>
        <p class="mt-2 mb-5 max-w-md text-gray-500"><LocationIcon className="mr-2" style={{color:'#ecf1e4'}} />{item.location}</p>
      <a  class="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md  px-6 py-2 text-white transition" style={{background:'#d8c7a1'}}>
        <span class="group flex w-full items-center justify-center rounded py-1 text-center font-bold" onClick={()=>handleBidButtonClick(item.id)}> BID NOW </span>
        <svg class="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>

       <div class="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
       <img class="h-full w-full object-cover" src={transformImagePath(item.images[0]?.photoFormat||'')} alt={item.artName} />

      {/* <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" loading="lazy" /> */}
          </div>
        </div>
      </div>
      ))}
          </div>
        </div>
        <div className='line'></div>
        <div className="BB">
          <div className="img">
            <img src={bg} width={500}/>
          </div>
          <div className="us">
            <h2>{translations.FindArt}</h2>
            <p>{translations.FindArtTxt}</p>
          </div>
        </div>
  
      <Footer/>
    </>
  );
};
const transformImagePath = (path) => {
  if (!path) return ''; // Return an empty string or a default image URL if path is undefined
  const baseURL = 'https://localhost:44340/ArtItem-photos/';
  const fileName = path.split('\\').pop(); // Extract the filename from the path
  return `${baseURL}${fileName}`;
};
export default Home;
