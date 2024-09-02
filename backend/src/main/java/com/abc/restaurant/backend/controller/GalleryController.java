package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Gallery;
import com.abc.restaurant.backend.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    // Create or Update Gallery Item
    @PostMapping
    public ResponseEntity<Gallery> createOrUpdateGallery(@RequestBody Gallery gallery) {
        try {
            Gallery savedGallery = galleryService.saveGallery(gallery);
            return ResponseEntity.ok(savedGallery);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get All Gallery Items
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleryItems() {
        List<Gallery> galleryItems = galleryService.getAllGalleryItems();
        return ResponseEntity.ok(galleryItems);
    }

    // Get Gallery Item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Optional<Gallery> gallery = galleryService.getGalleryById(id);
        if (gallery.isPresent()) {
            return ResponseEntity.ok(gallery.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Gallery Item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        try {
            galleryService.deleteGallery(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
