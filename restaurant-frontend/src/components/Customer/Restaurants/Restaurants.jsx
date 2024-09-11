import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import './Restaurant.css'; // Import the CSS for custom styles
import backgroundImage from '/src/assets/home1.jpg';

// Sample data for restaurants
const restaurantData = [
  {
    name: "ABC Dine-In",
    image: "/src/assets/rest1.jpg",
    description: "Experience fine dining in the heart of Colombo with our exquisite dishes.",
  },
  {
    name: "Luxe Lounge",
    image: "/src/assets/rest2.jpg",
    description: "Savor the flavors of Sri Lanka with a modern twist in Colombo.",
  },
  {
    name: "Ocean's Delight",
    image: "/src/assets/rest3.jpg",
    description: "Enjoy fresh seafood with a stunning ocean view, a perfect escape for food lovers.",
  },
];

const Restaurants = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    axios.get('/api/facilities')
      .then(response => setFacilities(response.data))
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  return (
    <div>
      {/* Header */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          mb: 4, // Margin bottom to add space between header and content
          textAlign: 'center',
          px: 2, // Padding left and right for responsiveness
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          ABC Restaurant
        </Typography>
      </Box>

      {/* Restaurant Section */}
      <Container className="restaurant-section">
        <Typography variant="h2" className="restaurant-title">
          Explore Our Restaurants
        </Typography>
        <Typography className="restaurant-card-description">
          Welcome to ABC Restaurant, your go-to dining destination in Colombo. We are proud to offer our exceptional services across three locations: Colombo 3, Colombo 4, and Colombo 6. Each branch provides a unique dining experience, and we invite you to visit us and enjoy our delicious offerings.
        </Typography>
        <Box className="restaurant-cards">
          {restaurantData.map((restaurant, index) => (
            <Box key={index} className="restaurant-card">
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h5" className="restaurant-card-title">
                    {restaurant.name}
                  </Typography>
                  <Typography className="restaurant-card-description">
                    {restaurant.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Dining Areas Section */}
      <Container>
        <Typography variant="h2" className="restaurant-title">
          Our Facilities
        </Typography>
        <Box className="facility-cards">
          {facilities.map((facility) => (
            <Box key={facility.id} className="facility-card">
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${facility.image}`}
                  alt={facility.heading}
                />
                <CardContent>
                  <Typography variant="h5" className="facility-heading">
                    {facility.heading}
                  </Typography>
                  <Typography className="facility-description">
                    {facility.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Restaurants;
