package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Restaurant;
import com.abc.restaurant.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // Retrieve all restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Retrieve a restaurant by ID
    public Optional<Restaurant> getRestaurantById(String id) {
        return restaurantRepository.findById(id);
    }

    // Add a new restaurant
    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    // Update an existing restaurant by ID
    public Restaurant updateRestaurant(String id, Restaurant restaurantDetails) {
        if (restaurantRepository.existsById(id)) {
            restaurantDetails.setId(id);
            return restaurantRepository.save(restaurantDetails);
        }
        return null;
    }

    // Delete a restaurant by ID
    public void deleteRestaurant(String id) {
        restaurantRepository.deleteById(id);
    }
}
