package com.abc.restaurant.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.abc.restaurant.backend.model.Admin;
import com.abc.restaurant.backend.model.Customer;
import com.abc.restaurant.backend.model.Staff;
import com.abc.restaurant.backend.repository.AdminRepository;
import com.abc.restaurant.backend.repository.CustomerRepository;
import com.abc.restaurant.backend.repository.StaffRepository;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private StaffRepository staffRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveAdmin() {
        Admin admin = new Admin();
        admin.setUsername("admin1");
        admin.setEmail("admin1@example.com");

        when(adminRepository.save(any(Admin.class))).thenReturn(admin);

        Admin savedAdmin = userService.saveAdmin(admin);

        assertNotNull(savedAdmin);
        assertEquals("admin1", savedAdmin.getUsername());
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    public void testGetAllAdmins() {
        Admin admin = new Admin();
        admin.setUsername("admin1");

        when(adminRepository.findAll()).thenReturn(Collections.singletonList(admin));

        assertEquals(1, userService.getAllAdmins().size());
        verify(adminRepository, times(1)).findAll();
    }

    @Test
    public void testGetAdminById() {
        Admin admin = new Admin();
        admin.setUsername("admin1");

        when(adminRepository.findById(anyString())).thenReturn(Optional.of(admin));

        Optional<Admin> foundAdmin = userService.getAdminById("adminId");

        assertTrue(foundAdmin.isPresent());
        assertEquals("admin1", foundAdmin.get().getUsername());
        verify(adminRepository, times(1)).findById("adminId");
    }

    @Test
    public void testUpdateAdmin() {
        Admin admin = new Admin();
        admin.setUsername("admin1");
        admin.setEmail("admin1@example.com");

        when(adminRepository.existsById(anyString())).thenReturn(true);
        when(adminRepository.save(any(Admin.class))).thenReturn(admin);

        Admin updatedAdmin = userService.updateAdmin("adminId", admin);

        assertNotNull(updatedAdmin);
        assertEquals("admin1", updatedAdmin.getUsername());
        verify(adminRepository, times(1)).existsById("adminId");
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    public void testDeleteAdmin() {
        when(adminRepository.existsById(anyString())).thenReturn(true);

        assertDoesNotThrow(() -> userService.deleteAdmin("adminId"));
        verify(adminRepository, times(1)).deleteById("adminId");
    }

    @Test
    public void testAuthenticateAdmin() {
        Admin admin = new Admin();
        admin.setEmail("admin1@example.com");
        admin.setPassword("password");

        when(adminRepository.findByEmail(anyString())).thenReturn(Optional.of(admin));

        Optional<Admin> authenticatedAdmin = userService.authenticateAdmin("admin1@example.com", "password");

        assertTrue(authenticatedAdmin.isPresent());
        assertEquals("admin1@example.com", authenticatedAdmin.get().getEmail());
        verify(adminRepository, times(1)).findByEmail("admin1@example.com");
    }

    @Test
    public void testSignupCustomer() {
        Customer customer = new Customer();
        customer.setEmail("customer1@example.com");
        customer.setUsername("customer1");

        when(customerRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        Customer signedUpCustomer = userService.signupCustomer(customer);

        assertNotNull(signedUpCustomer);
        assertEquals("customer1@example.com", signedUpCustomer.getEmail());
        verify(customerRepository, times(1)).save(customer);
    }

    @Test
    public void testValidateUser_Admin() {
        Admin admin = new Admin();
        admin.setUsername("admin1");
        admin.setEmail("admin1@example.com");

        assertDoesNotThrow(() -> userService.saveAdmin(admin));
    }

    @Test
    public void testValidateUser_Staff() {
        Staff staff = new Staff();
        staff.setUsername("staff1");
        staff.setEmail("staff1@example.com");

        assertDoesNotThrow(() -> userService.saveStaff(staff));
    }

    @Test
    public void testValidateUser_Customer() {
        Customer customer = new Customer();
        customer.setUsername("customer1");
        customer.setEmail("customer1@example.com");

        assertDoesNotThrow(() -> userService.saveCustomer(customer));
    }

    @Test
    public void testValidateUser_Invalid_Admin() {
        Admin admin = new Admin();
        admin.setUsername(null);
        admin.setEmail("admin1@example.com");

        assertThrows(IllegalArgumentException.class, () -> userService.saveAdmin(admin));
    }

    @Test
    public void testValidateUser_Invalid_Staff() {
        Staff staff = new Staff();
        staff.setUsername(null);
        staff.setEmail("staff1@example.com");

        assertThrows(IllegalArgumentException.class, () -> userService.saveStaff(staff));
    }

    @Test
    public void testValidateUser_Invalid_Customer() {
        Customer customer = new Customer();
        customer.setUsername(null);
        customer.setEmail("customer1@example.com");

        assertThrows(IllegalArgumentException.class, () -> userService.saveCustomer(customer));
    }
}
