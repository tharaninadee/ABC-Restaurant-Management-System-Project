// components/SearchBar.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <TextField
            label="Search for items"
            variant="outlined"
            fullWidth
            value={query}
            onChange={handleChange}
            style={{ margin: '16px 0' }}
        />
    );
};

export default SearchBar;
