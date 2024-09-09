package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.service.QueryService;
import com.abc.restaurant.backend.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/queries")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @Autowired
    private EmailService emailService;

    // Get all queries
    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        List<Query> queries = queryService.getAllQueries();
        return ResponseEntity.ok(queries);
    }

    // Get a query by ID
    @GetMapping("/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable String id) {
        Optional<Query> query = queryService.getQueryById(id);
        return query.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new query
    @PostMapping
    public ResponseEntity<Query> addQuery(@RequestBody Query query) {
        // Set createdAt to the current time
        query.setCreatedAt(LocalDateTime.now());
        // Do not set resolvedAt, as it's not relevant at creation
        query.setResolvedAt(null);

        Query savedQuery = queryService.addQuery(query);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuery);
    }

    // Update an existing query by ID
    @PutMapping("/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable String id, @RequestBody Query queryDetails) {
        Query existingQuery = queryService.getQueryById(id).orElse(null);
        if (existingQuery == null) {
            return ResponseEntity.notFound().build();
        }

        existingQuery.setResponse(queryDetails.getResponse());
        existingQuery.setStatus(queryDetails.getStatus());
        existingQuery.setStaffUsername(queryDetails.getStaffUsername());

        // Set resolvedAt to the current time if the status is 'resolved'
        if ("resolved".equals(queryDetails.getStatus())) {
            existingQuery.setResolvedAt(LocalDateTime.now());
        }

        Query updatedQuery = queryService.updateQuery(id, existingQuery);

        // Send email notification to the customer if a response is provided
        if (queryDetails.getResponse() != null && !queryDetails.getResponse().isEmpty()) {
            try {
                emailService.sendEmail(
                        existingQuery.getCustomerEmail(),
                        "Your Query Has Been Responded To",
                        "Dear " + existingQuery.getCustomerName() + ",\n\n" +
                                "We have received your query and our response is as follows:\n" +
                                existingQuery.getResponse() + "\n\n" +
                                "Thank you for reaching out to us."
                );
            } catch (MessagingException e) {
                // Log the exception and return a server error response
                e.printStackTrace(); // Or use a logging framework
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        return ResponseEntity.ok(updatedQuery);
    }

    // Delete a query by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuery(@PathVariable String id) {
        try {
            queryService.deleteQuery(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Log the exception and return a server error response
            e.printStackTrace(); // Or use a logging framework
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
