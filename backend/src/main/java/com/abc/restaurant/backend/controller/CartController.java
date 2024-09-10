package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Cart;
import com.abc.restaurant.backend.service.CartService;
import com.abc.restaurant.backend.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        try {
            // Create cart and set orderId if not already present
            Cart createdCart = cartService.createCart(cart);

            // Build the email body with detailed cart information
            StringBuilder textBuilder = new StringBuilder();
            textBuilder.append(String.format("Dear %s,\n\n", cart.getCustomerName()));
            textBuilder.append("Thank you for your order with ABC Restaurant. Your order has been confirmed.\n\n");

            // Include address details only for Delivery orders
            if ("Delivery".equalsIgnoreCase(cart.getOrderType())) {
                Cart.Address address = cart.getCustomerAddress();
                textBuilder.append("Delivery Address:\n");
                textBuilder.append(String.format("%s\n", address.getStreet()));
                textBuilder.append(String.format("%s, %s\n", address.getCity(), address.getPostalCode()));
                textBuilder.append(String.format("%s\n\n", address.getCountry()));
            }

            // Add order details
            textBuilder.append("Order Details:\n");
            for (Cart.CartItem item : createdCart.getItems()) {
                textBuilder.append(String.format("Item: %s\n", item.getItemName()));
                textBuilder.append(String.format("Quantity: %d\n", item.getQuantity()));
                textBuilder.append(String.format("Unit Price: Rs. %.2f\n", item.getPrice()));
                textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", item.getQuantity() * item.getPrice()));
            }

            // Add overall total price
            textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", createdCart.getTotal()));

            // Add selected options
            textBuilder.append("Order Options:\n");
            textBuilder.append(String.format("Outlet: %s\n", createdCart.getOutlet()));
            textBuilder.append(String.format("Order Type: %s\n\n", createdCart.getOrderType()));

            // Add special note if present
            if (createdCart.getSpecialNote() != null && !createdCart.getSpecialNote().isEmpty()) {
                textBuilder.append(String.format("Special Note: %s\n\n", createdCart.getSpecialNote()));
            }

            // Add final note
            textBuilder.append("For any clarification, please call the ABC Restaurant Customer Care.\n\n");
            textBuilder.append("ABC Restaurant Colombo\n");

            String emailBody = textBuilder.toString();
            emailService.sendEmail(cart.getCustomerEmail(), "Order Confirmation", emailBody);

            return ResponseEntity.ok(createdCart);
        } catch (MessagingException e) {
            // Log the error and handle it appropriately
            return ResponseEntity.status(500).body(null); // Return an appropriate status if email sending fails
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable String id) {
        Optional<Cart> cart = cartService.getCartById(id);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        if (carts.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(carts);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart updatedCart) {
        try {
            Cart cart = cartService.updateCart(id, updatedCart);
            if (cart != null) {
                // After successfully updating, check the status
                if ("Ready".equalsIgnoreCase(cart.getStatus())) {
                    // Construct the email body for confirmed status
                    StringBuilder emailBody = new StringBuilder();
                    emailBody.append(String.format("Dear %s,\n\n", cart.getCustomerName()));
                    emailBody.append("Your order is now ready at the outlet.\n\n");
                    emailBody.append(String.format("Order ID: %s\n", cart.getOrderId()));
                    emailBody.append(String.format("Outlet: %s\n\n", cart.getOutlet()));
                    emailBody.append("For any clarification, please call the ABC Restaurant Customer Care.\n\n");
                    emailBody.append("ABC Restaurant Colombo\n");

                    // Send the email for confirmed order
                    emailService.sendEmail(cart.getCustomerEmail(), "Order Ready for Pickup/Delivery", emailBody.toString());
                }

                return ResponseEntity.ok(cart);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MessagingException e) {
            // Log the error and handle it appropriately
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        try {
            cartService.deleteCart(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Log the exception for debugging
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable String id) {
        double total = cartService.calculateTotal(id);
        return ResponseEntity.ok(total);
    }
}
