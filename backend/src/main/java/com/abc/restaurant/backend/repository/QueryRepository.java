package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends MongoRepository<Query, String> {
    // Additional custom queries can be defined here if needed
}
