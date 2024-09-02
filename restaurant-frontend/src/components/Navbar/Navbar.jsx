import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Selections', link: '/selections' },
    { text: 'Restaurants', link: '/restaurants' },
    { text: 'Gallery', link: '/gallery' },
    { text: 'Contact Us', link: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar 
        position="fixed" 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
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
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/login">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
            <ListItem button component={Link} to="/cart">
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
