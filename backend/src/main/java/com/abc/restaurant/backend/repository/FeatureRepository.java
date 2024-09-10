package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Feature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureRepository extends MongoRepository<Feature, String> {
}
