package com.abc.restaurant.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Document(collection = "cart")
public class Cart {
    @Id
    private String id; // MongoDB ObjectId
    private String orderId; // auto-generated UUID
    private String userEmail; // Email of the user
    private List<CartItem> items;
    private String phoneNumber;
    private String address;
    private String option;
    private String outlet;
    private String status;

    // Constructor with all fields
    public Cart(String id, String orderId, String userEmail, List<CartItem> items, String phoneNumber, String address, String option, String outlet, String status) {
        this.id = id;
        this.orderId = orderId;
        this.userEmail = userEmail;
        this.items = items;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.option = option;
        this.outlet = outlet;
        this.status = status;
    }

    // Default constructor
    public Cart() {
        this.orderId = UUID.randomUUID().toString(); // Generate a new UUID for orderId
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Method to calculate the total cost of all items in the cart
    public double getTotal() {
        return items.stream()
                .mapToDouble(CartItem::getTotal)
                .sum();
    }

    public void setTotal(double total) {

    }

    // Inner class for CartItem
    public static class CartItem {
        private String itemId; // MongoDB ObjectId
        private String name;
        private double price;
        private int quantity;
        private double total;

        // Constructor with fields
        public CartItem(String itemId, String name, double price, int quantity) {
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.total = price * quantity; // Calculate total for the item
        }

        // Getters and setters
        public String getItemId() {
            return itemId;
        }

        public void setItemId(String itemId) {
            this.itemId = itemId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
            this.total = this.price * this.quantity; // Update total when price changes
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
            this.total = this.price * this.quantity; // Update total when quantity changes
        }

        public double getTotal() {
            return total;
        }

        public void setTotal(double total) {
            this.total = total;
        }
    }
}
