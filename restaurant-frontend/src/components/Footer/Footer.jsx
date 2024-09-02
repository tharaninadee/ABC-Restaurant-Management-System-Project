import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Grid container spacing={2} justifyContent="space-between">
          {/* Logo and Description */}
          <Grid item xs={12} md={4} className="footer-logo">
            <img src="/src/assets/logo2.png" alt="Restaurant Logo" />
            <Typography variant="body2" className="footer-description">
              Welcome to ABC Restaurant. We offer the finest dining experience with a wide variety of dishes. Come and enjoy our services in multiple cities across Sri Lanka.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4} className="footer-links">
            <Typography variant="h6" className="footer-heading">Quick Links</Typography>
            <Box className="footer-links-container">
              <a href="/">Home</a>
              <a href="/about-us">About Us</a>
              <a href="/selections">Selections</a>
              <a href="/restaurants">Restaurants</a>
              <a href="/gallery">Gallery</a>
              <a href="/contact-us">Contact Us</a>
            </Box>
          </Grid>

         {/* Contact Information */}
        
         <Grid item xs={12} md={4} className="footer-contact">
    <Typography variant="h6" className="footer-heading">Contact Us</Typography>
    <Typography variant="body2">123 Main Street, Colombo, Sri Lanka</Typography>
    <Typography variant="body2">Phone: +94 11 2345678</Typography>
    <Typography variant="body2">Email: info@abcrestaurant.com</Typography>
    
    <div className="footer-payment">
      <Typography variant="h6" className="footer-heading">Payment Method:</Typography>
      <img src="src/assets/Payhere-Logo.png" alt="PayHere" className="payhere-logo" />
    </div>
  </Grid>
     
  <Grid item xs={12} className="footer-copyright">
    <Typography variant="body2">© 2024 ABC Restaurant. All rights reserved.</Typography>
  </Grid>
</Grid>

        
      </Container>
    </footer>
  );
};

export default Footer;
