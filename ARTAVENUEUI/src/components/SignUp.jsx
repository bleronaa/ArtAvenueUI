import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import banner from '../images/banner.png';
import logo from '../images/imglogo-removebg-preview (2).png';

import Login from './Login';

const SignUp = () => {
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Firstname',firstname);
    console.log('Lastname',lastname);
    console.log('Username:', email);
    console.log('Password:', password);
  };
  

  return (
   <div>
    <div className="header">
      <img src={logo} alt='logo'/>
    </div>
    <div className="Signup-container">
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">  
        <label>First name</label>      
          <input
            type="text"
            id="firstname"
            value={firstname}
            placeholder='John'
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">  
        <label>Last name</label>      
          <input
            type="text"
            id="lastname"
            value={lastname}
            placeholder='Doe'
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">  
        <label>Email address</label>      
          <input
            type="text"
            id="email"
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
        <button type="submit" className='submitSignupButton'>Sign up</button>
        <div className="Signuplinks">
          <Link to='/Login' >Already have an account? Log in</Link>
          <a href="#">Forgot your passwod?</a>
        </div>
      </form>
      <img src={banner} alt='banner' className='banner'/>
      
    </div>

   </div>
 
  );
};

export default SignUp;