package com.abc.restaurant.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "offers")
public class Offer {
    @Id
    private String id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private String imageUrl;

    // No-args constructor
    public Offer() {}

    // All-args constructor
    public Offer(String id, String title, String description, LocalDateTime createdAt, String imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
