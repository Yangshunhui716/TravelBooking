/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.repositories.BookingRepository;
import com.nhom34.services.BookingService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public List<Bookings> getBookingsByCustomerId(Long customerId) {
        return this.bookingRepo.getBookingsByCustomerId(customerId);
    }

    @Override
    public Bookings getBookingById(Long id) {
        return this.bookingRepo.getBookingById(id);
    }
    
}
