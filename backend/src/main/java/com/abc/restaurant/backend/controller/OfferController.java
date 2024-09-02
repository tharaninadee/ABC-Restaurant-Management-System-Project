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

import com.abc.restaurant.backend.model.Offer;
import com.abc.restaurant.backend.service.OfferService;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Create or Update Offer
    @PostMapping
    public ResponseEntity<Offer> createOrUpdateOffer(@RequestBody Offer offer) {
        try {
            Offer savedOffer = offerService.saveOffer(offer);
            return ResponseEntity.ok(savedOffer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get All Offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    // Get Offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable String id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        if (offer.isPresent()) {
            return ResponseEntity.ok(offer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Offer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable String id) {
        try {
            offerService.deleteOffer(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
