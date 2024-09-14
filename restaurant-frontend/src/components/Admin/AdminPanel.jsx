import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StarIcon from '@mui/icons-material/Star';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import OfferIcon from '@mui/icons-material/LocalOffer';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const drawerWidth = 240;

const AdminPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { text: 'Add Category', link: '/admin/category', icon: <CategoryIcon /> },
    { text: 'Manage Orders', link: '/admin/orders', icon: <ListAltIcon /> },
    { text: 'Manage Reservations', link: '/admin/manage-reservation', icon: <EventNoteIcon /> },
    { text: 'View Queries', link: '/admin/view-queries', icon: <QuestionAnswerIcon /> },
    { text: 'Manage Features', link: '/admin/feature-list', icon: <StarIcon /> },
    { text: 'Manage Facilities', link: '/admin/facility-list', icon: <AddLocationIcon /> },
    { text: 'Manage Offers', link: '/admin/offerlist', icon: <OfferIcon /> },
    { text: 'Manage Gallery', link: '/admin/gallerylist', icon: <PhotoLibraryIcon /> },
    { text: 'Manage Restaurants', link: '/admin/restaurant-list', icon: <RestaurantIcon /> },
    { text: 'Manage Users', link: '/admin/manage-users', icon: <ManageAccountsIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('adminSession');
    window.location.href = '/';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer Toggle Button for Mobile */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{ mr: 2, display: { xs: 'block', sm: 'none' }, color: 'white' }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#2C3E50',
            color: 'white',
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Toolbar sx={{ backgroundColor: '#34495E', color: 'white' }}>
          <IconButton sx={{ color: 'white', mr: 2 }}>
            <Avatar sx={{ bgcolor: '#1ABC9C' }}>A</Avatar>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.link}
              key={item.text}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#1ABC9C',
                  color: 'white',
                  '& .MuiListItemText-primary': {
                    fontWeight: 'bold',
                  },
                },
                color: 'white',
              }}
              selected={isActive(item.link)}
            >
              <IconButton sx={{ color: 'white' }}>{item.icon}</IconButton>
              <ListItemText primary={item.text} sx={{ ml: 1 }} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', padding: 2 }}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#ECF0F1',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to the Admin Dashboard - ABC Restaurant
        </Typography>
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default AdminPanel;
