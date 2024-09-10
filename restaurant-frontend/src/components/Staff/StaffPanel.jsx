import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Avatar } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Import the icon for viewing reservations

const drawerWidth = 240;

const StaffPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Respond Queries', link: '/staff/respond-query', icon: <MailOutlineIcon /> },
    { text: 'Update Order Status', link: '/staff/order-status', icon: <ShoppingCartIcon /> },
    { text: 'View Reservations', link: '/staff/view-reservation', icon: <EventAvailableIcon /> }, // New View Reservations menu item
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
            backgroundColor: '#643522',
            color: 'white',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <IconButton sx={{ color: 'white', mr: 2 }}>
            <Avatar />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
                  backgroundColor: 'transparent',
                  '& .MuiListItemText-primary': {
                    borderBottom: `2px solid #C2A152`,
                  },
                },
                color: 'white', // Ensure text color matches the sidebar theme
              }}
              selected={isActive(item.link)}
            >
              <IconButton sx={{ color: 'white' }}>{item.icon}</IconButton>
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
          p: 1,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" sx={{ mt: 1 }}>
          Welcome to Staff Dashboard - ABC Restaurant
        </Typography>
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default StaffPanel;
