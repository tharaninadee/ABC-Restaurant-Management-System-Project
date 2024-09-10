package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends MongoRepository<Query, String> {
    List<Query> findByCustomerEmail(String customerEmail);
}
