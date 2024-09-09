// components/OrderMenuPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryButtons from './CategoryButtons';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';

// Define the background image and header styles
const headerStyle = {
    backgroundImage: 'url(/path/to/your/background-image.jpg)', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 20px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px'
};

const OrderMenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch categories and items
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchItems = async (categoryId) => {
            const url = categoryId ? `/api/categories/${categoryId}/items` : '/api/categories';
            try {
                const response = await axios.get(url);
                const allItems = categoryId ? response.data : response.data.flatMap(cat => cat.items);
                setItems(allItems);
                setFilteredItems(allItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems(selectedCategory);
    }, [selectedCategory]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const lowercasedQuery = query.toLowerCase();
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredItems(filtered);
    };

    const handleAddToCart = (item, quantity) => {
        // Handle adding item to cart logic
        console.log('Added to cart:', item, quantity);
    };

    return (
        <div>
            <Box style={headerStyle}>
                <Typography variant="h3">Order From Our Finest Cuisine</Typography>
            </Box>
            <SearchBar onSearch={handleSearch} />
            <CategoryButtons categories={categories} onCategorySelect={handleCategorySelect} />
            <Grid container spacing={2}>
                {filteredItems.map(item => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                        <ItemCard item={item} onAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default OrderMenuPage;
