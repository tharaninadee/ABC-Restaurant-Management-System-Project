package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Facility;
import com.abc.restaurant.backend.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {
    @Autowired
    private FacilityRepository facilityRepository;

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public Facility addFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public Facility updateFacility(String id, Facility facilityDetails) {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid facility Id: " + id));
        facility.setHeading(facilityDetails.getHeading());
        facility.setDescription(facilityDetails.getDescription());
        facility.setImage(facilityDetails.getImage());
        facility.setCapacity(facilityDetails.getCapacity());
        return facilityRepository.save(facility);
    }

    public void deleteFacility(String id) {
        facilityRepository.deleteById(id);
    }
}