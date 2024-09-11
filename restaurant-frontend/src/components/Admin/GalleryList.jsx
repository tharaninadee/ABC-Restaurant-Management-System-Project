import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import './admin.css'; // Import the CSS file

const apiUrl = '/api/galleries'; // API endpoint for managing galleries

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [formData, setFormData] = useState({
    imagePath: '',
    galleryType: ''
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await axios.get(apiUrl);
      setGalleries(response.data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    }
  };

  const handleOpenModal = (gallery = null) => {
    setCurrentGallery(gallery);
    setFormData(gallery || { imagePath: '', galleryType: '' });
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
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentGallery) {
        await axios.put(`${apiUrl}/${currentGallery.id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      fetchGalleries();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchGalleries();
    } catch (error) {
      console.error('Error deleting gallery:', error);
    }
  };

  return (
    <Box className="gallery-container">
      <Typography variant="h4" gutterBottom className="gallery-header">
        Manage Gallery
      </Typography>
      <Button
        variant="contained"
        className="add-gallery-button"
        onClick={() => handleOpenModal()}
      >
        <AddIcon /> Add Gallery
      </Button>
      <TableContainer component={Paper} className="gallery-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Gallery Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleries.map((gallery) => (
              <TableRow key={gallery.id}>
                <TableCell className="gallery-table-cell">
                  {gallery.imagePath && (
                    <img
                      src={`data:image/jpeg;base64,${gallery.imagePath}`}
                      alt="Gallery"
                    />
                  )}
                </TableCell>
                <TableCell className="gallery-table-cell">{gallery.galleryType}</TableCell>
                <TableCell className="gallery-table-cell">
                  <IconButton className="icon-button" onClick={() => handleOpenModal(gallery)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className="icon-button" onClick={() => handleDelete(gallery.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit Gallery */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box className="modal-container">
          <Typography variant="h6" gutterBottom className="modal-header">
            {currentGallery ? 'Edit Gallery' : 'Add Gallery'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Button variant="contained" component="label" className="upload-button">
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {formData.imagePath && (
              <img
                src={`data:image/jpeg;base64,${formData.imagePath}`}
                alt="Preview"
                className="preview-image"
              />
            )}
            <TextField
              label="Gallery Type"
              name="galleryType"
              value={formData.galleryType}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" className="submit-button">
              {currentGallery ? 'Update Gallery' : 'Add Gallery'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default GalleryList;
