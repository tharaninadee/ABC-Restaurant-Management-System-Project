import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel'; // Ensure path is correct
import Category from './Category'; // Ensure path is correct and the component is named properly
import OrderManage from './OrderManage';
import ReservationManage from './ReservationManage';
import ViewQueries from './ViewQueries';
import FeatureList from './FeatureList'; 
import FacilityList from './FacilityList';
import OfferList from './OfferList';
import GalleryList from './GalleryList';
import RestaurantList from './RestaurantList';
import ManageUsers from './ManageUsers'; 
import AdminLogin from './AdminLogin'; 

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="/" element={<AdminPanel />}>
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<OrderManage />} />
        <Route path="manage-reservation" element={<ReservationManage />} />
        <Route path="view-queries" element={<ViewQueries />} />
        <Route path="feature-list" element={<FeatureList />} /> 
        <Route path="facility-list" element={<FacilityList />} /> 
        <Route path="offerlist" element={<OfferList />} /> 
        <Route path="gallerylist" element={<GalleryList />} /> 
        <Route path="restaurant-list" element={<RestaurantList />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
