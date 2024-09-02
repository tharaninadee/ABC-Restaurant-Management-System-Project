import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import Home from './pages/Customer/Home/Home'
import Selections from './pages/Customer/Selections/Product'
import Restaurant from './pages/Customer/Restaurants/Restaurants'
import Gallery from './pages/Customer/Gallery'
import ContactUs from './pages/Customer/ContactUs'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <main>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selections" element={<Selections />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        
      </main>
      <Footer />
    </div>
  )
}

export default App