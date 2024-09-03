package com.abc.restaurant.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Restaurant;
import com.abc.restaurant.backend.repository.RestaurantRepository;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // Create or Update Restaurant
    public Restaurant saveRestaurant(Restaurant restaurant) {
        // Ensure necessary fields are set
        if (restaurant.getName() == null || restaurant.getAddress() == null || restaurant.getCapacity() <= 0) {
            throw new IllegalArgumentException("Name, address, and capacity are required");
        }
        restaurant.setUpdatedAt(LocalDateTime.now());
        if (restaurant.getCreatedAt() == null) {
            restaurant.setCreatedAt(LocalDateTime.now());
        }
        return restaurantRepository.save(restaurant);
    }

    // Get All Restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Get Restaurant by ID
    public Optional<Restaurant> getRestaurantById(String id) {
        return restaurantRepository.findById(id);
    }

    // Delete Restaurant by ID
    public void deleteRestaurant(String id) {
        if (!restaurantRepository.existsById(id)) {
            throw new IllegalArgumentException("Restaurant with ID " + id + " does not exist");
        }
        restaurantRepository.deleteById(id);
    }
}
