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
  Modal,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = '/api/features';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '', description: '' });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(apiUrl);
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleOpenModal = (feature = null) => {
    setCurrentFeature(feature);
    setFormData(feature || { name: '', image: '', description: '' });
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
      setFormData({ ...formData, image: reader.result.split(',')[1] }); // Get base64 data only
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFeature) {
        await axios.put(`${apiUrl}/${currentFeature.id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      fetchFeatures();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving feature:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', mb: 4, textAlign: 'center' }}>
        Manage Features
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()} startIcon={<AddIcon />}>
          Add Feature
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id} hover>
                <TableCell>{feature.name}</TableCell>
                <TableCell>
                  {feature.image && (
                    <img
                      src={`data:image/png;base64,${feature.image}`}
                      alt={feature.name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                  )}
                </TableCell>
                <TableCell>{feature.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenModal(feature)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(feature.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit Feature */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 400,
            p: 4,
            backgroundColor: 'white',
            margin: 'auto',
            mt: '10%',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {currentFeature ? 'Edit Feature' : 'Add Feature'}
          </Typography>
          <Divider sx={{ mb: 2 }} />
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
            <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {formData.image && (
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                <img
                  src={`data:image/png;base64,${formData.image}`}
                  alt="Preview"
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                />
              </Box>
            )}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              rows={3}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {currentFeature ? 'Update Feature' : 'Add Feature'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default FeatureList;
