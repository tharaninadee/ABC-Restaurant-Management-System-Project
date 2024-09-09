package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Gallery;
import com.abc.restaurant.backend.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    // Get all galleries
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        List<Gallery> galleries = galleryService.getAllGalleries();
        return ResponseEntity.ok(galleries);
    }

    // Get a gallery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Optional<Gallery> gallery = galleryService.getGalleryById(id);
        return gallery.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new gallery
    @PostMapping
    public ResponseEntity<Gallery> addGallery(@RequestBody Gallery gallery) {
        try {
            Gallery savedGallery = galleryService.addGallery(gallery);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedGallery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Update an existing gallery by ID
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable String id, @RequestBody Gallery galleryDetails) {
        Gallery updatedGallery = galleryService.updateGallery(id, galleryDetails);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a gallery by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        try {
            galleryService.deleteGallery(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
