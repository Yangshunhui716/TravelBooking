/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.dto.RequestOrder;
import java.util.List;
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
    List<Bookings> getBookingsByCustomerId(Long customerId);
    List<Object[]> getCustomerByServiceId(Long serviceId);
    boolean checkCustomerPaidService(Long customerId, Long serviceId);
}
