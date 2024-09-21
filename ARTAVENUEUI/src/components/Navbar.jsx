import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/imglogo.png';
import { FaUserAlt, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import './Navbar.css';
import { useAuth } from '../../context';
import zIndex from '@mui/material/styles/zIndex';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useAuth(); // Get the context data

  const handleClick = () => {
    setClick(!click);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/Login'; // Redirect to Login page
  };

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={click ? 'nav-links active' : 'nav-links'}>
          <ul>
            <Link to="/" onClick={handleClick}>
              <li>Home</li>
            </Link>
            <Link to="/Auctions" onClick={handleClick}>
              <li>Auctions</li>
            </Link>
            <Link to="/Buy" onClick={handleClick}>
              <li>Buy</li>
            </Link>
            <Link to="/Sell" onClick={handleClick}>
              <li>Sell</li>
            </Link>
            {data.clientName ? (
              <div className="relative inline-block text-left mr-4">
                <button
                  type="button"
                  onClick={handleDropdownToggle}
                  className="inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <FaUserAlt />
                  <span className="text-sm">{data.clientName}</span>
                  {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                    style={{ zIndex: 10 }}
                  >
                    <div className="py-1" role="none">
                      <Link
                        to={`/profile/${data.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={handleClick}
                      >
                        Account Details
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/Login" onClick={handleClick}>
                <li className="user-icon">
                  <FaUserAlt />
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="menu-toggle" onClick={handleClick}>
          <button>{click ? <FaTimes /> : <CiMenuFries />}</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
