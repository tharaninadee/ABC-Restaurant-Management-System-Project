package com.abc.restaurant.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.abc.restaurant.backend.model.Fooditem;

@Repository
public interface FooditemRepository extends MongoRepository<Fooditem, String> {
    // You can define custom query methods here if needed
}
