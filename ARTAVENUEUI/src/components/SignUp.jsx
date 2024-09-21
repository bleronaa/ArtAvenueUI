import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';

import 'toastr/build/toastr.min.css';
import './SignUp.css';
import banner from '../images/banner.png';
import logo from '../images/imglogo-removebg-preview (2).png';

import Login from './Login';
import axios from 'axios';

const SignUp = () => {
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('M');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [getNotified, setgetNotified] = useState(true);
  const [ProfilePhoto, setProfilePhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file); 
    console.log(setProfilePhoto);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('birthday', birthday);
      formData.append('username', username);
      formData.append('address', address);
      formData.append('getNotified', getNotified);
      formData.append('image', image); // Append the image file
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);
      formData.append('profilePhoto', ProfilePhoto);



      // Make a POST request to the backend API
      const response = await  axios.post('https://localhost:44340/api/Client/addClientRequest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toastr.success('Email was was sent!'); // Show success message
        // Optionally reset form fields or perform other actions
        navigate('/');
      } else {
        toastr.error('Failed to submit . Please try again.'); // Show error message if needed
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="login-page">

    
    <div className="Signup-container">
      <h2 style={{textAlign:'center',margin:'20px'}}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='info-box'>
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
        </div>
        <div className='info-box'>

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
</div>
<div className='info-box'>

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
        <label>Date of Birth</label>      
          <input
            type="date"
            id="birthday"
            value={birthday}
            placeholder='johndoe@gmail.com'
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
     
        </div>
        <div className='info-box'>
   
        {/* <div className="form-group">  
        <label>Gender</label>      
          <input
            type="text"
            id="gender"
            value={gender}
            placeholder='M or F'
            onChange={(e) => setGender(e.target.value)}
          />
        </div> */}
       
        <div className="form-group">  
        <label>Address</label>      
          <input
            type="text"
            id="address"
            value={address}
            placeholder='New York'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">  
      <label>Get Notified For New Auctions</label>
      <div>
        <input
          type="checkbox"
          id="notifyYes"
          name="notify"
          checked={getNotified}
          onChange={() => setgetNotified(true)}
        />
        <label htmlFor="notifyYes">Yes</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="notifyNo"
          name="notify"
          checked={!getNotified}
          onChange={() => setgetNotified(false)}
        />
        <label htmlFor="notifyNo">No</label>
      </div>
    </div>
        </div>

        <div className="form-group image">  
        <label>Upload Profile Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </div>
        
       
        <button type="submit" className='submitSignupButton'>Sign up</button>
        <div className="Signuplinks">
          <Link to='/Login' >Already have an account? Log in</Link>
          <a href="#">Forgot your passwod?</a>
        </div>
      </form>
      
    </div>

   </div>
 
  );
};

export default SignUp;