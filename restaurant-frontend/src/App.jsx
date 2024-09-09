import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Customer/Navbar/Navbar';
import Footer from './components/Customer/Footer/Footer';
import Home from './components/Customer/Home/Home';
import OrderMenu from './components/Customer/OrderMenu/OrderMenu';
import Restaurant from './components/Customer/Restaurants/Restaurants';

import AdminRoutes from './components/Admin/AdminRoutes'; 


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {/* Conditionally render Navbar and Footer for non-admin routes */}
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Main app routes */}
          <Route path="/" element={<Home />} />
          <Route path="/order-menu" element={<OrderMenu />} />
          <Route path="/restaurants" element={<Restaurant />} />
         
          
           {/* Admin panel routes */}
           <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
