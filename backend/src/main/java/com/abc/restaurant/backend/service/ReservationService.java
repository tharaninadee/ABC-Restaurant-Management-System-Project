package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.repository.ReservationRepository;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // Create or Update Reservation
    public Reservation saveReservation(Reservation reservation) {
        // Ensure that necessary fields are set
        if (reservation.getCustomerName() == null || reservation.getDate() == null || reservation.getGuestsNumber() <= 0) {
            throw new IllegalArgumentException("Customer name, date, and guests number are required");
        }
        return reservationRepository.save(reservation);
    }

    // Get All Reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Get Reservation by ID
    public Optional<Reservation> getReservationById(String id) {
        return reservationRepository.findById(id);
    }

    // Delete Reservation by ID
    public void deleteReservation(String id) {
        if (!reservationRepository.existsById(id)) {
            throw new IllegalArgumentException("Reservation with ID " + id + " does not exist");
        }
        reservationRepository.deleteById(id);
    }
}
