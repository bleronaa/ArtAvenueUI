import React, { useState } from 'react';
import data from './data.json';
import { useNavigate } from 'react-router-dom';
import './Auctions.css'; 
import Footer from './Footer';
import { IoFilterOutline } from "react-icons/io5";
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

const Auctions = () => {
  const { NewDiscoveries } = data;
  const initialImages = {
    Painting: {
      url: 'https://m.media-amazon.com/images/I/91y9IrbmrTL._AC_UF1000,1000_QL80_.jpg',
      openingDate: '2024-06-01',
      closingDate: '2024-06-10'
    },
    'Fine Art Prints': {
      url: 'https://oliveetoriel.com/cdn/shop/files/This-Land-I-By-Wild-Apple---Hero-shot_grande.jpg?v=1698924029',
      openingDate: '2024-06-05',
      closingDate: '2024-06-15'
    },
    Sculpture: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpVwv3QNQw5VnY-hekTtpw0OyKUnbDzo9KTQ&s',
      openingDate: '2024-06-10',
      closingDate: '2024-06-20'
    },
    Impressionism: {
      url: 'https://i.ebayimg.com/images/g/qKQAAOSwI~xj6dlw/s-l400.jpg',
      openingDate: '2024-06-15',
      closingDate: '2024-06-25'
    }
  };
  

  const openedAuctions = {
    Painting: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglCPMHz0-R8N7D5M93BZvrzGRqTp_Ayte-1yuN9drU4kWPSmbhvOA3bfmhCPcJMTB1as&usqp=CAU',
      openingDate: '2024-05-24',
      closingDate: '2024-05-30'
    },
    'Fine Art Prints': {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1xyEp8uf9l7XeCfn2eviYUOxg_oN3TZsAQ&s',
      openingDate: '2024-03-26',
      closingDate: '2024-04-01'
    },
    Sculpture: {
      url: 'https://i.pinimg.com/1200x/de/44/f6/de44f69f995ec5dd4ac0135cf2cc3cd1.jpg',
      openingDate: '2024-02-28',
      closingDate: '2024-03-08'
    },
    Impressionism: {
      url: 'https://cdn-jhegd.nitrocdn.com/lsIiAvESKdETkzrkABPHLxMSFnyYzzqR/assets/images/optimized/rev-8743ff4/robertlynnelson.com/wp-content/uploads/2021/12/Rush-Hour-24x36-OAC-purple-jacaranda-landscape-art-kula-maui-hawaii-impressionism.jpg',
      openingDate: '2024-01-30',
      closingDate: '2024-02-15'
    }
  };
  
  const [visibleCategory, setVisibleCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar toggle
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setVisibleCategory((prev) => (prev === category ? '' : category));
  };

  const handleBuyButtonClick = (image) => {
    navigate('/order', { state: { image } });
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

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
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev); 
  };

  const filteredImages = NewDiscoveries.filter((image) => {
    if (locationFilters.length > 0 && !locationFilters.includes(image.location)) {
      return false;
    }

    if (categoryFilter !== '' && image.category !== categoryFilter) {
      return false;
    }

    if (searchText.trim() !== '') {
      const searchRegex = new RegExp(searchText.trim(), 'i');
      if (!Object.values(image).some((value) => searchRegex.test(value))) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'estimate-asc') {
      return parseInt(a.estimate.replace(/[^0-9]/g, ''), 10) - parseInt(b.estimate.replace(/[^0-9]/g, ''), 10);
    } else if (sortBy === 'estimate-desc') {
      return parseInt(b.estimate.replace(/[^0-9]/g, ''), 10) - parseInt(a.estimate.replace(/[^0-9]/g, ''), 10);
    } else {
      return 0;
    }
  });

  const handleSearch = () => {
    console.log("Search performed:", searchText);
  };

  return (
    <>
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
            <p>Sort by Estimate</p>
            <div>
              <input
                type="radio"
                id="estimate-asc"
                name="sort-by"
                value="estimate-asc"
                checked={sortBy === 'estimate-asc'}
                onChange={handleSortByChange}
              />
              <label htmlFor="estimate-asc">End Date - Ascending</label>
            </div>
            <div>
              <input
                type="radio"
                id="estimate-desc"
                name="sort-by"
                value="estimate-desc"
                checked={sortBy === 'estimate-desc'}
                onChange={handleSortByChange}
              />
              <label htmlFor="estimate-desc">End Date - Descending</label>
            </div>
          </div>
          <div className="filter-section">
            <p>Location</p>
            {['Prishtine', 'Mitrovice', 'Tirane'].map((location) => (
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
          </div>
          <div className="filter-section">
            <p>Category</p>
            {['Painting', 'Fine Art Prints', 'Sculpture'].map((category) => (
              <div key={category}>
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={categoryFilter === category}
                  onChange={handleCategoryFilterChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>




        <div className="right-content">
        <div className="image-container">
          <h1 className='auctions-type'>Opened  Auctions</h1>

          {['Painting', 'Fine Art Prints', 'Sculpture', 'Impressionism'].map((category) => (
  <div key={category} className="category-section">
    {!visibleCategory || visibleCategory === category ? (
      <div className="image-item">
        <img src={openedAuctions[category].url} alt={category} />
        <span className='upcoming'>Opened AUCTIONS</span>
        <p className="opening-date">Opening Date: {openedAuctions[category].openingDate}</p> 
        <p className="close-date">Close Date: {openedAuctions[category].closingDate}</p> 


        <p className="category-name">{category}</p>
        <button
          className="bid-button"
          onClick={() => handleCategoryClick(category)}
        >
          {visibleCategory === category ? 'Hide' : 'Open'}
        </button>
        {visibleCategory === category && (
          <div className="horizontal-scroll">
            {filteredImages
              .filter((image) => image.category === category && image.auction === 'opened') 
              .map((image) => (
                <div className="category-section" key={image.id}> 
                  <div className="image-item">
                    <img src={image.url} alt={image.name} />
                    <p>{image.text}</p>
                    <p className="text"> {image.description}</p>
                    <div className='iconss'>

                    <p className="text"><IoIosPricetags className="price-icon" /> {image.price}</p>
                    <p className="text"><IoLocationSharp className="location-icon" /> {image.location}</p>
                </div>
                    <button
                      className="buy-button"
                      onClick={() => handleBuyButtonClick(image)}
                    >
                      <AiOutlineShoppingCart />
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    ) : null}
  </div>
))}

</div>
       


          <div className="image-container">
          <h1 className='auctions-type'>Upcoming  Auctions</h1>

          {['Painting', 'Fine Art Prints', 'Sculpture', 'Impressionism'].map((category) => (
  <div key={category} className="category-section">
    {!visibleCategory || visibleCategory === category ? (
      <div className="image-item">
        <img src={initialImages[category].url} alt={category} />
        <span className='upcoming'>UPCOMING AUCTIONS</span>
        <p className="opening-date">Opening Date: {initialImages[category].openingDate}</p> 
        <p className="close-date">Close Date: {initialImages[category].closingDate}</p> 
        <p className="category-name">{category}</p>
        <button
          className="bid-button"
          onClick={() => handleCategoryClick(category)}
        >
          {visibleCategory === category ? 'Hide' : 'Open'}
        </button>
        {visibleCategory === category && (
         <div className="horizontal-scroll">
         {filteredImages
         .filter((image) => image.category === category && image.auction === 'opened') 
          .map((image) => (
             <div className="category-section" key={image.id}> 
               <div className="image-item">
                 <img src={image.url} alt={image.name} />
                 <p className="text"> {image.description}</p>
            <div className='iconss'>

                 <p className="text"><IoIosPricetags className="price-icon" /> {image.price}</p>
                 <p className="text"><IoLocationSharp className="location-icon" /> {image.location}</p>
              </div>
                 <button
                   className="buy-button"
                   onClick={() => handleBuyButtonClick(image)}
                 >
                   <AiOutlineShoppingCart />
                   Buy Now
                 </button>
               </div>
             </div>
           ))}
       </div>
        )}
      </div>
    ) : null}
  </div>
))}

          </div>
        </div>


        
        
      </div>
      <Footer />
    </>
  );
};

export default Auctions;
