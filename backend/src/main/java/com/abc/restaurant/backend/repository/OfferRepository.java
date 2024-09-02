package com.abc.restaurant.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.abc.restaurant.backend.model.Offer;

@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {
}
