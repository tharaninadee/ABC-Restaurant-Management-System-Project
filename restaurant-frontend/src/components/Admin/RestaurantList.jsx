import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = '/api/restaurants';  // Your API endpoint

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', imagepath: '', outlet: '' });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleOpenModal = (restaurant = null) => {
    setCurrentRestaurant(restaurant);
    setFormData(restaurant || { name: '', description: '', imagepath: '', outlet: '' });
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
      setFormData({ ...formData, imagepath: reader.result.split(',')[1] });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentRestaurant) {
        await axios.put(`${apiUrl}/${currentRestaurant.id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      fetchRestaurants();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Restaurants
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        sx={{ mb: 2 }}
      >
        <AddIcon /> Add Restaurant
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Outlet</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.description}</TableCell>
                <TableCell>{restaurant.outlet}</TableCell>
                <TableCell>
                  <img
                    src={`data:image/jpeg;base64,${restaurant.imagepath}`}
                    alt={restaurant.name}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(restaurant)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(restaurant.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit Restaurant */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 400,
            p: 4,
            backgroundColor: 'white',
            margin: 'auto',
            mt: '10%',
            borderRadius: 1,
            boxShadow: 24
          }}
        >
          <Typography variant="h6" gutterBottom>
            {currentRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
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
            <TextField
              label="Outlet"
              name="outlet"
              value={formData.outlet}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mb: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {formData.imagepath && (
              <img
                src={`data:image/jpeg;base64,${formData.imagepath}`}
                alt="Preview"
                style={{ width: 100, height: 100, objectFit: 'cover' }}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {currentRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default RestaurantList;
