// components/ItemCard.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ItemCard = ({ item, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    const handleAddToCart = () => {
        onAddToCart(item, quantity);
    };

    return (
        <Card style={{ maxWidth: 345, margin: '16px' }}>
            <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.image}
            />
            <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    ${item.price.toFixed(2)}
                </Typography>
                <TextField
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ItemCard;
