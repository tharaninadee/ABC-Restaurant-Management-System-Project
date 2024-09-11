import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Modal, IconButton, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imagePath: ''
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/offers');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleOpenModal = (offer = null) => {
    if (offer) {
      setEditMode(true);
      setCurrentOffer(offer);
      setFormData({
        title: offer.title,
        description: offer.description,
        imagePath: offer.imagePath
      });
    } else {
      setEditMode(false);
      setFormData({
        title: '',
        description: '',
        imagePath: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imagePath: reader.result.split(',')[1] });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/api/offers/${currentOffer.id}`, formData);
      } else {
        await axios.post('/api/offers', formData);
      }
      fetchOffers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Offer
      </Button>

      <List>
        {offers.map((offer) => (
          <ListItem key={offer.id}>
            <ListItemText
              primary={offer.title}
              secondary={offer.description}
            />
            <IconButton onClick={() => handleOpenModal(offer)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(offer.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Modal for adding/editing offer */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ width: 400, p: 4, backgroundColor: 'white', margin: 'auto', mt: '10%', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            {editMode ? 'Edit Offer' : 'Add Offer'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {formData.imagePath && <img src={`data:image/jpeg;base64,${formData.imagePath}`} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />}
            <Button type="submit" variant="contained" color="primary">
              {editMode ? 'Update Offer' : 'Add Offer'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default OfferList;
