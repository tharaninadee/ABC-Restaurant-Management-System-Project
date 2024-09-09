package com.abc.restaurant.backend.controller;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.service.ReservationService;
import com.abc.restaurant.backend.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        return reservation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
        try {
            Reservation savedReservation = reservationService.addReservation(reservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
        } catch (Exception e) {
            // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestBody Reservation reservationDetails) {
        try {
            Reservation updatedReservation = reservationService.updateReservation(id, reservationDetails);
            if (updatedReservation != null) {
                if ("confirmed".equalsIgnoreCase(updatedReservation.getStatus())) {
                    sendConfirmationEmail(updatedReservation);
                }
                return ResponseEntity.ok(updatedReservation);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private void sendConfirmationEmail(Reservation reservation) throws MessagingException {
        String subject = "Reservation Confirmation";
        String message = String.format(
                "Dear %s,\n\nYour reservation at %s for the %s facility has been confirmed.\n\n" +
                        "Date and Time: %s\n" +
                        "Number of Guests: %d\n" +
                        "Special Requests: %s\n\n" +
                        "Thank you for choosing us.\n\n" +
                        "Best regards,\n" +
                        "The Team",
                reservation.getCustomerName(),
                reservation.getRestaurantName(),
                reservation.getFacilityHeading(),
                reservation.getDateTime().toString(),
                reservation.getGuestsNumber(),
                reservation.getSpecialRequests()
        );

        emailService.sendEmail(reservation.getCustomerEmail(), subject, message);
    }
}
