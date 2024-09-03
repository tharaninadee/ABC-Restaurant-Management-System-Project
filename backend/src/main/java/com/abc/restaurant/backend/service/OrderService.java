package com.abc.restaurant.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Order;
import com.abc.restaurant.backend.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Create or Update Order
    public Order saveOrder(Order order) {
        if (order.getCustomerId() == null || order.getFooditemsId() == null) {
            throw new IllegalArgumentException("Customer ID and Fooditems ID are required");
        }
        order.setUpdatedAt(LocalDateTime.now());
        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }
        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get Order by ID
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    // Delete Order by ID
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new IllegalArgumentException("Order with ID " + id + " does not exist");
        }
        orderRepository.deleteById(id);
    }

    // Update Order Status
    public Order updateOrderStatus(String id, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (!optionalOrder.isPresent()) {
            throw new IllegalArgumentException("Order with ID " + id + " does not exist");
        }
        Order order = optionalOrder.get();
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
