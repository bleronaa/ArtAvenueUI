import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/imglogo.png';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const content = (
        <div className='menu-content'>
            <ul>
                <Link  to="/">
                    <li>Home</li>
                </Link>
                <Link  to="Auctions">
                    <li>Auctions</li>
                </Link>
                <Link  to="Buy">
                    <li>Buy</li>
                </Link>
                <Link  to="Sell">
                    <li>Sell</li>
                </Link>
                <Link  to="About">
                    <li>About</li>
                </Link>
                
            </ul>
        </div>
    );

    return (
        <>
        <nav>
            <div className='navbar-container'>
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="nav-links">
                    <ul>
                        <Link  to="/">
                            <li>Home</li>
                        </Link>
                        <Link to="Auctions">
                            <li>Auctions</li>
                        </Link>
                        <Link  to="Buy">
                            <li>Buy</li>
                        </Link>
                        <Link to="Sell">
                            <li>Sell</li>
                        </Link>
                        <Link  to="About">
                            <li>About</li>
                        </Link>
                        <Link to="Login">
                        <li><FaUserAlt  /></li>
                        </Link>
                    </ul>
                </div>
                <div>
                    {click && content}
                </div>
                <div className='menu-toggle'>
                    <button onClick={handleClick}>
                        {click ? <FaTimes /> : <CiMenuFries />}
                    </button>
                </div>
            </div>
        </nav>

        
        </>
    )
}

export default Navbar;
