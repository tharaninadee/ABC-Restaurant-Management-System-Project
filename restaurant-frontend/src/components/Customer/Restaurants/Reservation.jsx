import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Typography, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation after submission
import axios from 'axios';

const TIME_SLOTS = [
  { label: '3pm - 5pm', value: '15:00-17:00' },
  { label: '5pm - 7pm', value: '17:00-19:00' }
];

const ReservationForm = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [facilityHeading, setFacility] = useState(''); // Change to facilityHeading
  const [dateTime, setDateTime] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guestsNumber, setGuestsNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [capacityByTimeSlot, setCapacityByTimeSlot] = useState({});
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Fetch restaurants
    axios.get('/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });

    // Fetch facilities
    axios.get('/api/facilities')
      .then(response => {
        const facilitiesData = response.data;
        setFacilities(facilitiesData);

        // Initialize capacity mapping by time slot
        const capacityMap = {};
        facilitiesData.forEach(facility => {
          if (facility.startTime && facility.endTime) {
            const timeSlotKey = `${facility.startTime}-${facility.endTime}`;
            capacityMap[timeSlotKey] = facility.capacity;
          }
        });
        setCapacityByTimeSlot(capacityMap);
      })
      .catch(error => {
        console.error('Error fetching facilities:', error);
      });
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!restaurantName) {
      tempErrors.restaurantName = 'Restaurant name is required';
      isValid = false;
    }

    if (!facilityHeading) {  // Adjust to facilityHeading
      tempErrors.facilityHeading = 'Facility is required';  // Adjust to facilityHeading
      isValid = false;
    }

    if (!dateTime) {
      tempErrors.dateTime = 'Date and time are required';
      isValid = false;
    }

    if (!timeSlot) {
      tempErrors.timeSlot = 'Time slot is required';
      isValid = false;
    }

    if (guestsNumber <= 0) {
      tempErrors.guestsNumber = 'Number of guests must be greater than zero';
      isValid = false;
    } else {
      const facilityCapacity = capacityByTimeSlot[timeSlot];
      if (facilityCapacity === undefined) {
        tempErrors.guestsNumber = 'Invalid time slot';
        isValid = false;
      } else if (guestsNumber > facilityCapacity) {
        tempErrors.guestsNumber = `Number of guests exceeds available capacity for the selected time slot (${facilityCapacity} max)`;
        isValid = false;
      }
    }

    if (!customerName) {
      tempErrors.customerName = 'Customer name is required';
      isValid = false;
    }

    if (!customerEmail) {
      tempErrors.customerEmail = 'Customer email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      tempErrors.customerEmail = 'Customer email is invalid';
      isValid = false;
    }

    if (!contactPhone) {
      tempErrors.contactPhone = 'Contact phone is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const reservation = {
          restaurantName,
          facilityHeading,  // Send as facilityHeading
          dateTime,
          timeSlot,
          guestsNumber: parseInt(guestsNumber),
          specialRequests,
          customerName,
          customerEmail,
          contactPhone
        };

        // Submit reservation
        const response = await axios.post('/api/reservation', reservation);

        // Check if reservation was successfully confirmed
        if (response.status === 201) {
          alert('Reservation successful! A confirmation email has been sent.');
          navigate('/');  // Redirect to confirmation page
        } else {
          alert('Failed to make reservation');
        }

        // Clear form or redirect as needed
        setRestaurantName('');
        setFacility('');
        setDateTime('');
        setTimeSlot('');
        setGuestsNumber('');
        setSpecialRequests('');
        setCustomerName('');
        setCustomerEmail('');
        setContactPhone('');

      } catch (error) {
        console.error('Error making reservation:', error);
        alert('Failed to make reservation');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Reservation Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(errors.restaurantName)}>
            <InputLabel>Restaurant</InputLabel>
            <Select
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              label="Restaurant"
            >
              {restaurants.map((r) => (
                <MenuItem key={r.id} value={r.name}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
            {errors.restaurantName && <FormHelperText>{errors.restaurantName}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(errors.facilityHeading)}> {/* Adjust to facilityHeading */}
            <InputLabel>Facility</InputLabel>
            <Select
              value={facilityHeading}
              onChange={(e) => setFacility(e.target.value)}
              label="Facility"
            >
              {facilities.map((f) => (
                <MenuItem key={f.id} value={f.heading}>
                  {f.heading}
                </MenuItem>
              ))}
            </Select>
            {errors.facilityHeading && <FormHelperText>{errors.facilityHeading}</FormHelperText>}  {/* Adjust to facilityHeading */}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date and Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            error={Boolean(errors.dateTime)}
            helperText={errors.dateTime}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(errors.timeSlot)}>
            <InputLabel>Time Slot</InputLabel>
            <Select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              label="Time Slot"
            >
              {TIME_SLOTS.map((slot) => (
                <MenuItem key={slot.value} value={slot.value}>
                  {slot.label}
                </MenuItem>
              ))}
            </Select>
            {errors.timeSlot && <FormHelperText>{errors.timeSlot}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of Guests"
            type="number"
            value={guestsNumber}
            onChange={(e) => setGuestsNumber(e.target.value)}
            error={Boolean(errors.guestsNumber)}
            helperText={errors.guestsNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            error={Boolean(errors.customerName)}
            helperText={errors.customerName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Customer Email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            error={Boolean(errors.customerEmail)}
            helperText={errors.customerEmail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact Phone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            error={Boolean(errors.contactPhone)}
            helperText={errors.contactPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Requests"
            multiline
            rows={4}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Confirm Reservation
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReservationForm;
