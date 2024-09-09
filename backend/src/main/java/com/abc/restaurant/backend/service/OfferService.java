package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Offer;
import com.abc.restaurant.backend.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Optional<Offer> getOfferById(String id) {
        return offerRepository.findById(id);
    }

    public Offer addOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public Offer updateOffer(String id, Offer offerDetails) {
        if (offerRepository.existsById(id)) {
            offerDetails.setId(id);
            return offerRepository.save(offerDetails);
        } else {
            return null;
        }
    }

    public void deleteOffer(String id) {
        offerRepository.deleteById(id);
    }
}
