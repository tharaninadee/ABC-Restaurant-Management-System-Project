package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUserEmail(String userEmail);  // Find a cart by user email
}
