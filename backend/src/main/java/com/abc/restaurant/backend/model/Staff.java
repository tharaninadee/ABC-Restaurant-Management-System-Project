package com.abc.restaurant.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "staff")
public class Staff extends User {

    private String designation;
    private String branch;

    public Staff(String id, String email, String username, String password, String contactNumber, String fullName, String designation, String branch, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(id, email, username, password, contactNumber, fullName, "staff", createdAt, updatedAt);
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
