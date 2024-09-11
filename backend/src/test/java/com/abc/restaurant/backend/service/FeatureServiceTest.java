package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Feature;
import com.abc.restaurant.backend.repository.FeatureRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FeatureServiceTest {

    @Mock
    private FeatureRepository featureRepository;  // Mocking the repository

    @InjectMocks
    private FeatureService featureService;  // Injecting the mock into the service

    private Feature feature;

    @BeforeEach
    public void setUp() {
        // Initialize the mocks and test data
        MockitoAnnotations.openMocks(this);
        feature = new Feature("1", "Swimming Pool", "/images/pool.jpg", "A luxurious pool");
    }

    @Test
    public void testCreateFeature() {
        // Mock the repository save method
        when(featureRepository.save(any(Feature.class))).thenReturn(feature);

        // Call the service method
        Feature createdFeature = featureService.createFeature(feature);

        // Verify the result and behavior
        assertNotNull(createdFeature);
        assertEquals("Swimming Pool", createdFeature.getName());
        verify(featureRepository, times(1)).save(feature);
    }

    @Test
    public void testGetFeatureById() {
        // Mock the repository findById method
        when(featureRepository.findById("1")).thenReturn(Optional.of(feature));

        // Call the service method
        Optional<Feature> foundFeature = featureService.getFeatureById("1");

        // Verify the result and behavior
        assertTrue(foundFeature.isPresent());
        assertEquals("Swimming Pool", foundFeature.get().getName());
        verify(featureRepository, times(1)).findById("1");
    }

    @Test
    public void testGetAllFeatures() {
        // Mock the repository findAll method
        Feature feature2 = new Feature("2", "Gym", "/images/gym.jpg", "A modern gym");
        when(featureRepository.findAll()).thenReturn(Arrays.asList(feature, feature2));

        // Call the service method
        List<Feature> features = featureService.getAllFeatures();

        // Verify the result and behavior
        assertEquals(2, features.size());
        verify(featureRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateFeature() {
        // Mock the repository existsById and save methods
        when(featureRepository.existsById("1")).thenReturn(true);
        feature.setDescription("Updated Pool");
        when(featureRepository.save(any(Feature.class))).thenReturn(feature);

        // Call the service method
        Feature updatedFeature = featureService.updateFeature(feature);

        // Verify the result and behavior
        assertEquals("Updated Pool", updatedFeature.getDescription());
        verify(featureRepository, times(1)).save(feature);
    }

    @Test
    public void testDeleteFeature() {
        // Mock the repository deleteById method
        doNothing().when(featureRepository).deleteById("1");

        // Call the service method
        featureService.deleteFeature("1");

        // Verify the behavior
        verify(featureRepository, times(1)).deleteById("1");
    }
}
