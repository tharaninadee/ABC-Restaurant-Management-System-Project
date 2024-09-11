import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Customer/Navbar/Navbar';
import Footer from './components/Customer/Footer/Footer';
import Home from './components/Customer/Home/Home';
import OrderMenu from './components/Customer/OrderMenu/OrderMenu';
import CheckoutPage from './components/Customer/OrderMenu/CheckoutPage';
import Restaurant from './components/Customer/Restaurants/Restaurants';
import Reservation from './components/Customer/Restaurants/Reservation';
import ContactUs from './components/Customer/Contactus/ContactUs';
import AdminRoutes from './components/Admin/AdminRoutes'; 
import StaffRoutes from './components/Staff/StaffRoutes'; 
import Gallery from './components/Customer/Gallery/Gallery';
import LoginForm from './components/Customer/Login/Login';
import OfferPopup from './components/Customer/Home/Offerpop';


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isStaffRoute = location.pathname.startsWith('/staff');

  return (
    <div>
      {/* Conditionally render Navbar and Footer for non-admin and non-staff routes */}
      {!(isAdminRoute || isStaffRoute) && <Navbar />}
      <main>
        <Routes>
          {/* Main app routes */}
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<OfferPopup />} />
          <Route path="/order-menu" element={<OrderMenu />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Admin panel routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Staff panel routes */}
          <Route path="/staff/*" element={<StaffRoutes />} />
        </Routes>
      </main>
      {!(isAdminRoute || isStaffRoute) && <Footer />}
    </div>
  );
};

export default App;
