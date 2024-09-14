import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Modal, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FacilityList = () => {
  const [showModal, setShowModal] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    heading: '',
    description: '',
    startTime: '',
    endTime: '',
    capacity: '',
    image: ''
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('/api/facilities');
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilities();
  }, []);

  const handleOpenModal = (facility = null) => {
    if (facility) {
      setFormData(facility);
      setEditing(true);
    } else {
      setFormData({
        id: '',
        heading: '',
        description: '',
        startTime: '',
        endTime: '',
        capacity: '',
        image: ''
      });
      setEditing(false);
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
      setFormData({ ...formData, image: reader.result.split(',')[1] });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/facilities/${formData.id}`, formData);
      } else {
        await axios.post('/api/facilities', formData);
      }
      handleCloseModal();
      const response = await axios.get('/api/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error submitting facility:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/facilities/${id}`);
      const response = await axios.get('/api/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
        Facility Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()} sx={{ mb: 3 }}>
        Add Facility
      </Button>

      {/* Modal for Adding/Editing Facility */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          component={Paper}
          sx={{
            width: 800,
            maxHeight: '90vh',
            overflowY: 'auto',
            p: 4,
            mx: 'auto',
            mt: '5%',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {editing ? 'Edit Facility' : 'Add Facility'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Heading"
              name="heading"
              value={formData.heading}
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
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2, textAlign: 'center', borderColor: '#1976d2' }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {formData.image && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img
                  src={`data:image/jpeg;base64,${formData.image}`}
                  alt="Preview"
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                />
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editing ? 'Update Facility' : 'Add Facility'}
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Facilities List */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
        Facilities
      </Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        {facilities.map((facility) => (
          <ListItem
            key={facility.id}
            sx={{
              borderBottom: '1px solid #ddd',
              '&:last-child': { borderBottom: 'none' },
              px: 2,
              py: 1.5,
            }}
          >
            <ListItemText
              primary={facility.heading}
              secondary={`${facility.description} - Capacity: ${facility.capacity} people`}
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
              secondaryTypographyProps={{ color: '#777' }}
            />
            <IconButton onClick={() => handleOpenModal(facility)} sx={{ color: '#1976d2' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(facility.id)} sx={{ color: '#d32f2f' }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FacilityList;
