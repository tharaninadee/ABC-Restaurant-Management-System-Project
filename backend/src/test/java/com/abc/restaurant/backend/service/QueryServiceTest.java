package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Query;
import com.abc.restaurant.backend.repository.QueryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class QueryServiceTest {

    @Mock
    private QueryRepository queryRepository;

    @InjectMocks
    private QueryService queryService;

    private Query query;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        query = new Query();
        query.setId("1");
        query.setCustomerName("John Doe");
        query.setCustomerEmail("john.doe@example.com");
        query.setContactPhone("1234567890");
        query.setContent("Sample query content");
        query.setResponse("Sample response");
        query.setStatus("pending");
        query.setStaffUsername("staff1");
        query.setCreatedAt(LocalDateTime.now());
        query.setResolvedAt(null);
    }

    @Test
    void testGetAllQueries() {
        when(queryRepository.findAll()).thenReturn(Arrays.asList(query));

        var queries = queryService.getAllQueries();

        assertNotNull(queries);
        assertEquals(1, queries.size());
        assertEquals("John Doe", queries.get(0).getCustomerName());
    }

    @Test
    void testGetQueryById() {
        when(queryRepository.findById(anyString())).thenReturn(Optional.of(query));

        var result = queryService.getQueryById("1");

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getCustomerName());
    }

    @Test
    void testAddQuery() {
        when(queryRepository.save(any(Query.class))).thenReturn(query);

        query.setCreatedAt(LocalDateTime.now());
        var result = queryService.addQuery(query);

        assertNotNull(result);
        assertEquals("John Doe", result.getCustomerName());
        verify(queryRepository, times(1)).save(query);
    }

    @Test
    void testUpdateQuery() {
        when(queryRepository.findById(anyString())).thenReturn(Optional.of(query));
        when(queryRepository.save(any(Query.class))).thenReturn(query);

        query.setResponse("Updated response");
        query.setStatus("resolved");

        var result = queryService.updateQuery("1", query);

        assertNotNull(result);
        assertEquals("Updated response", result.getResponse());
        assertEquals("resolved", result.getStatus());
        verify(queryRepository, times(1)).save(query);
    }

    @Test
    void testDeleteQuery() {
        when(queryRepository.existsById(anyString())).thenReturn(true);

        queryService.deleteQuery("1");

        verify(queryRepository, times(1)).deleteById("1");
    }

    @Test
    void testUpdateQueryNotFound() {
        when(queryRepository.findById(anyString())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            queryService.updateQuery("1", query);
        });

        assertEquals("Query with ID 1 not found", exception.getMessage());
    }

    @Test
    void testDeleteQueryNotFound() {
        when(queryRepository.existsById(anyString())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            queryService.deleteQuery("1");
        });

        assertEquals("Query with ID 1 not found", exception.getMessage());
    }
}
