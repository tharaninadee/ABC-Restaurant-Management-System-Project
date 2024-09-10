import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './Admin.css'; // Import CSS for additional styling

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/carts');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEdit = (order) => {
    setEditOrderId(order.id);
    setEditedOrder(order);
    setOpenDialog(true);
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/carts/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/carts/${editOrderId}`, editedOrder);
      setOrders(orders.map(order => order.id === editOrderId ? editedOrder : order));
      setEditOrderId(null);
      setEditedOrder(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  return (
    <div className="admin-panel-container">
      <Typography variant="h4" gutterBottom>
        Admin Panel - Manage Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Outlet</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>{order.outlet}</TableCell>
                <TableCell>Rs. {order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Order Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {editedOrder && (
            <div>
              <TextField
                margin="normal"
                label="Customer Name"
                name="customerName"
                value={editedOrder.customerName}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Order Type</InputLabel>
                <Select
                  name="orderType"
                  value={editedOrder.orderType}
                  onChange={handleChange}
                >
                  <MenuItem value="Takeaway">Takeaway</MenuItem>
                  <MenuItem value="Delivery">Delivery</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Outlet</InputLabel>
                <Select
                  name="outlet"
                  value={editedOrder.outlet}
                  onChange={handleChange}
                >
                  <MenuItem value="Colombo 3">Colombo 3</MenuItem>
                  <MenuItem value="Colombo 4">Colombo 4</MenuItem>
                  <MenuItem value="Colombo 6">Colombo 6</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                label="Total"
                name="total"
                type="number"
                value={editedOrder.total}
                onChange={handleChange}
                fullWidth
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderManage;
