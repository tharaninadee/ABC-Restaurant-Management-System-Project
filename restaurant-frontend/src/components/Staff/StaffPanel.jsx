import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Avatar } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const drawerWidth = 240;

const StaffPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Respond Queries', link: '/staff/respond-query', icon: <MailOutlineIcon /> },
    { text: 'Update Order Status', link: '/staff/order-status', icon: <ShoppingCartIcon /> },
    { text: 'View Reservations', link: '/staff/view-reservation', icon: <EventAvailableIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
      >
        
         <Toolbar sx={{ backgroundColor: '#34495E', color: 'white' }}>
          <IconButton sx={{ color: 'white', mr: 2 }}>
            <Avatar sx={{ bgcolor: '#1ABC9C' }}>A</Avatar>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Staff Panel
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
                  backgroundColor: '#1F2A38',
                  '& .MuiListItemText-primary': {
                    color: '#F0E68C', // Highlight color for active item
                    borderBottom: `2px solid #F0E68C`, // Underline for active item
                  },
                },
                color: 'white',
                '&:hover': {
                  backgroundColor: '#344A6A', // Hover color
                },
              }}
              selected={isActive(item.link)}
            >
              <IconButton sx={{ color: 'inherit' }}>{item.icon}</IconButton>
              <ListItemText primary={item.text} sx={{ ml: 1 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          backgroundColor: '#F5F5F5', // Light background for main content
        }}
      >
        <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              Welcome to Staff Dashboard - ABC Restaurant
            </Typography>
          </Toolbar>
        </AppBar>
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default StaffPanel;
