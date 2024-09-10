import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import './Admin.css'; // Import CSS for additional styling

const ReservationManage = () => {
  const [reservations, setReservations] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [editReservationId, setEditReservationId] = useState(null);
  const [editedReservation, setEditedReservation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchFacilities();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservation');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/api/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleEdit = (reservation) => {
    setEditReservationId(reservation.id);
    setEditedReservation(reservation);
    setOpenDialog(true);
  };

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`/api/reservation/${reservationId}`);
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/reservation/${editReservationId}`, editedReservation);
      setReservations(reservations.map(reservation => reservation.id === editReservationId ? editedReservation : reservation));
      setEditReservationId(null);
      setEditedReservation(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReservation(prevReservation => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  return (
    <div className="admin-panel-container">
      <Typography variant="h4" gutterBottom>
        Admin Panel - Manage Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Contact Phone</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Special Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(reservation => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.restaurantName}</TableCell>
                <TableCell>{reservation.facilityHeading}</TableCell>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerEmail}</TableCell>
                <TableCell>{reservation.contactPhone}</TableCell>
                <TableCell>{reservation.dateTime}</TableCell>
                <TableCell>{reservation.guestsNumber}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.specialRequests}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(reservation)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Reservation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogContent>
          {editedReservation && (
            <div>
              <TextField
                margin="normal"
                label="Customer Name"
                name="customerName"
                value={editedReservation.customerName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="normal"
                label="Customer Email"
                name="customerEmail"
                value={editedReservation.customerEmail}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="normal"
                label="Contact Phone"
                name="contactPhone"
                value={editedReservation.contactPhone}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Facility</InputLabel>
                <Select
                  name="facilityHeading"
                  value={editedReservation.facilityHeading}
                  onChange={handleChange}
                >
                  {facilities.map(facility => (
                    <MenuItem key={facility.id} value={facility.name}>
                      {facility.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                label="Date & Time"
                type="datetime-local"
                name="dateTime"
                value={editedReservation.dateTime}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                label="Guests Number"
                name="guestsNumber"
                type="number"
                value={editedReservation.guestsNumber}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="normal"
                label="Special Requests"
                name="specialRequests"
                value={editedReservation.specialRequests}
                onChange={handleChange}
                fullWidth
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReservationManage;
