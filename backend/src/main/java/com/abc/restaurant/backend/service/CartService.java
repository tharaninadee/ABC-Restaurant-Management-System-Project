package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Cart;
import com.abc.restaurant.backend.model.Cart.CartItem;
import com.abc.restaurant.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Create a new cart
    public Cart createCart(Cart cart) {
        // Validate address based on order type
        if ("Delivery".equalsIgnoreCase(cart.getOrderType()) && cart.getCustomerAddress() == null) {
            throw new IllegalArgumentException("Address is required for delivery orders.");
        }
        // If Pickup, ensure the address is null
        if ("Pickup".equalsIgnoreCase(cart.getOrderType())) {
            cart.setCustomerAddress(null);
        }

        // Order ID is autogenerated, no need to set order number
        return cartRepository.save(cart);
    }

    // Get cart by ID
    public Optional<Cart> getCartById(String id) {
        return cartRepository.findById(id);
    }

    // Get all carts
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // Update a cart
    public Cart updateCart(Cart cart) {
        // Validate address based on order type
        if ("Delivery".equalsIgnoreCase(cart.getOrderType()) && cart.getCustomerAddress() == null) {
            throw new IllegalArgumentException("Address is required for delivery orders.");
        }
        // If Pickup, ensure the address is null
        if ("Pickup".equalsIgnoreCase(cart.getOrderType())) {
            cart.setCustomerAddress(null);
        }

        return cartRepository.save(cart);
    }

    // Delete a cart by ID
    public void deleteCart(String id) {
        cartRepository.deleteById(id);
    }

    // Calculate the total price for a cart
    public double calculateTotal(String cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            return cart.getItems().stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
        }
        return 0.0;
    }

    // Update quantity of a specific item in the cart
    public Cart updateCartItemQuantity(String cartId, String itemId, int newQuantity) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            for (CartItem item : cart.getItems()) {
                if (item.getItemId().equals(itemId)) {
                    item.setQuantity(newQuantity);
                    break;
                }
            }
            cart.setTotal(calculateTotal(cartId)); // Update total price of the cart
            return cartRepository.save(cart);
        }
        return null;
    }

    // Update the status or other fields of a cart
    public Cart updateCart(String id, Cart updatedCart) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isPresent()) {
            Cart existingCart = optionalCart.get();

            // Update the fields of the existing cart with new values
            existingCart.setStatus(updatedCart.getStatus());
            existingCart.setCustomerName(updatedCart.getCustomerName());
            existingCart.setCustomerPhone(updatedCart.getCustomerPhone());
            existingCart.setCustomerEmail(updatedCart.getCustomerEmail());
            existingCart.setItems(updatedCart.getItems());
            existingCart.setOrderType(updatedCart.getOrderType());
            existingCart.setOutlet(updatedCart.getOutlet());
            existingCart.setTotal(updatedCart.getTotal());
            existingCart.setSpecialNote(updatedCart.getSpecialNote()); // Update special note

            // Validate address based on order type
            if ("Delivery".equalsIgnoreCase(updatedCart.getOrderType()) && updatedCart.getCustomerAddress() == null) {
                throw new IllegalArgumentException("Address is required for delivery orders.");
            }
            // If Pickup, ensure the address is null
            if ("Pickup".equalsIgnoreCase(updatedCart.getOrderType())) {
                existingCart.setCustomerAddress(null);
            } else {
                existingCart.setCustomerAddress(updatedCart.getCustomerAddress()); // Set address for delivery
            }

            // Save and return the updated cart
            return cartRepository.save(existingCart);
        } else {
            return null; // Cart not found
        }
    }

    // Get confirmed carts by customer email
    public List<Cart> getConfirmedCartsByCustomerEmail(String customerEmail) {
        return cartRepository.findByCustomerEmailAndStatus(customerEmail, "CONFIRMED");
    }

    // Update cart status by cart ID
    public Cart updateCartStatus(String cartId, String status) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.setStatus(status);
            return cartRepository.save(cart);
        }
        return null;
    }
}
