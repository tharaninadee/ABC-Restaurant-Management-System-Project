import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import FacilityLists from './FacilityLists';
import Category from './Category';


const AdminRoutes = () => {
  return (
    <AdminPanel>
      <Routes>
        <Route path="addfacility" element={<FacilityLists />} />
        <Route path="category" element={<Category />} />

      </Routes>
    </AdminPanel>
  );
};

export default AdminRoutes;
