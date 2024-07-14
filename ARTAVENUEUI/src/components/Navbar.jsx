import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/imglogo.png';
import { FaUserAlt, FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
    };

    return (
        <nav>
            <div className='navbar-container'>
                <div className='logo'>
                    <img src={Logo} alt='Logo' />
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
                        <Link to="/Login" onClick={handleClick}>
                            <li><FaUserAlt /></li>
                        </Link>
                    </ul>
                </div>
                <div className='menu-toggle' onClick={handleClick}>
                    <button>
                        {click ? <FaTimes /> : <CiMenuFries />}
                    </button>
                </div>
            </div>
            {click && (
                <div className='menu-content'>
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
                        <Link to="/ArtItems" onClick={handleClick}>
                            <li>Art Items</li>
                        </Link>
                        <Link to="/Login" onClick={handleClick}>
                            <li className='user-icon'><FaUserAlt /></li>
                        </Link>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
