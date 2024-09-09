package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // Get all queries
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // Get a query by ID
    public Optional<Query> getQueryById(String id) {
        return queryRepository.findById(id);
    }

    // Add a new query
    public Query addQuery(Query query) {
        query.setCreatedAt(LocalDateTime.now()); // Set creation date
        query.setResolvedAt(null); // Ensure resolvedAt is null when creating a new query
        return queryRepository.save(query);
    }

    // Update an existing query
    public Query updateQuery(String id, Query queryDetails) {
        Optional<Query> existingQueryOpt = queryRepository.findById(id);
        if (existingQueryOpt.isPresent()) {
            Query existingQuery = existingQueryOpt.get();
            existingQuery.setCustomerName(queryDetails.getCustomerName());
            existingQuery.setCustomerEmail(queryDetails.getCustomerEmail());
            existingQuery.setContactPhone(queryDetails.getContactPhone());
            existingQuery.setContent(queryDetails.getContent());
            existingQuery.setResponse(queryDetails.getResponse());
            existingQuery.setStatus(queryDetails.getStatus());
            existingQuery.setStaffUsername(queryDetails.getStaffUsername());

            // Set resolvedAt to the current time if the status is 'resolved'
            if ("resolved".equals(queryDetails.getStatus())) {
                existingQuery.setResolvedAt(LocalDateTime.now());
            }

            return queryRepository.save(existingQuery);
        } else {
            throw new RuntimeException("Query with ID " + id + " not found");
            // Alternatively, you can throw a custom exception here
        }
    }

    // Delete a query by ID
    public void deleteQuery(String id) {
        // You might want to check if the query exists before attempting to delete
        if (queryRepository.existsById(id)) {
            queryRepository.deleteById(id);
        } else {
            throw new RuntimeException("Query with ID " + id + " not found");
            // Alternatively, you can throw a custom exception here
        }
    }
}
