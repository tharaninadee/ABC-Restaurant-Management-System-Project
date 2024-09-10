import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';

const ItemCard = ({ onCartUpdate, cart }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories
        .map(category => ({
          ...category,
          items: category.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(category => category.items.length > 0);

      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleQuantityChange = (item, action) => {
    onCartUpdate(item, action);
  };

  return (
    <div className="item-card-container">
      <div className="menu-header">
        <h1>ABC RESTAURANT</h1>
        <h2>--- Explore Our Flavorful Menu ---</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search items by name"
          className="search-input"
        />
      </div>

      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredCategories
          .filter(category => selectedCategory === null || category.id === selectedCategory)
          .flatMap(category => category.items)
          .map(item => {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={item.id} className="item-card">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">Rs.{item.price.toFixed(2)}</p>

                <div className="item-actions">
                  <button
                    onClick={() => handleQuantityChange(item, 'remove')}
                    disabled={quantity === 0}
                    className="item-remove-button"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 'add')}
                    className="item-add-button"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ItemCard;
