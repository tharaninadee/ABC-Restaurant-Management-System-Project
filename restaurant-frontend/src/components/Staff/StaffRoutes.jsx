import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffPanel from './StaffPanel'; // Adjust path if necessary
import RespondQuery from './RespondQuery'; // Adjust path if necessary
import OrderStatus from './OrderStatus';
import ViewReservation from './ViewReservation';


const StaffRoutes = () => {
    return (
        
            <Routes>
                <Route path="/" element={<StaffPanel />}>
                    <Route path="respond-query" element={<RespondQuery />} />
                    <Route path="order-status" element={<OrderStatus />} />
                    <Route path="view-reservation" element={<ViewReservation/>}/>
                    {/* Add other routes here */}
                </Route>
            </Routes>
       
    );
};

export default StaffRoutes;
