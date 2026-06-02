package com.nhom34.controllers;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Users;
import com.nhom34.services.BookingService;
import com.nhom34.services.CustomerService;
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/secure/customer")
@CrossOrigin
public class ApiCustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;
    
    @GetMapping("/profile")
    public ResponseEntity<Customers> getProfile(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        Customers customer = this.customerService.getCustomerByUserId(user.getId());
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
    
    @PatchMapping("/profile")
    public ResponseEntity<Customers> updateProfile(@RequestBody Map<String, String> params, Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        Customers customer = this.customerService.updateProfile(params, user.getId());
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<List<Bookings>> listBookings( Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(  this.bookingService.getBookingsByCustomerId(user.getId()),HttpStatus.OK);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<Bookings> retrieveBooking(@PathVariable(value = "bookingId") Long id, Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        Bookings booking = this.bookingService.getBookingById(id);
        if (booking == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!booking.getCustomerId().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

}
