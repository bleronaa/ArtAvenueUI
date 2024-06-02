import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import banner from '../images/banner.png';
import logo from '../images/imglogo-removebg-preview (2).png';
import SignUp from './SignUp';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    // Assuming the login is successful, navigate to the home page
    navigate('/');
  };

  return (
    <div>
      <div className="header">
        <img src={logo} alt='logo'/>
      </div>
      <div className="login-container">
        <h2>Welcome <br></br>Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">  
            <label>Username</label>      
            <input
              type="text"
              id="username"
              value={username}
              placeholder='johndoe@gmail.com'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='submitButton'>Login</button>
          <div className="links">
            <Link to='/SignUp' >If you don't have an account, register for free</Link>
            <a href="#">Forgot your password?</a>
          </div>
        </form>
        <img src={banner} alt='banner' className='banner'/>
      </div>
    </div>
  );
};

export default Login;
