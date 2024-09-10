package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.service.ReservationService;
import com.abc.restaurant.backend.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        try {
            // Set reservation status to "confirmed" before saving
            reservation.setStatus("confirmed");
            Reservation savedReservation = reservationService.addReservation(reservation);

            // Build the email body with reservation details
            StringBuilder textBuilder = new StringBuilder();
            textBuilder.append(String.format("Dear %s,\n\n", savedReservation.getCustomerName()));
            textBuilder.append("Thank you for your reservation at ABC Restaurant. Your reservation has been confirmed.\n\n");

            // Add reservation details
            textBuilder.append(String.format("Reservation Date and Time: %s\n", savedReservation.getDateTime().toString()));
            textBuilder.append(String.format("Facility: %s\n", savedReservation.getFacilityHeading()));
            textBuilder.append(String.format("Number of Guests: %d\n", savedReservation.getGuestsNumber()));

            // Include special requests if available
            if (savedReservation.getSpecialRequests() != null && !savedReservation.getSpecialRequests().isEmpty()) {
                textBuilder.append(String.format("Special Requests: %s\n", savedReservation.getSpecialRequests()));
            }

            // Final note
            textBuilder.append("\nFor any clarification, please contact ABC Restaurant Customer Care.\n\n");
            textBuilder.append("ABC Restaurant Colombo\n");

            // Send email
            String emailBody = textBuilder.toString();
            emailService.sendEmail(savedReservation.getCustomerEmail(), "Reservation Confirmation", emailBody);

            return ResponseEntity.status(201).body(savedReservation);
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        return reservation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        if (reservations.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reservations);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestBody Reservation reservationDetails) {
        try {
            Reservation existingReservation = reservationService.getReservationById(id).orElse(null);
            if (existingReservation != null) {
                // Update reservation details without sending an email
                existingReservation.setDateTime(reservationDetails.getDateTime());
                existingReservation.setFacilityHeading(reservationDetails.getFacilityHeading());
                existingReservation.setGuestsNumber(reservationDetails.getGuestsNumber());
                existingReservation.setSpecialRequests(reservationDetails.getSpecialRequests());

                Reservation updatedReservation = reservationService.updateReservation(id, existingReservation);

                return ResponseEntity.ok(updatedReservation);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
