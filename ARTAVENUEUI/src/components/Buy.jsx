import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import './Auctions.css';
import { IoIosPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

const Buy = () => {
  const { NewDiscoveries } = data;
  const [sortBy, setSortBy] = useState('');
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

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

  const handleBuyButtonClick = (image) => {
    navigate('/order', { state: { image } });
  };

  const handleSearch = () => {
    console.log("Search performed:", searchText);
  };

  return (
    <div className="auctions-container">
      <div className="sidebar">
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
            <label htmlFor="estimate-asc">Low to High</label>
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
            <label htmlFor="estimate-desc">High to Low</label>
          </div>
        </div>
        <div className="filter-section">
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
          {filteredImages.map((image) => (
            <div className="image-item" key={image.id}>
              <img src={image.url} alt={image.name} />
              <h2>{image.text}</h2>
              <p className="text" ><IoIosPricetags className="price-icon"/> {image.price}</p>
              <p className="text"><IoLocationSharp  className="location-icon" /> {image.location}</p>
              <button className="buy-button" onClick={() => handleBuyButtonClick(image)}>
                <AiOutlineShoppingCart />
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
