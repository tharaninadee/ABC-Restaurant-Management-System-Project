package com.abc.restaurant.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reservation")
public class Reservation {

    @Id
    private String id;
    private String restaurantName;  // Name of the restaurant
    private String facilityHeading; // Name of the facility
    private String customerName;
    private String customerEmail;
    private String contactPhone;
    private LocalDateTime dateTime; // Combining date and time
    private int guestsNumber;
    private String status; // e.g., "confirmed", "pending"
    private String specialRequests;

    // Constructors
    public Reservation() {}

    public Reservation(String id, String restaurantName, String facilityHeading, String customerName,
                       String customerEmail, String contactPhone, LocalDateTime dateTime, int guestsNumber,
                       String status, String specialRequests) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.facilityHeading = facilityHeading;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.contactPhone = contactPhone;
        this.dateTime = dateTime;
        this.guestsNumber = guestsNumber;
        this.status = status;
        this.specialRequests = specialRequests;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }

    public String getFacilityHeading() { return facilityHeading; }
    public void setFacilityHeading(String facilityHeading) { this.facilityHeading = facilityHeading; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public int getGuestsNumber() { return guestsNumber; }
    public void setGuestsNumber(int guestsNumber) { this.guestsNumber = guestsNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }
}
