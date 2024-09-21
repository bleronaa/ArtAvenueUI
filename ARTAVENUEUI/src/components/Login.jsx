import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../images/imglogo-removebg-preview (2).png';
import SignUp from './SignUp';
import axios from 'axios';
import toastr from 'toastr';
import { useAuth } from '../../context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:44340/api/Client/clientLoginRequest', {
        email,
        password
      });
      console.log(response)
      const { token } = response.data; // Assuming your token is returned in response.data
      if(response.data.message===null){
        localStorage.setItem('token', token);
        toastr.success("You are Logged in!")
        await updateUserData();
        // Redirect to dashboard or another page
        navigate('/') // Example redirect
      }else{
        toastr.error("Authentication Failed!")

      }
      // Store token in localStorage
      
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
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
              value={email}
              placeholder='johndoe@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
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
            <a href="/forgotpassword">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
