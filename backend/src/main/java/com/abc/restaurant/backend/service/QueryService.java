package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.repository.QueryRepository;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // Create or Update Query
    public Query saveQuery(Query query) {
        // Ensure that necessary fields are set
        if (query.getCustomerName() == null || query.getContent() == null) {
            throw new IllegalArgumentException("Customer name and content are required");
        }
        return queryRepository.save(query);
    }

    // Get All Queries
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // Get Query by ID
    public Optional<Query> getQueryById(String id) {
        return queryRepository.findById(id);
    }

    // Delete Query by ID
    public void deleteQuery(String id) {
        if (!queryRepository.existsById(id)) {
            throw new IllegalArgumentException("Query with ID " + id + " does not exist");
        }
        queryRepository.deleteById(id);
    }
}
