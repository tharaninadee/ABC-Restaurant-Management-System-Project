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
        // Ensure that the reservation status is set to "pending" initially
        reservation.setStatus("pending");
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
        }
        return null; // Or handle the case where the reservation is not found
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }
}
