import React from 'react';
import { Drawer, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose, cart, updateCart }) => {
    const navigate = useNavigate();

    // Function to remove an item from the cart
    const removeItem = (id) => {
        updateCart({ id }, 'remove'); // Directly update cart state
    };

    // Function to calculate the total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Handle checkout button click
    const handleCheckout = () => {
        localStorage.setItem('checkoutCart', JSON.stringify(cart)); // Use 'checkoutCart'
        localStorage.setItem('checkoutTotal', calculateTotal());
        navigate('/login');
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <div style={{ width: 300, padding: 16, position: 'relative' }}>
                <Button
                    onClick={onClose}
                    style={{ position: 'absolute', top: 16, right: 16 }}
                    aria-label="Close cart"
                >
                    <CloseIcon />
                </Button>

                <div style={{ paddingTop: 48 }}>
                    <Typography variant="h6" gutterBottom>
                        Cart
                    </Typography>

                    {/* Cart items */}
                    {cart.length === 0 ? (
                        <Typography variant="body1" align="center" style={{ margin: '16px 0' }}>
                            Your cart is empty
                        </Typography>
                    ) : (
                        <List>
                            {cart.map((item) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`Quantity: ${item.quantity} | Price: Rs.${(item.price * item.quantity).toFixed(2)}`}
                                    />
                                    <Button onClick={() => removeItem(item.id)} color="error" aria-label="Remove item">
                                        Remove
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* Cart total and checkout button */}
                    {cart.length > 0 && (
                        <>
                            <Typography variant="h6" style={{ padding: '16px 0' }}>
                                Total: Rs. {calculateTotal()}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleCheckout}
                                aria-label="Proceed to checkout"
                            >
                                Checkout
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Drawer>
    );
};

export default CartSidebar;
