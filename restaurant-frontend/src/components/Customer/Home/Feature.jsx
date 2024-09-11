import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Home.css'

const OverlayCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  maxWidth: 400, // Increase maxWidth to make the card larger
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const OverlayContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  opacity: 0,
  transition: 'opacity 0.3s',
  padding: theme.spacing(2), // Add padding for better text spacing
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 300, // Increase the height of the image
  width: '100%', // Ensure image takes full width of the card
}));

const Feature = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await axios.get('/api/features');
                setFeatures(response.data);
            } catch (error) {
                console.error('Error fetching features:', error);
            }
        };

        fetchFeatures();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {features.map((feature) => (
                    <OverlayCard key={feature.id}>
                        <StyledCardMedia
                            component="img"
                            image={`data:image/jpeg;base64,${feature.image}`}
                            alt={feature.name}
                        />
                        <OverlayContent className="overlay">
                            <Typography variant="h5" color="inherit">
                                {feature.description}
                            </Typography>
                        </OverlayContent>
                    </OverlayCard>
                ))}
            </Box>
        </Container>
    );
};

export default Feature;
