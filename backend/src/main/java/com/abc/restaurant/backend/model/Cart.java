package com.abc.restaurant.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Document(collection = "carts")
public class Cart {

    @Id
    private String id;          // MongoDB ID
    private String orderId;     // Autogenerated UUID for the order
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String orderType;   // Pickup or Delivery
    private String outlet;      // Wellewatte, Bambalapitiya
    private Address customerAddress; // Only for Delivery
    private List<CartItem> items;
    private double total;       // Total price of the order
    private String status;      // Order status: PENDING, CONFIRMED, DELIVERED
    private String specialNote; // Special note for the order

    // Default constructor
    public Cart() {
        this.orderId = UUID.randomUUID().toString(); // Generate UUID when creating a new Cart
    }

    // Constructor with parameters
    public Cart(String id, String customerName, String customerEmail, String customerPhone, String orderType, String outlet, Address customerAddress, List<CartItem> items, double total, String status, String specialNote) {
        this.id = id;
        this.orderId = UUID.randomUUID().toString(); // Generate UUID when creating a new Cart
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.orderType = orderType;
        this.outlet = outlet;
        this.customerAddress = orderType.equals("Delivery") ? customerAddress : null; // Address only for Delivery
        this.items = items;
        this.total = total;
        this.status = status;
        this.specialNote = specialNote;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public Address getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(Address customerAddress) {
        this.customerAddress = customerAddress;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSpecialNote() {
        return specialNote;
    }

    public void setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
    }

    // Nested static class for Address
    public static class Address {
        private String street;
        private String city;
        private String postalCode;
        private String country;

        // Constructor
        public Address(String street, String city, String postalCode, String country) {
            this.street = street;
            this.city = city;
            this.postalCode = postalCode;
            this.country = country;
        }

        // Getters and Setters
        public String getStreet() {
            return street;
        }

        public void setStreet(String street) {
            this.street = street;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getPostalCode() {
            return postalCode;
        }

        public void setPostalCode(String postalCode) {
            this.postalCode = postalCode;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }
    }

    // Nested static class for CartItem
    public static class CartItem {
        private String itemId;
        private String itemName;
        private int quantity;
        private double price;

        // Constructor
        public CartItem(String itemId, String itemName, int quantity, double price) {
            this.itemId = itemId;
            this.itemName = itemName;
            this.quantity = quantity;
            this.price = price;
        }

        // Getters and Setters
        public String getItemId() {
            return itemId;
        }

        public void setItemId(String itemId) {
            this.itemId = itemId;
        }

        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}
