import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Loginpopup from './components/Loginpopup/Loginpopup';
import Verify from './pages/Verify/Verify';
import MyOrder from './pages/MyOrder/MyOrder';


const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin?<Loginpopup  setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
         <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrder />} />
        </Routes> 
       
    </div>
     <Footer/>
     </>
  )
}

export default App