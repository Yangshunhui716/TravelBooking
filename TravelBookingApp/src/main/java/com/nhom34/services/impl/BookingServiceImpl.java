/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.pojo.Customers;
import com.nhom34.pojo.RequestOrder;
import com.nhom34.pojo.OrderServices;
import com.nhom34.repositories.BookingRepository;
import com.nhom34.services.BookingService;
import com.nhom34.services.TransferTransactionService;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author PC
 */
@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    private BookingRepository bookingRepo;
    @Autowired
    private TransferTransactionService ttService;

    @Override
    @Transactional
    public Bookings addBooking(RequestOrder requestPayload, Customers customer) {
        List<OrderServices> bookingDetails = requestPayload.getBooking();
        List<BookingsServiceDetail> booking = new ArrayList<>();
        double total = 0;
        for(OrderServices o: bookingDetails){
            BookingsServiceDetail detail = new BookingsServiceDetail();
            detail.setQuantity(o.getQuantity());
            detail.setUnitPrice(o.getUnitPrice());
            detail.setSubtotal(o.getUnitPrice()*o.getQuantity());
            total += detail.getSubtotal();
        }
        
        Bookings newBooking = new Bookings();
        newBooking.setBookingStatus("PENDING");
        newBooking.setPaymentStatus("UNPAID");
        newBooking.setPaymentMethod(requestPayload.getPayMethod());
        newBooking.setTotalAmount(total);
        newBooking.setCreatedAt(new Date());
        newBooking.setUpdatedAt(new Date());
        newBooking.setCustomerId(customer);
        newBooking = this.bookingRepo.addBooking(newBooking);
        
        this.bookingRepo.addBookingDetail(booking, newBooking);
        
        return newBooking;
    }

    @Override
    public Bookings getBookingById(Long id) {
        return this.bookingRepo.getBookingById(id);
    }

    @Override
    public void changePaymentStatus(Long id, String paymentStatus) {
        this.bookingRepo.changePaymentStatus(id, paymentStatus);
    }

    @Override
    public void changeBookingStatus(Long id, String bookingStatus) {
        this.bookingRepo.changeBookingStatus(id, bookingStatus);
    }

    @Override
    @Transactional
    public void bookingPaySuccess(String transactionCode, String transStatus, Long id, String paymentStatus, String bookingStatus) {
        this.ttService.addTransferTransaction(transactionCode, transStatus, id);
        this.bookingRepo.changePaymentStatus(id, paymentStatus);
        this.bookingRepo.changeBookingStatus(id, bookingStatus);
    }
}
