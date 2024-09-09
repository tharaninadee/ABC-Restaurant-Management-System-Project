package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Facility;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends MongoRepository<Facility, String> {
}
