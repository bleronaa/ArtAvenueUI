import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../images/imglogo-removebg-preview (2).png';
import SignUp from './SignUp';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    navigate('/');
  };

  return (
    <div className="login-page">
      
      <div className="login-container">
        <h2>Welcome Back!</h2>
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
      </div>
    </div>
  );
};

export default Login;
