package com.abc.restaurant.backend.service;

import com.abc.restaurant.backend.model.Reservation;
import com.abc.restaurant.backend.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ReservationServiceTest {

    @InjectMocks
    private ReservationService reservationService;

    @Mock
    private ReservationRepository reservationRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllReservations() {
        Reservation reservation1 = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 4, "confirmed", "None");
        Reservation reservation2 = new Reservation("2", "Restaurant2", "Facility2", "Customer2", "email2@example.com", "0987654321", LocalDateTime.now(), 2, "confirmed", "Window seat");

        List<Reservation> reservations = Arrays.asList(reservation1, reservation2);
        when(reservationRepository.findAll()).thenReturn(reservations);

        List<Reservation> result = reservationService.getAllReservations();

        assertEquals(reservations, result);
        verify(reservationRepository, times(1)).findAll();
    }

    @Test
    void testGetReservationById() {
        Reservation reservation = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 4, "confirmed", "None");
        when(reservationRepository.findById("1")).thenReturn(Optional.of(reservation));

        Optional<Reservation> result = reservationService.getReservationById("1");

        assertEquals(Optional.of(reservation), result);
        verify(reservationRepository, times(1)).findById("1");
    }

    @Test
    void testGetReservationByIdNotFound() {
        when(reservationRepository.findById("1")).thenReturn(Optional.empty());

        Optional<Reservation> result = reservationService.getReservationById("1");

        assertEquals(Optional.empty(), result);
        verify(reservationRepository, times(1)).findById("1");
    }

    @Test
    void testAddReservation() {
        Reservation reservation = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 4, "confirmed", "None");
        when(reservationRepository.save(reservation)).thenReturn(reservation);

        Reservation result = reservationService.addReservation(reservation);

        assertEquals(reservation, result);
        verify(reservationRepository, times(1)).save(reservation);
    }

    @Test
    void testUpdateReservation() {
        Reservation existingReservation = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 4, "confirmed", "None");
        Reservation updatedReservation = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 5, "confirmed", "Window seat");

        when(reservationRepository.findById("1")).thenReturn(Optional.of(existingReservation));
        when(reservationRepository.save(updatedReservation)).thenReturn(updatedReservation);

        Reservation result = reservationService.updateReservation("1", updatedReservation);

        assertEquals(updatedReservation, result);
        verify(reservationRepository, times(1)).findById("1");
        verify(reservationRepository, times(1)).save(updatedReservation);
    }

    @Test
    void testUpdateReservationNotFound() {
        Reservation updatedReservation = new Reservation("1", "Restaurant1", "Facility1", "Customer1", "email1@example.com", "1234567890", LocalDateTime.now(), 5, "confirmed", "Window seat");

        when(reservationRepository.findById("1")).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            reservationService.updateReservation("1", updatedReservation);
        });

        assertEquals("Reservation not found with id: 1", thrown.getMessage());
        verify(reservationRepository, times(1)).findById("1");
        verify(reservationRepository, never()).save(updatedReservation);
    }

    @Test
    void testDeleteReservation() {
        doNothing().when(reservationRepository).deleteById("1");

        reservationService.deleteReservation("1");

        verify(reservationRepository, times(1)).deleteById("1");
    }

    @Test
    void testDeleteReservationException() {
        doThrow(new RuntimeException("Deletion failed")).when(reservationRepository).deleteById("1");

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            reservationService.deleteReservation("1");
        });

        assertEquals("Failed to delete reservation with id: 1", thrown.getMessage());
        verify(reservationRepository, times(1)).deleteById("1");
    }
}
