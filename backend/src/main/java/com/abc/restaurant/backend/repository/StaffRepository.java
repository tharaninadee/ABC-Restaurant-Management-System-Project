package com.abc.restaurant.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.abc.restaurant.backend.model.Staff;

public interface StaffRepository extends MongoRepository<Staff, String> {
    Optional<Staff> findByEmail(String email);
}
