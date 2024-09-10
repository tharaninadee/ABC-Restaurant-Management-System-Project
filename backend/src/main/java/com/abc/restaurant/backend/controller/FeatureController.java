package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Feature;
import com.abc.restaurant.backend.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/features")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {
        Feature createdFeature = featureService.createFeature(feature);
        return ResponseEntity.ok(createdFeature);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable String id) {
        Optional<Feature> feature = featureService.getFeatureById(id);
        return feature.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures() {
        List<Feature> features = featureService.getAllFeatures();
        if (features.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(features);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(@PathVariable String id, @RequestBody Feature updatedFeature) {
        updatedFeature.setId(id);
        Feature feature = featureService.updateFeature(updatedFeature);
        if (feature != null) {
            return ResponseEntity.ok(feature);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable String id) {
        featureService.deleteFeature(id);
        return ResponseEntity.noContent().build();
    }
}
