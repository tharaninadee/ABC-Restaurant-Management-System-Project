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

    public Facility addFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Facility updateFacility(String id, Facility facilityDetails) {
        if (facilityRepository.existsById(id)) {
            facilityDetails.setId(id);
            return facilityRepository.save(facilityDetails);
        } else {
            return null;
        }
    }

    public void deleteFacility(String id) {
        facilityRepository.deleteById(id);
    }
}
