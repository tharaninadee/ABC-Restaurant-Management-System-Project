import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import backgroundImage from '/src/assets/home1.jpg'; // Correct path to the background image
import './Contactus.css'; // Import the CSS file for custom styles

const ContactUs = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/queries', {
        customerName,
        customerEmail,
        contactPhone,
        content
      });
      setMessage('Query was sent successfully. Our team will respond to you soon.');
      setSeverity('success');
      setCustomerName('');
      setCustomerEmail('');
      setContactPhone('');
      setContent('');
    } catch (error) {
      setMessage('Failed to send query. Please try again later.');
      setSeverity('error');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${backgroundImage})`, // Use the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'relative',
            textAlign: 'center',
            fontWeight: 'bold',
            zIndex: 1,
            color: '#fff'
          }}
        >
          Contact Us
        </Typography>
      </Box>

      {/* Main content */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Query Form */}
          <Grid item xs={12} md={6}>
            <Paper className="contact-form-paper">
              <Typography variant="h5" gutterBottom className="contact-form-title">
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit} className="contact-form">
                <TextField
                  label="Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Message"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="contact-form-button"
                >
                  Send Query
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper className="contact-info-paper">
              <Typography variant="h5" gutterBottom className="contact-info-title">
                Contact Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                123 Main Street, Colombo, Sri Lanka
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: +94 11 2345678
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: info@abcrestaurant.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
