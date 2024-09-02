package com.abc.restaurant.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.abc.restaurant.backend.model.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
}
