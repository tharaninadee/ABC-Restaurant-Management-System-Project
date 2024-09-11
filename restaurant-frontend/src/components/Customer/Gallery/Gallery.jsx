import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, Paper, Snackbar, Alert } from '@mui/material';
import backgroundImage from '/src/assets/home1.jpg'; // Correct path to the background image
import './Gallery.css'; // Import the CSS file

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    // Fetch all galleries from the API
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('/api/galleries');
        setGalleries(response.data);
        setFilteredGalleries(response.data);
      } catch (error) {
        setMessage('Failed to load galleries.');
        setSeverity('error');
        setOpen(true);
      }
    };

    fetchGalleries();
  }, []);

  const handleFilter = (type) => {
    if (type === 'All') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(galleries.filter(gallery => gallery.galleryType === type));
    }
    setSelectedType(type);
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
          color: 'white'
        }}
      >
        <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Gallery
        </Typography>
      </Box>

      {/* Gallery Filters */}
      <Container sx={{ mt: 4 }}>
        <Box className="gallery-buttons">
          <button
            className={`category-button ${selectedType === 'All' ? 'active' : ''}`}
            onClick={() => handleFilter('All')}
          >
            All Images
          </button>
          {[...new Set(galleries.map(gallery => gallery.galleryType))].map(type => (
            <button
              key={type}
              className={`category-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => handleFilter(type)}
            >
              {type}
            </button>
          ))}
        </Box>

        {/* Gallery Images */}
        <Grid container spacing={3}>
          {filteredGalleries.map((gallery) => (
            <Grid item xs={12} sm={6} md={4} key={gallery.id}>
              <Paper sx={{ p: 1, textAlign: 'center' }}>
                <img
                  src={`data:image/jpeg;base64,${gallery.imagePath}`}
                  alt={gallery.galleryType}
                  className="item-image"
                />
              </Paper>
            </Grid>
          ))}
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

export default Gallery;
