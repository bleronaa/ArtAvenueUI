import React, { useState } from 'react';
import data from './data.json';
import './Auctions.css'; // Assuming you create a CSS file for styling

const Auctions = () => {
  const { NewDiscoveries } = data;
  const [sortBy, setSortBy] = useState('');
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

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

  // Function to filter images based on selected filters
  const filteredImages = NewDiscoveries
    .filter((image) => {
      // Apply location filter
      if (locationFilters.length > 0 && !locationFilters.includes(image.location)) {
        return false;
      }

      // Apply category filter
      if (categoryFilter !== '' && image.category !== categoryFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'estimate-asc') {
        return parseInt(a.estimate.replace(/[^0-9]/g, ''), 10) - parseInt(b.estimate.replace(/[^0-9]/g, ''), 10);
      } else if (sortBy === 'estimate-desc') {
        return parseInt(b.estimate.replace(/[^0-9]/g, ''), 10) - parseInt(a.estimate.replace(/[^0-9]/g, ''), 10);
      } else {
        return 0;
      }
    });

  const handleBidButtonClick = () => {
    window.location.href = '/Login';
  };

  return (
    <div className="auctions-container" style={{ display: 'flex' }}>
      <div className="sidebar">
        <h3>Filter By</h3>
        <div className="filter-section">
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
          {['Prishtine', 'Mitrovice', 'Peje', 'Gjakove','Prizren','Tirane', 'Shkoder', 'Vlore','Berat','Elbasan'].map((location) => (
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
              <p>{image.text}</p>
              <p className="text">Estimate: {image.estimate}</p>
              <p className="text">Location: {image.location}</p>
              <p className="text">Category: {image.category}</p>
              <button className="bid-button" onClick={handleBidButtonClick}>
                {image.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auctions;
