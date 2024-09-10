import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel'; // Ensure path is correct
import Category from './Category'; // Ensure path is correct and the component is named properly
import OrderManage from './OrderManage';
import ReservationManage from './ReservationManage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />}>
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<OrderManage />} />
        <Route path="manage-reservation" element={<ReservationManage />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
