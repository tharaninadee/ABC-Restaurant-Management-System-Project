import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Avatar } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt'; // Import icon for managing orders
import EventNoteIcon from '@mui/icons-material/EventNote'; // Import icon for managing reservations

const drawerWidth = 240;

const AdminPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Add Facility', link: '/admin/addfacility', icon: <AddBoxIcon /> },
    { text: 'Add Category', link: '/admin/category', icon: <CategoryIcon /> },
    { text: 'Manage Orders', link: '/admin/orders', icon: <ListAltIcon /> },
    { text: 'Manage Reservations', link: '/admin/manage-reservation', icon: <EventNoteIcon /> } // Updated Manage Reservations menu item
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
        <Typography variant="h4" sx={{ mt: 1 }}> {/* Reduced margin-top */}
          Welcome to admin dashboard - ABC Restaurant
        </Typography>
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default AdminPanel;
