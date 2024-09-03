package com.abc.restaurant.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.repository.ReservationRepository;

import jakarta.mail.MessagingException;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private EmailService emailService;  // Inject EmailService

    // Create or Update Reservation
    public Reservation saveReservation(Reservation reservation) {
        // Ensure that necessary fields are set
        if (reservation.getCustomerName() == null || reservation.getDate() == null || reservation.getGuestsNumber() <= 0) {
            throw new IllegalArgumentException("Customer name, date, and guests number are required");
        }
        Reservation savedReservation = reservationRepository.save(reservation);
        sendReservationConfirmationEmail(savedReservation); // Send email upon saving
        return savedReservation;
    }

    // Send reservation confirmation email
    private void sendReservationConfirmationEmail(Reservation reservation) {
        StringBuilder textBuilder = new StringBuilder();
        textBuilder.append(String.format("Thank you for your reservation at ABC Restaurant, %s.\n\n", reservation.getCustomerName()));
        textBuilder.append(String.format("Reservation Details:\n"));
        textBuilder.append(String.format("Date: %s\n", reservation.getDate()));
        textBuilder.append(String.format("Time: %s\n", reservation.getTime()));
        textBuilder.append(String.format("Number of Guests: %d\n", reservation.getGuestsNumber()));
        textBuilder.append(String.format("Special Requests: %s\n\n", reservation.getSpecialRequests()));
        textBuilder.append("For any clarification, please call the ABC Restaurant Front Desk.\n\n");
        textBuilder.append("ABC RESTAURANT \n");
        textBuilder.append("Telephone No: 0112744588");

        String emailBody = textBuilder.toString();
        try {
            emailService.sendEmail(reservation.getCustomerEmail(), "Reservation Confirmation", emailBody);
        } catch (MessagingException e) {
            // Handle email sending error
            System.err.println("Failed to send reservation confirmation email: " + e.getMessage());
        }
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
