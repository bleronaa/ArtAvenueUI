import React, { useState } from 'react';
import './Login.css';
import banner from '../images/banner.png';
import logo from '../images/imglogo-removebg-preview (2).png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
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
          <input
            type="text"
            id="username"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='submitButton'>Login</button>
        <div className="links">
          <a href="#">Sign up</a>
          <a href="#">Forgot your passwod?</a>
        </div>
      </form>
      <img src={banner} alt='banner' className='banner'/>
      
    </div>

   </div>
 
  );
};

export default Login;