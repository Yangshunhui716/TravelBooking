/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.pojo.RequestOrder;
/**
 *
 * @author PC
 */
public interface BookingService {
    Bookings addBooking(RequestOrder requestPayload, Customers customer);
    Bookings getBookingById(Long id);
    void changePaymentStatus(Long id, String paymentStatus);
    void changeBookingStatus(Long id, String bookingStatus);
    void bookingPaySuccess(String transactionCode, String transStatus, Long id, String paymentStatus, String bookingStatus);
}
