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
  Paper,
  Typography
} from '@mui/material';

const ViewReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations when component mounts
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservation');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`/api/reservation/${reservationId}`);
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      alert('Reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="staff-reservation-container">
      <Typography variant="h4" gutterBottom>
        Staff Panel - View and Delete Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Special Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.restaurantName}</TableCell>
                <TableCell>{reservation.facilityHeading}</TableCell>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerEmail}</TableCell>
                <TableCell>{reservation.contactPhone}</TableCell>
                <TableCell>{new Date(reservation.dateTime).toLocaleString()}</TableCell>
                <TableCell>{reservation.guestsNumber}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.specialRequests}</TableCell>
                <TableCell>
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
    </div>
  );
};

export default ViewReservation;
