package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    List<Cart> findByCustomerEmail(String customerEmail);
    List<Cart> findByCustomerEmailAndStatus(String customerEmail, String status);
}

