package com.abc.restaurant.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.abc.restaurant.backend.model.Facility;

@Repository
public interface FacilityRepository extends MongoRepository<Facility, String> {
    // Custom query methods can be defined here if needed
}
