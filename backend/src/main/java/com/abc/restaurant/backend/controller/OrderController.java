package com.abc.restaurant.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abc.restaurant.backend.model.Order;
import com.abc.restaurant.backend.service.EmailService;
import com.abc.restaurant.backend.service.OrderService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private EmailService emailService;

    // Create or Update Order
    @RequestMapping("/createOrUpdate")
    public ResponseEntity<Order> createOrUpdateOrder(@RequestBody Order order) {
        try {
            Order savedOrder = orderService.saveOrder(order);

            StringBuilder textBuilder = new StringBuilder();
            textBuilder.append(String.format("Thank you for your order with ABC Restaurant, %s.\n\n", savedOrder.getCustomerId()));
            textBuilder.append("Your order is confirmed.\n\n");
            textBuilder.append(String.format("Address: %s\n", savedOrder.getAddress()));
            textBuilder.append(String.format("Delivery Method: %s\n", savedOrder.getDeliveryMethod()));
            textBuilder.append(String.format("Special Note: %s\n", savedOrder.getSpecialNote()));
            textBuilder.append(String.format("Total Amount: Rs. %.2f\n", savedOrder.getTotalAmount()));
            textBuilder.append("For any clarification, please call the ABC Restaurant Front Desk.\n\n");
            textBuilder.append("ABC RESTAURANT\n");
            textBuilder.append("Telephone No: 0112744588");

            String emailBody = textBuilder.toString();
            String customerEmail = savedOrder.getCustomerId(); // Assuming customerId is the email

            emailService.sendEmail(customerEmail, "Order Confirmation", emailBody);

            return ResponseEntity.ok(savedOrder);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body(null); // Handle exceptions appropriately
        }
    }

    // Get Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get All Orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Update Order Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String id, @RequestBody String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(id, status);

            if ("confirmed".equalsIgnoreCase(status)) {
                String emailBody = String.format("""
            Thank you for your order with ABC Restaurant.

            Your order is confirmed and being processed.

            Order ID: %s

            For any clarification, please call the ABC Restaurant Front Desk.

            ABC RESTAURANT
            Telephone No: 0112744588
            """, updatedOrder.getId());

                emailService.sendEmail(updatedOrder.getCustomerId(), "Order Confirmed", emailBody);
            }

            return ResponseEntity.ok(updatedOrder);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body(null); // Handle exceptions appropriately
        }
    }

    // Delete Order by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
