import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
    Box
} from '@mui/material';
import backgroundImage from '/src/assets/home1.jpg'; // Correct path to the background image
import './Order.css';

const CheckoutPage = () => {
    const [cartData, setCartData] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        orderType: 'Takeaway',
        outlet: 'Colombo 3',
        address: '',
        specialNote: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cart data from localStorage when component mounts
        const savedCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
        setCartData(savedCart);
    }, []);

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const getTotalPrice = () => {
        return cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCartSubmit = async () => {
        if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
            setError('Please fill in all required fields.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!/^\d{10}$/.test(customerDetails.phone)) {
            setError('Please enter a valid phone number.');
            return;
        }
        if (customerDetails.orderType === 'Delivery' && !customerDetails.address) {
            setError('Address is required for Delivery orders.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const cartItems = cartData.map(item => ({
                itemId: item.id,
                itemName: item.name,
                quantity: item.quantity,
                price: item.price,
            }));

            const orderDetails = {
                orderId: `ORD-${Date.now()}`,
                customerName: customerDetails.name,
                customerEmail: customerDetails.email,
                customerPhone: customerDetails.phone,
                orderType: customerDetails.orderType,
                outlet: customerDetails.outlet,
                customerAddress: customerDetails.orderType === 'Delivery' ? {
                    street: customerDetails.address,
                    city: '', // Add city if needed
                    postalCode: '', // Add postalCode if needed
                    country: '', // Add country if needed
                } : null,
                items: cartItems,
                total: getTotalPrice(),
                status: 'PENDING',
                specialNote: customerDetails.specialNote,
            };

            const response = await axios.post('/api/carts', orderDetails);

            if (response.status === 200) {
                alert('Order submitted successfully!');
                localStorage.removeItem('checkoutCart');
                navigate('/');
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error submitting cart:', error);
            setError('Failed to submit the order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <Box
                sx={{
                    height: 300,
                    backgroundImage: `url(${backgroundImage})`, // Use the imported image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
            >
                <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Checkout Page
                </Typography>
            </Box>

            {/* Checkout Form */}
            <Container className="place-order" maxWidth="lg">
                <Paper elevation={3} className="place-order-paper">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <div className="place-order-left">
                                <Typography variant="h4" className="title">Delivery Information</Typography>
                                <TextField
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={customerDetails.name}
                                    onChange={handleCustomerChange}
                                    fullWidth
                                    autoComplete="name"
                                    required
                                    error={!customerDetails.name && error !== ''}
                                    helperText={!customerDetails.name && error === 'Please fill in all required fields.' ? 'Name is required.' : ''}
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={customerDetails.email}
                                    onChange={handleCustomerChange}
                                    fullWidth
                                    autoComplete="email"
                                    required
                                    error={!/\S+@\S+\.\S+/.test(customerDetails.email) && error !== ''}
                                    helperText={!/\S+@\S+\.\S+/.test(customerDetails.email) && error === 'Please enter a valid email address.' ? 'Enter a valid email address.' : ''}
                                />
                                <TextField
                                    id="phone"
                                    label="Phone Number"
                                    type="tel"
                                    name="phone"
                                    value={customerDetails.phone}
                                    onChange={handleCustomerChange}
                                    fullWidth
                                    autoComplete="tel"
                                    required
                                    error={!/^\d{10}$/.test(customerDetails.phone) && error !== ''}
                                    helperText={!/^\d{10}$/.test(customerDetails.phone) && error === 'Please enter a valid phone number.' ? 'Enter a valid phone number.' : ''}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="orderType-label">Order Type</InputLabel>
                                    <Select
                                        labelId="orderType-label"
                                        id="orderType"
                                        name="orderType"
                                        value={customerDetails.orderType}
                                        onChange={handleCustomerChange}
                                    >
                                        <MenuItem value="Takeaway">Takeaway</MenuItem>
                                        <MenuItem value="Delivery">Delivery</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="outlet-label">Outlet</InputLabel>
                                    <Select
                                        labelId="outlet-label"
                                        id="outlet"
                                        name="outlet"
                                        value={customerDetails.outlet}
                                        onChange={handleCustomerChange}
                                    >
                                        <MenuItem value="Colombo 3">Colombo 3</MenuItem>
                                        <MenuItem value="Colombo 4">Colombo 4</MenuItem>
                                        <MenuItem value="Colombo 6">Colombo 6</MenuItem>
                                    </Select>
                                </FormControl>
                                {customerDetails.orderType === 'Delivery' && (
                                    <TextField
                                        id="address"
                                        label="Address"
                                        name="address"
                                        value={customerDetails.address}
                                        onChange={handleCustomerChange}
                                        fullWidth
                                        autoComplete="street-address"
                                        error={!customerDetails.address && customerDetails.orderType === 'Delivery' && error !== ''}
                                        helperText={!customerDetails.address && customerDetails.orderType === 'Delivery' && error === 'Address is required for Delivery orders.' ? 'Address is required for Delivery orders.' : ''}
                                    />
                                )}
                                <TextField
                                    id="specialNote"
                                    label="Special Note"
                                    name="specialNote"
                                    value={customerDetails.specialNote}
                                    onChange={handleCustomerChange}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    autoComplete="off"
                                />
                                {error && <Alert severity="error" className="error-alert">{error}</Alert>}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="place-order-right">
                                <div className="cart-total">
                                    <Typography variant="h4" className="title">Cart Total</Typography>
                                    <Typography variant="body1">
                                        Subtotal: Rs. {getTotalPrice()}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h6">
                                        Total: Rs. {getTotalPrice()}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleCartSubmit}
                                        disabled={cartData.length === 0 || loading} // Disable if cart is empty or loading
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Proceed to Checkout'}
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default CheckoutPage;
