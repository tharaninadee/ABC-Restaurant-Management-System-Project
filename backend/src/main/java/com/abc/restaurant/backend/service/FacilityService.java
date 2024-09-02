package com.abc.restaurant.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Facility;
import com.abc.restaurant.backend.repository.FacilityRepository;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    // Create or Update Facility
    public Facility saveFacility(Facility facility) {
        // Ensure that necessary fields are set
        if (facility.getName() == null || facility.getDescription() == null) {
            throw new IllegalArgumentException("Name and description are required");
        }
        // Set timestamps
        if (facility.getId() == null) {
            facility.setCreatedAt(LocalDateTime.now());
        }
        facility.setUpdatedAt(LocalDateTime.now());
        return facilityRepository.save(facility);
    }

    // Get All Facilities
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    // Get Facility by ID
    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    // Delete Facility by ID
    public void deleteFacility(String id) {
        if (!facilityRepository.existsById(id)) {
            throw new IllegalArgumentException("Facility with ID " + id + " does not exist");
        }
        facilityRepository.deleteById(id);
    }
}
