package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Feature;
import com.abc.restaurant.backend.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    @Autowired
    private FeatureRepository featureRepository;

    public Feature createFeature(Feature feature) {
        return featureRepository.save(feature);
    }

    public Optional<Feature> getFeatureById(String id) {
        return featureRepository.findById(id);
    }

    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public Feature updateFeature(Feature updatedFeature) {
        if (featureRepository.existsById(updatedFeature.getId())) {
            return featureRepository.save(updatedFeature);
        } else {
            return null;
        }
    }

    public void deleteFeature(String id) {
        featureRepository.deleteById(id);
    }
}
