import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import cash from '../images/Cash.png'
import Logo from '../images/imglogo.png';

import './AuctionDetails.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Preloader from './Preloader';


const AuctionDetails = () => {
  const { auctionId } = useParams(); // Retrieve auctionId from route params
  const [auctionDetails, setAuctionDetails] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [preloader, setPreloader] = useState(true);
  const [alert, setAlert] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(false);


  const navigate = useNavigate();

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
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get('https://localhost:44340/api/Auction/getAuctionDetails', {
          params: {
            id: auctionId,
            searchInput: searchInput.trim(),
            sortByDesc: sortBy,
            categoryId: categoryFilter,
          }
          // Include searchInput in the request body
        });
        if (response.data) {
          setAuctionDetails(response.data.artItemsList);
          setAlert(false);

          if (response.data.artItemsList.length == 0) {
            setAlert(true);
          }
        }
      } catch (error) {
        setError(error.message || 'Error fetching auction details');
      }
      finally {
        setPreloader(false);
      }
    };

    if (auctionId) {
      fetchAuctionDetails();
    }
  }, [auctionId, searchInput, sortBy, categoryFilter]); // Add searchInput as a dependency

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);

    console.log()
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCardDetailsClick = (id) => {
    console.log(id);
    navigate(`/order/${id}/false`);


  }
  if (error) {
    return <p>{error}</p>;
  }

  if (preloader) {
    return (<div className="preloader-container">
      <Preloader />
    </div>)
  }

  return (

    <div className='auction-details-container'>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

        <div className="filter-section">
          <div className="search-container-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <AiOutlineSearch className="search-icon" />
            </div>
          </div>
          <p>Sort by Estimate</p>
          <div>
            <input
              type="radio"
              id="estimate-asc"
              name="sort-by"
              value={false}
              onChange={handleSortByChange}

            />
            <label htmlFor="estimate-asc">Low to High</label>
          </div>
          <div>
            <input
              type="radio"
              id="estimate-desc"
              name="sort-by"
              value={true}
              onChange={handleSortByChange}

            />
            <label htmlFor="estimate-desc">High to Low</label>
          </div>
        </div>
       
        <div className="filter-section">
          <p>Category</p>
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
      <main>

        {alert ? (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}>
            No currently ArtItems in this Auction!
          </div>
        ) : (
          auctionDetails.map((item) => (
            <div class="card" key={item.id} onClick={() => handleCardDetailsClick(item.id)}>
              <img src={transformImagePath(item.images[0]?.photoFormat || '')} alt="" />
              <div className="card-content">
                <h2>{item.artName}</h2>
                <p style={{ maxWidth: '50%' }}>
                  {item.description.length > 30
                    ? `${item.description.substring(0, 30)}...`
                    : item.description}
                  <br />
                  Start Price: {item.startPrice}
                  <br />
                  Artist: {item.firstArtist}
                </p>
              </div>
            </div>
          ))
        )}

      </main>

    </div>

  );

};
const transformImagePath = (path) => {
  if (!path) return ''; // Return an empty string or a default image URL if path is undefined
  const baseURL = 'https://localhost:44340/ArtItem-photos/';
  const fileName = path.split('\\').pop(); // Extract the filename from the path
  return `${baseURL}${fileName}`;
};
export default AuctionDetails;
