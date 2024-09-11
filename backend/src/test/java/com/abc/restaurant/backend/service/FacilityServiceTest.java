package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Facility;
import com.abc.restaurant.backend.repository.FacilityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class FacilityServiceTest {

    @InjectMocks
    private FacilityService facilityService;

    @Mock
    private FacilityRepository facilityRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddFacility() {
        Facility facility = new Facility("1", "Heading", "Description", "ImageURL", "3pm", "7pm", 50);
        when(facilityRepository.save(facility)).thenReturn(facility);

        Facility createdFacility = facilityService.addFacility(facility);

        assertEquals(facility, createdFacility);
        verify(facilityRepository, times(1)).save(facility);
    }

    @Test
    void testGetFacilityById() {
        Facility facility = new Facility("1", "Heading", "Description", "ImageURL", "3pm", "7pm", 50);
        when(facilityRepository.findById("1")).thenReturn(Optional.of(facility));

        Optional<Facility> foundFacility = facilityService.getFacilityById("1");

        assertEquals(Optional.of(facility), foundFacility);
        verify(facilityRepository, times(1)).findById("1");
    }

    @Test
    void testGetAllFacilities() {
        Facility facility1 = new Facility("1", "Heading1", "Description1", "ImageURL1", "3pm", "7pm", 50);
        Facility facility2 = new Facility("2", "Heading2", "Description2", "ImageURL2", "3pm", "7pm", 50);
        List<Facility> facilities = Arrays.asList(facility1, facility2);
        when(facilityRepository.findAll()).thenReturn(facilities);

        List<Facility> allFacilities = facilityService.getAllFacilities();

        assertEquals(facilities, allFacilities);
        verify(facilityRepository, times(1)).findAll();
    }

    @Test
    void testUpdateFacility() {
        Facility existingFacility = new Facility("1", "Heading1", "Description1", "ImageURL1", "3pm", "7pm", 50);
        Facility updatedFacility = new Facility("1", "Updated Heading", "Updated Description", "Updated ImageURL", "4pm", "8pm", 60);
        when(facilityRepository.existsById("1")).thenReturn(true);
        when(facilityRepository.save(updatedFacility)).thenReturn(updatedFacility);

        Facility result = facilityService.updateFacility("1", updatedFacility);

        assertEquals(updatedFacility, result);
        verify(facilityRepository, times(1)).existsById("1");
        verify(facilityRepository, times(1)).save(updatedFacility);
    }

    @Test
    void testUpdateFacilityNotFound() {
        Facility updatedFacility = new Facility("1", "Updated Heading", "Updated Description", "Updated ImageURL", "4pm", "8pm", 60);
        when(facilityRepository.existsById("1")).thenReturn(false);

        Facility result = facilityService.updateFacility("1", updatedFacility);

        assertNull(result);
        verify(facilityRepository, times(1)).existsById("1");
        verify(facilityRepository, never()).save(any(Facility.class));
    }

    @Test
    void testDeleteFacility() {
        doNothing().when(facilityRepository).deleteById("1");

        facilityService.deleteFacility("1");

        verify(facilityRepository, times(1)).deleteById("1");
    }
}
