package com.abc.restaurant.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abc.restaurant.backend.model.Admin;
import com.abc.restaurant.backend.model.Customer;
import com.abc.restaurant.backend.model.Staff;
import com.abc.restaurant.backend.repository.AdminRepository;
import com.abc.restaurant.backend.repository.CustomerRepository;
import com.abc.restaurant.backend.repository.StaffRepository;

@Service
public class UserService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StaffRepository staffRepository;

    // Admin Methods
    public Admin saveAdmin(Admin admin) {
        validateUser(admin);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public void deleteAdmin(String id) {
        if (!adminRepository.existsById(id)) {
            throw new IllegalArgumentException("Admin with ID " + id + " does not exist");
        }
        adminRepository.deleteById(id);
    }

    public Admin updateAdmin(String id, Admin admin) {
        if (!adminRepository.existsById(id)) {
            throw new IllegalArgumentException("Admin with ID " + id + " does not exist");
        }
        admin.setId(id);
        admin.setUpdatedAt(LocalDateTime.now());
        return adminRepository.save(admin);
    }

    // Staff Methods
    public Staff saveStaff(Staff staff) {
        validateUser(staff);
        staff.setCreatedAt(LocalDateTime.now());
        staff.setUpdatedAt(LocalDateTime.now());
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(String id) {
        return staffRepository.findById(id);
    }

    public void deleteStaff(String id) {
        if (!staffRepository.existsById(id)) {
            throw new IllegalArgumentException("Staff with ID " + id + " does not exist");
        }
        staffRepository.deleteById(id);
    }

    public Staff updateStaff(String id, Staff staff) {
        if (!staffRepository.existsById(id)) {
            throw new IllegalArgumentException("Staff with ID " + id + " does not exist");
        }
        staff.setId(id);
        staff.setUpdatedAt(LocalDateTime.now());
        return staffRepository.save(staff);
    }

    // Customer Methods
    public Customer saveCustomer(Customer customer) {
        validateUser(customer);
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public void deleteCustomer(String id) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalArgumentException("Customer with ID " + id + " does not exist");
        }
        customerRepository.deleteById(id);
    }

    public Customer updateCustomer(String id, Customer customer) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalArgumentException("Customer with ID " + id + " does not exist");
        }
        customer.setId(id);
        customer.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(customer);
    }

    // Authentication Methods
    public Optional<Admin> authenticateAdmin(String email, String password) {
        return adminRepository.findByEmail(email)
                .filter(admin -> admin.getPassword().equals(password));
    }

    public Optional<Staff> authenticateStaff(String email, String password) {
        return staffRepository.findByEmail(email)
                .filter(staff -> staff.getPassword().equals(password));
    }

    public Optional<Customer> authenticateCustomer(String email, String password) {
        return customerRepository.findByEmail(email)
                .filter(customer -> customer.getPassword().equals(password));
    }

    // Signup Method
    public Customer signupCustomer(Customer customer) {
        validateUser(customer);
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(customer);
    }

    // Common Validation Method
    private void validateUser(Object user) {
        switch (user) {
            case Admin admin -> {
                if (admin.getUsername() == null || admin.getEmail() == null) {
                    throw new IllegalArgumentException("Username and email are required");
                }
            }
            case Staff staff -> {
                if (staff.getUsername() == null || staff.getEmail() == null) {
                    throw new IllegalArgumentException("Username and email are required");
                }
            }
            case Customer customer -> {
                if (customer.getUsername() == null || customer.getEmail() == null) {
                    throw new IllegalArgumentException("Username and email are required");
                }
            }
            default -> throw new IllegalArgumentException("Unsupported user type");
        }
    }
}
