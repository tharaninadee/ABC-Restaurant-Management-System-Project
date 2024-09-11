package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends MongoRepository<Staff, String> {
    Optional<Staff> findByEmail(String email);
    boolean existsByEmail(String email); // Add this method to check if an email exists
}
