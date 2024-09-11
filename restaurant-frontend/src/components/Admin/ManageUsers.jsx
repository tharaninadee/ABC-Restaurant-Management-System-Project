import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Admin.css'; // Import the custom CSS file

const ManageUsers = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [admins, setAdmins] = useState([]);
    const [staff, setStaff] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', contactNumber: '', fullName: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const adminResponse = await axios.get('/api/user/admin');
            setAdmins(adminResponse.data);

            const staffResponse = await axios.get('/api/user/staff');
            setStaff(staffResponse.data);

            const customerResponse = await axios.get('/api/user/customer');
            setCustomers(customerResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const endpoint = selectedTab === 0 ? '/api/user/admin' : selectedTab === 1 ? '/api/user/staff' : '/api/user/customer';
        try {
            if (editingId) {
                await axios.put(`${endpoint}/${editingId}`, formData);
                setEditingId(null);
            } else {
                await axios.post(endpoint, formData);
            }
            fetchData();
            setFormData({ username: '', email: '', password: '', contactNumber: '', fullName: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            username: user.username,
            email: user.email,
            password: user.password,
            contactNumber: user.contactNumber,
            fullName: user.fullName
        });
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        const endpoint = selectedTab === 0 ? '/api/user/admin' : selectedTab === 1 ? '/api/user/staff' : '/api/user/customer';
        try {
            await axios.delete(`${endpoint}/${id}`);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const renderTable = (data) => (
        <TableContainer component={Paper} className="manage-users-table">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.contactNumber}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEdit(user)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box className="manage-users-container">
            <Tabs value={selectedTab} onChange={handleTabChange} className="manage-users-tabs">
                <Tab label="Admins" />
                <Tab label="Staff" />
                <Tab label="Customers" />
            </Tabs>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" className="manage-users-header">
                    Manage {selectedTab === 0 ? 'Admins' : selectedTab === 1 ? 'Staff' : 'Customers'}
                </Typography>
                <Box className="manage-users-form">
                    <TextField
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="username"
                        label="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="contactNumber"
                        label="Contact Number"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</Button>
                </Box>
                {selectedTab === 0 && renderTable(admins)}
                {selectedTab === 1 && renderTable(staff)}
                {selectedTab === 2 && renderTable(customers)}
            </Box>
        </Box>
    );
};

export default ManageUsers;
