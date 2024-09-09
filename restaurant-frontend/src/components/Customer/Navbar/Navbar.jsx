import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, Box, Badge } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import CartSidebar from '../OrderMenu/CartSideBar'; // Ensure the correct import path
import './Navbar.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // Add state for cart sidebar
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State to track cart items
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch cart items from localStorage or API
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Order Menu', link: '/order-menu' },
    { text: 'Restaurants', link: '/restaurants' },
    { text: 'Gallery', link: '/gallery' },
    { text: 'Contact Us', link: '/contact-us' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar 
        position="fixed" 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Menu Icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" className="navbar-logo">
              <img src="/src/assets/logo2.png" alt="Logo" />
            </Link>
          </Box>
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 8 }}>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  to={item.link}
                  key={item.text}
                  className={isActive(item.link) ? 'active' : ''}
                  sx={{ mx: 2, textTransform: 'none', fontSize: '16px' }} // Adjust font size and remove uppercase
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Box>
          {/* Icons (Right) */}
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleCart}>
              <Badge
                variant="dot"
                color="secondary"
                invisible={cartItems.length === 0}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/login">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart Sidebar Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <div style={{ width: 300 }}>
          <IconButton onClick={toggleCart} sx={{ margin: 1 }}>
            <CloseIcon />
          </IconButton>
          <CartSidebar isOpen={cartOpen} onClose={toggleCart} /> {/* Pass props to CartSidebar */}
        </div>
      </Drawer>

      {/* Side Drawer for Mobile Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div style={{ width: 250 }}>
          <IconButton onClick={toggleDrawer} sx={{ margin: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                component={Link} 
                to={item.link} 
                key={item.text} 
                onClick={toggleDrawer}
                className={isActive(item.link) ? 'active' : ''} // Apply active class for styling
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={toggleCart}>
              <ListItemText primary={<ShoppingCartIcon />} />
            </ListItem>
            <ListItem button component={Link} to="/login">
              <ListItemText primary={<AccountCircleIcon />} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
