import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders on component mount
    axios.get('/api/carts')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleUpdateStatus = (orderId) => {
    // Find the order to be updated
    const orderToUpdate = orders.find(order => order.id === orderId);

    // Check if the order is already marked as "Ready"
    if (orderToUpdate.status === 'Ready') {
      alert('Order is already marked as Ready.');
      return;
    }

    // Update order status to "Ready"
    axios.put(`/api/carts/${orderId}`, { ...orderToUpdate, status: 'Ready' })
      .then(response => {
        // Update local state with the updated order
        setOrders(orders.map(order => 
          order.id === orderId ? response.data : order
        ));
        alert('Order status updated to Ready. Email should be sent.');
      })
      .catch(error => console.error('Error updating order status:', error));
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard - Update Order Status
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>Rs. {order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleUpdateStatus(order.id)}
                    disabled={order.status === 'Ready'}
                  >
                    Mark as Ready
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderStatus;
