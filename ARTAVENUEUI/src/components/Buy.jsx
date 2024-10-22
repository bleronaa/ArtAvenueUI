import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import './Auctions.css';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoFilterOutline } from "react-icons/io5";
import Preloader from './Preloader';
import en from './en.json';
import al from './al.json';
import { useLanguage} from './LanguageContext';

const Buy = () => {
  const { NewDiscoveries } = data;
  const [sortBy, setSortBy] = useState('');
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [searchText, setSearchText] = useState('');

  const [error, setError] = useState('');
  const [artItemId, setartItemId] = useState('');

  const [buyNow, setBuyNow] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prelaoder, setPreloader]=useState(true);

  const { language } = useLanguage();
  const translations = language === 'en' ? en : al;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44340/api/Category/getCategoryList');
        setCategories(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);


  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBuyNow = async () => {
      try {
        const response = await axios.get('https://localhost:44340/api/ArtItem/getArtItemBuyNow', {
          params: {
            searchInput: searchText.trim(),
            SortByDesc:sortBy,
            CategoryId:categoryFilter,
          },
          headers: {
             'Authorization': `Bearer ${token}`
          } // Include searchInput in the request body
        });
        if (response.data) {
          setBuyNow(response.data);
        }
      } catch (error) {
        setError(error.message || 'Error fetching auction details');
      }finally{
        setPreloader(false);
      }
    };

    fetchBuyNow();
  }, [searchText,sortBy,categoryFilter]); 
  const handleLocationFilterChange = (e) => {
    const selectedLocation = e.target.value;
    setLocationFilters((prev) =>
      prev.includes(selectedLocation)
        ? prev.filter((location) => location !== selectedLocation)
        : [...prev, selectedLocation]
    );
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);

    console.log()
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText)
  };

  const handlePriceValueChange = (e) => {
    setPriceSearch(e.target.value);
    console.log(searchText)
  };

  const handleSearch = () => {
    console.log("Search performed:", searchText);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev); 
  };

  
  const handleBuyButtonClick = (artAuctionId) => {
    setartItemId(artAuctionId)
    navigate(`/order/${artAuctionId}/true`);

  };

  if(prelaoder){
    return ( <div className="preloader-container">
      <Preloader />
    </div>)
  }

  return (
    <div className="auctions-container">
       <button className="menu-button" onClick={handleSidebarToggle}>
        <IoFilterOutline />

        </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
       
        <div className="filter-section">
          <div className="search-container-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <AiOutlineSearch className="search-icon" onClick={handleSearch} />
            </div>
          </div>
          <p>{translations.Sort}</p>
          <div>
            <input
              type="radio"
              id="estimate-asc"
              name="sort-by"
              value={false}
              checked={sortBy === 'false'}
              onChange={handleSortByChange}
            />
            <label htmlFor="estimate-asc">{translations.Low}</label>
          </div>
          <div>
            <input
              type="radio"
              id="estimate-desc"
              name="sort-by"
              value={true}
              checked={sortBy === 'true'}
              onChange={handleSortByChange}
            />
            <label htmlFor="estimate-desc">{translations.High}</label>
          </div>
        </div>
        {/* <div className="filter-section">
          <p>Location</p>
          {['Prishtine', 'Mitrovice', 'Peje', 'Gjakove', 'Prizren', 'Tirane', 'Shkoder', 'Vlore', 'Berat', 'Elbasan'].map((location) => (
            <div key={location}>
              <input
                type="checkbox"
                id={location}
                value={location}
                checked={locationFilters.includes(location)}
                onChange={handleLocationFilterChange}
              />
              <label htmlFor={location}>{location}</label>
            </div>
          ))}
        </div> */}
        <div className="filter-section">
          <p>{translations.Category}</p>
          {categories.map((category) => (
            <div key={category.categroyId}>
              <input
                type="radio"
                id={category.categroyId}
                name="category"
                value={category.categroyId}
                checked={categoryFilter == category.categroyId}
                onChange={handleCategoryFilterChange}
              />
              <label htmlFor={category.categoryName}>{category.categoryName}</label>
            </div>
          ))}
        </div>
      </div>
         <div className='auction-details-container'>

         <main>
{buyNow.map((item) => (
  <div class = "card" key={item.id} onClick={()=>handleBuyButtonClick(item.id)}>
    <img src={transformImagePath(item.images[0]?.photoFormat||'')} alt=""/>
    <div className="card-content">
      <h2>
        {item.artName}
      </h2>
      <p style={{ maxWidth: '50%' }}>
  {item.description.length > 30 
    ? `${item.description.substring(0, 30)}...` 
    : item.description}
  <br></br>
   Price: {item.buyimmediatelyPrice}
      </p>
 
     {/* <button className='bidbutton'>BID NOW</button> */}
     
    </div>
  </div>
))}
</main>
      </div>
    </div>
  );
};
const transformImagePath = (path) => {
  if (!path) return ''; // Return an empty string or a default image URL if path is undefined
  const baseURL = 'https://localhost:44340/ArtItem-photos/';
  const fileName = path.split('\\').pop(); // Extract the filename from the path
  return `${baseURL}${fileName}`;
};
export default Buy;
