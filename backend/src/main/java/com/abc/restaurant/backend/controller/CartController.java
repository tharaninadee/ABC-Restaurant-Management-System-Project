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
            Cart createdCart = cartService.createCart(cart);

            // Build the email body with detailed cart information
            StringBuilder textBuilder = new StringBuilder();
            textBuilder.append(String.format("Thank you for your order with ABC Restaurant, %s.\n\n", cart.getUserEmail()));
            textBuilder.append("Your order is confirmed.\n\n");

            // Iterate over the items in the cart and append details
            for (Cart.CartItem item : createdCart.getItems()) {
                textBuilder.append(String.format("Item: %s\n", item.getName()));
                textBuilder.append(String.format("Quantity: %d\n", item.getQuantity()));
                textBuilder.append(String.format("Unit Price: Rs. %.2f\n", item.getPrice()));
                textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", item.getTotal()));
            }

            // Add overall total price
            double total = createdCart.getItems().stream().mapToDouble(Cart.CartItem::getTotal).sum();
            textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", total));

            // Add selected options
            textBuilder.append(String.format("Options:\n"));
            textBuilder.append(String.format("Outlet: %s\n", createdCart.getOutlet()));
            textBuilder.append(String.format("Delivery/Takeaway: %s\n", createdCart.getOption()));

            textBuilder.append("\nFor any clarification, please call the ABC Restaurant Front Desk.\n\n");
            textBuilder.append("ABC RESTAURANT \n");
            textBuilder.append("Telephone No: 0112744588");

            String emailBody = textBuilder.toString();

            // Send confirmation email
            emailService.sendEmail(cart.getUserEmail(), "Order Confirmation", emailBody);

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
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart updatedCart) {
        try {
            Cart cart = cartService.updateCart(id, updatedCart);
            if (cart != null) {
                // After successfully updating, check the status
                if ("Ready".equalsIgnoreCase(cart.getStatus())) {
                    // Construct the email body for confirmed status
                    String emailBody = String.format(
                            "Thank you for your order with ABC Restaurant,\n\n" +
                                    "Your order is ready at the outlet.\n\n" +
                                    "Outlet: %s\n\n" +
                                    "For any clarification, please call the ABC Restaurant Front Desk.\n\n" +
                                    "ABC RESTAURANT \n" +
                                    "Telephone No: 0112744588",
                            cart.getOutlet()
                    );

                    // Send the email for confirmed order
                    emailService.sendEmail(
                            cart.getUserEmail(),
                            "Order is Ready",
                            emailBody
                    );
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

    @PostMapping("/temp")
    public ResponseEntity<Cart> saveTempCart(@RequestBody Cart cart) {
        Cart savedCart = cartService.saveTempCart(cart);
        return ResponseEntity.ok(savedCart);
    }

    @GetMapping("/temp")
    public ResponseEntity<Cart> getTempCart(@RequestParam String userEmail) {
        Cart tempCart = cartService.getTempCart(userEmail);
        return tempCart != null ? ResponseEntity.ok(tempCart) : ResponseEntity.notFound().build();
    }
}
