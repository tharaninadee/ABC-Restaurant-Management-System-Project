package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
    // Add custom queries if needed
}
