import React, { useState } from 'react';
import data from './data.json';
import { useNavigate } from 'react-router-dom';
import './Auctions.css'; 
import Footer from './Footer';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

const Auctions = () => {
  const { NewDiscoveries } = data;
  const initialImages = {
    Painting: 'https://m.media-amazon.com/images/I/91y9IrbmrTL._AC_UF1000,1000_QL80_.jpg',
    'Fine Art Prints': 'https://oliveetoriel.com/cdn/shop/files/This-Land-I-By-Wild-Apple---Hero-shot_grande.jpg?v=1698924029',
    Sculpture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpVwv3QNQw5VnY-hekTtpw0OyKUnbDzo9KTQ&s',
  };
  const [visibleCategory, setVisibleCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchText, setSearchText] = useState('');
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
    <div className="auctions-container" >
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
        {['Painting', 'Fine Art Prints', 'Sculpture'].map((category) => (
  <div key={category} className="category-section">
    {!visibleCategory || visibleCategory === category ? (
      <div className="image-item">
        <img src={initialImages[category]} alt={category} />
        <span className='upcoming'>UPCOMING AUCTIONS</span>
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
              .filter((image) => image.category === category)
              .map((image) => (
                <div className="image-item" key={image.id}>
                  <img src={image.url} alt={image.name} />
                  <p>{image.text}</p>
                  <p className="text">Estimate: {image.estimate}</p>
                  <p className="text">Location: {image.location}</p>
                  <p className="text">Category: {image.category}</p>
                  <button
                    className="bid-button"
                    onClick={() => handleBuyButtonClick(image)}
                  >
                    <AiOutlineShoppingCart />
                    Buy Now
                  </button>
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
    <Footer/>

  </>
);
};

export default Auctions;
