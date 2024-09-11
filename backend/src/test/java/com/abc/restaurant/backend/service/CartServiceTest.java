package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Cart;
import com.abc.restaurant.backend.repository.CartRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @InjectMocks
    private CartService cartService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateCart() {
        Cart cart = new Cart();
        cart.setOrderType("Pickup");
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart createdCart = cartService.createCart(cart);
        assertNotNull(createdCart);
        assertNull(createdCart.getCustomerAddress()); // Address should be null for Pickup
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testCreateCartWithDelivery() {
        Cart cart = new Cart();
        cart.setOrderType("Delivery");
        cart.setCustomerAddress(new Cart.Address("123 Street", "City", "12345", "Country"));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart createdCart = cartService.createCart(cart);
        assertNotNull(createdCart);
        assertNotNull(createdCart.getCustomerAddress()); // Address should be set for Delivery
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testGetCartById() {
        Cart cart = new Cart();
        when(cartRepository.findById(anyString())).thenReturn(Optional.of(cart));

        Optional<Cart> foundCart = cartService.getCartById("1");
        assertTrue(foundCart.isPresent());
        assertEquals(cart, foundCart.get());
    }

    @Test
    void testGetAllCarts() {
        Cart cart1 = new Cart();
        Cart cart2 = new Cart();
        List<Cart> carts = Arrays.asList(cart1, cart2);
        when(cartRepository.findAll()).thenReturn(carts);

        List<Cart> foundCarts = cartService.getAllCarts();
        assertEquals(2, foundCarts.size());
    }

    @Test
    void testUpdateCart() {
        Cart existingCart = new Cart();
        Cart updatedCart = new Cart();
        when(cartRepository.findById(anyString())).thenReturn(Optional.of(existingCart));
        when(cartRepository.save(any(Cart.class))).thenReturn(updatedCart);

        Cart result = cartService.updateCart("1", updatedCart);
        assertNotNull(result);
        verify(cartRepository, times(1)).save(existingCart);
    }

    @Test
    void testDeleteCart() {
        doNothing().when(cartRepository).deleteById(anyString());

        cartService.deleteCart("1");
        verify(cartRepository, times(1)).deleteById("1");
    }

    @Test
    void testCalculateTotal() {
        Cart cart = new Cart();
        Cart.CartItem item1 = new Cart.CartItem("1", "Item1", 2, 10.0);
        Cart.CartItem item2 = new Cart.CartItem("2", "Item2", 1, 20.0);
        cart.setItems(Arrays.asList(item1, item2));
        when(cartRepository.findById(anyString())).thenReturn(Optional.of(cart));

        double total = cartService.calculateTotal("1");
        assertEquals(40.0, total);
    }

    @Test
    void testUpdateCartItemQuantity() {
        Cart cart = new Cart();
        Cart.CartItem item = new Cart.CartItem("1", "Item1", 2, 10.0);
        cart.setItems(Arrays.asList(item));
        when(cartRepository.findById(anyString())).thenReturn(Optional.of(cart));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart updatedCart = cartService.updateCartItemQuantity("1", "1", 5);
        assertNotNull(updatedCart);
        assertEquals(5, updatedCart.getItems().get(0).getQuantity());
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testUpdateCartStatus() {
        Cart cart = new Cart();
        when(cartRepository.findById(anyString())).thenReturn(Optional.of(cart));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart updatedCart = cartService.updateCartStatus("1", "Ready");
        assertNotNull(updatedCart);
        assertEquals("Ready", updatedCart.getStatus());
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testGetConfirmedCartsByCustomerEmail() {
        Cart cart = new Cart();
        cart.setStatus("CONFIRMED");
        List<Cart> carts = Arrays.asList(cart);
        when(cartRepository.findByCustomerEmailAndStatus(anyString(), anyString())).thenReturn(carts);

        List<Cart> confirmedCarts = cartService.getConfirmedCartsByCustomerEmail("customer@example.com");
        assertEquals(1, confirmedCarts.size());
        assertEquals("CONFIRMED", confirmedCarts.get(0).getStatus());
    }
}
