package com.abc.restaurant.backend.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "facility")
public class Facility {
    @Id
    private String id;
    private String heading;
    private String description;
    private String image; // Ensure this is defined as byte[]
    private int capacity; // New field added

    public Facility(String id, String heading, String description, String image, int capacity) {
        this.id = id;
        this.heading = heading;
        this.description = description;
        this.image = image;
        this.capacity = capacity; // Initialize new field
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}
