package com.abc.restaurant.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "admin")
public class Admin extends User {

    private String designation;
    private String branch;

    public Admin(String id, String email, String username, String password, String contactNumber, String fullName, String designation, String branch, LocalDateTime created_at, LocalDateTime updated_at) {
        super(id, email, username, password, contactNumber, fullName, "admin", created_at, updated_at);
        this.designation = designation;
        this.branch = branch;
    }

    // Getters and Setters
    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}
