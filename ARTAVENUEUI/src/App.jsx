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

  function App() {
    return (
      <BrowserRouter>
        <div style={{ backgroundColor: '#F1EDE4', height: "100px" }}>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Auctions" element={<Auctions/>} />
          <Route path="/Buy" element={<Buy/>} />
          <Route path="/Sell" element={<Sell/>} />
          <Route path="/ArtItems" element={<ArtItems/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path='/order' element={<Order/>}/>
        </Routes>
        {/* <Home/> */}
      </BrowserRouter>
    );
  }

  export default App;
