package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(String id) {
        return reservationRepository.findById(id);
    }

    public Reservation addReservation(Reservation reservation) {
        // Set the reservation status to "confirmed" upon creation
        reservation.setStatus("confirmed");
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(String id, Reservation reservationDetails) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();

            // Update reservation fields
            existingReservation.setRestaurantName(reservationDetails.getRestaurantName());
            existingReservation.setFacilityHeading(reservationDetails.getFacilityHeading());
            existingReservation.setCustomerName(reservationDetails.getCustomerName());
            existingReservation.setCustomerEmail(reservationDetails.getCustomerEmail());
            existingReservation.setContactPhone(reservationDetails.getContactPhone());
            existingReservation.setDateTime(reservationDetails.getDateTime());
            existingReservation.setGuestsNumber(reservationDetails.getGuestsNumber());
            existingReservation.setStatus(reservationDetails.getStatus());
            existingReservation.setSpecialRequests(reservationDetails.getSpecialRequests());

            // Save and return updated reservation
            return reservationRepository.save(existingReservation);
        } else {
            // Handle the case where the reservation is not found
            throw new RuntimeException("Reservation not found with id: " + id);
        }
    }

    public void deleteReservation(String id) {
        try {
            reservationRepository.deleteById(id);
        } catch (Exception e) {
            // Log the exception and handle it accordingly
            throw new RuntimeException("Failed to delete reservation with id: " + id, e);
        }
    }
}
