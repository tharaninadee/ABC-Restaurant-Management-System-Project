package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    // Custom query methods can be added here if needed
}
