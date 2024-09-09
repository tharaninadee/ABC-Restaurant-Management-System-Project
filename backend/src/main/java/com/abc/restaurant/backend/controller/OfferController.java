package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Offer;
import com.abc.restaurant.backend.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Get all offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    // Get an offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable String id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new offer
    @PostMapping
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer) {
        try {
            Offer savedOffer = offerService.addOffer(offer);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOffer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Update an existing offer by ID
    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable String id, @RequestBody Offer offerDetails) {
        Offer updatedOffer = offerService.updateOffer(id, offerDetails);
        if (updatedOffer != null) {
            return ResponseEntity.ok(updatedOffer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an offer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable String id) {
        try {
            offerService.deleteOffer(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
