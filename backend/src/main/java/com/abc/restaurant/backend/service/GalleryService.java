package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Gallery;
import com.abc.restaurant.backend.repository.GalleryRepository;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    // Create or Update Gallery
    public Gallery saveGallery(Gallery gallery) {
        // Ensure that all necessary fields are set
        if (gallery.getRestaurantId() == null || gallery.getImageUrl() == null) {
            throw new IllegalArgumentException("Restaurant ID and image URL are required");
        }
        return galleryRepository.save(gallery);
    }

    // Get All Gallery Items
    public List<Gallery> getAllGalleryItems() {
        return galleryRepository.findAll();
    }

    // Get Gallery Item by ID
    public Optional<Gallery> getGalleryById(String id) {
        return galleryRepository.findById(id);
    }

    // Delete Gallery Item by ID
    public void deleteGallery(String id) {
        if (!galleryRepository.existsById(id)) {
            throw new IllegalArgumentException("Gallery item with ID " + id + " does not exist");
        }
        galleryRepository.deleteById(id);
    }
}
