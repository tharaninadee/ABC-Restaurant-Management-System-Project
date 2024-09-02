package com.abc.restaurant.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String customerId;
    private List<Item> items;
    private String status;
    private double totalAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // No-args constructor
    public Order() {}

    // All-args constructor
    public Order(String id, String customerId, List<Item> items, String status, double totalAmount, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Nested Item class
    public static class Item {
        private String fooditems_Id;
        private String name;
        private double price;
        private int quantity;
        private double totalPrice;

        // No-args constructor
        public Item() {}

        // All-args constructor
        public Item(String fooditems_Id, String name, double price, int quantity, double totalPrice) {
            this.fooditems_Id = fooditems_Id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.totalPrice = totalPrice;
        }

        // Getters and Setters
        public String getfooditems_Id() {
            return fooditems_Id;
        }

        public void setfooditems_Id(String fooditems_Id) {
            this.fooditems_Id = fooditems_Id;
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
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(double totalPrice) {
            this.totalPrice = totalPrice;
        }
    }
}
