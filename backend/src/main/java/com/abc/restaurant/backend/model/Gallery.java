package com.abc.restaurant.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "gallery")
public class Gallery {
    @Id
    private String id;
    private String imagePath;  // Changed from imageUrl to imagePath
    private String galleryType;

    // Default constructor
    public Gallery() {}

    // Parameterized constructor
    public Gallery(String imagePath, String galleryType) {
        this.imagePath = imagePath;
        this.galleryType = galleryType;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getGalleryType() {
        return galleryType;
    }

    public void setGalleryType(String galleryType) {
        this.galleryType = galleryType;
    }
}
