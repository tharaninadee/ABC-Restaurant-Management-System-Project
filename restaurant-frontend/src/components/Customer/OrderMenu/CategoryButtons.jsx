// components/CategoryButtons.jsx
import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const CategoryButtons = ({ categories, onCategorySelect }) => {
    return (
        <ButtonGroup variant="contained" aria-label="categories">
            <Button onClick={() => onCategorySelect('')}>All</Button>
            {categories.map(category => (
                <Button key={category.id} onClick={() => onCategorySelect(category.id)}>
                    {category.name}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default CategoryButtons;
