package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Offer;
import com.abc.restaurant.backend.repository.OfferRepository;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    // Create or Update Offer
    public Offer saveOffer(Offer offer) {
        // Ensure that all necessary fields are set
        if (offer.getTitle() == null || offer.getDescription() == null) {
            throw new IllegalArgumentException("Title and description are required");
        }
        return offerRepository.save(offer);
    }

    // Get All Offers
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    // Get Offer by ID
    public Optional<Offer> getOfferById(String id) {
        return offerRepository.findById(id);
    }

    // Delete Offer by ID
    public void deleteOffer(String id) {
        if (!offerRepository.existsById(id)) {
            throw new IllegalArgumentException("Offer with ID " + id + " does not exist");
        }
        offerRepository.deleteById(id);
    }
}
