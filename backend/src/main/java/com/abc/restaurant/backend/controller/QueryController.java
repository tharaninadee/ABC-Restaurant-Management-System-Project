package com.abc.restaurant.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.service.QueryService;

@RestController
@RequestMapping("/api/queries")
public class QueryController {

    @Autowired
    private QueryService queryService;

    // Create or Update Query
    @PostMapping
    public ResponseEntity<Query> createOrUpdateQuery(@RequestBody Query query) {
        try {
            Query savedQuery = queryService.saveQuery(query);
            return ResponseEntity.ok(savedQuery);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get All Queries
    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        List<Query> queries = queryService.getAllQueries();
        return ResponseEntity.ok(queries);
    }

    // Get Query by ID
    @GetMapping("/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable String id) {
        Optional<Query> query = queryService.getQueryById(id);
        if (query.isPresent()) {
            return ResponseEntity.ok(query.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Query by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuery(@PathVariable String id) {
        try {
            queryService.deleteQuery(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
