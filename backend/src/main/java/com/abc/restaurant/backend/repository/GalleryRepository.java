package com.abc.restaurant.backend.repository;

import com.abc.restaurant.backend.model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    // Additional query methods can be defined here if needed
}
