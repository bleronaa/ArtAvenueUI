  import React from 'react';
  import { BrowserRouter,Route,Routes } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import Home from './components/Home';
  import Auctions from './components/Auctions';
  import Buy from './components/Buy';
  import Sell from './components/Sell';
  import About from './components/About';
  import Login from './components/Login';

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
          <Route path="/About" element={<About/>} />
          <Route path="/Login" element={<Login/>}/>

        </Routes>
        {/* <Home/> */}
      </BrowserRouter>
    );
  }

  export default App;
