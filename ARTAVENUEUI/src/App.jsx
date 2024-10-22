  import React from 'react';
  import { BrowserRouter,Route,Routes } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import Home from './components/Home';
  import Auctions from './components/Auctions';
  import Buy from './components/Buy';
  import Sell from './components/Sell';
  import About from './components/About';
  import Login from './components/Login';
  import SignUp from './components/SignUp';
  import Order from './components/Order';
import ArtItems from './components/ArtItems';
import AuctionDetails from './components/AuctionDetails';
import Profile from './components/Profile';
import { AuthProvider } from '../context.jsx'
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import { LanguageProvider } from './components/LanguageContext.jsx';

  function App() {
    return (
      <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <div style={{ backgroundColor: '#F1EDE4', height: "100px" }}>
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Auctions" element={<Auctions />} />
            <Route path="/Buy" element={<Buy />} />
            <Route path="/Sell" element={<Sell />} />
            <Route path="/ArtItems" element={<ArtItems />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path='/order/:artAuctionId/:fromBuyComponent' element={<Order />} />
            <Route path="/auction/:auctionId" element={<AuctionDetails />} />
            <Route path="/profile/:clientId" element={<Profile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
    );
  }

  export default App;
