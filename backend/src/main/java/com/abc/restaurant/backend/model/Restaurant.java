package com.abc.restaurant.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "restaurant")
public class Restaurant {
    @Id
    private String id;
    private String name;
    private String description;
    private String imagepath;
    private String outlet;

    // Default constructor
    public Restaurant() {}

    // Parameterized constructor
    public Restaurant(String id, String name, String description, String imagepath, String outlet) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagepath = imagepath;
        this.outlet = outlet;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }
}
