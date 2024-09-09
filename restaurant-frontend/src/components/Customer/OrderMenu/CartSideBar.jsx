import React, { useState, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartSidebar = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      // Send cart data to backend
      await axios.post('/api/cart', { items: cart });
      navigate('/checkout');
    } catch (error) {
      console.error('Error sending cart data to backend', error);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: 300, padding: 16, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16 }}
          aria-label="Close cart"
        >
          <CloseIcon />
        </IconButton>
        <List>
          {cart.length === 0 ? (
            <Typography variant="body1" align="center" style={{ margin: '16px 0' }}>
              Your cart is empty
            </Typography>
          ) : (
            cart.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Rs. ${item.price.toFixed(2)} x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => removeItem(item.id)}
                    color="error"
                    variant="outlined"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
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
    </Drawer>
  );
};

export default CartSidebar;
