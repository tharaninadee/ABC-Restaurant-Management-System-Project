import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import CartSidebar from './CartSidebar';
import { Container, Grid, Typography, Box } from '@mui/material';
import backgroundImage from '/src/assets/home1.jpg'; // Ensure this path is correct

const OrderMenu = () => {
  // Initialize cart from local storage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Update local storage whenever cart state changes
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const handleCartUpdate = (item, action) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex(cartItem => cartItem.id === item.id);

      if (action === 'add') {
        if (index > -1) {
          updatedCart[index].quantity = (updatedCart[index].quantity || 0) + 1;
        } else {
          updatedCart.push({ ...item, quantity: 1 });
        }
      } else if (action === 'remove' && index > -1) {
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          updatedCart.splice(index, 1);
        }
      }

      return updatedCart; // Return the updated cart
    });
  };

  const toggleCartSidebar = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <div>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCartSidebar}
        cart={cart}
        updateCart={handleCartUpdate}
      />

      {/* Header */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          mb: 4, // Margin bottom to add space between header and content
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Order From the Finest Selections
        </Typography>
      </Box>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ItemCard onCartUpdate={handleCartUpdate} cart={cart} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OrderMenu;
