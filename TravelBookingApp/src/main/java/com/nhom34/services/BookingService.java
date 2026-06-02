package com.nhom34.services;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.dto.RequestOrder;
import java.util.List;


public interface BookingService {
    Bookings addBooking(RequestOrder requestPayload, Customers customer);
    Bookings getBookingById(Long id);
    void changePaymentStatus(Long id, String paymentStatus);
    void changeBookingStatus(Long id, String bookingStatus);
    void bookingPaySuccess(String transactionCode, Long id);
    void changeBookingPayMethod(Long id, String payMethod);
    List<Bookings> getBookingsByCustomerId(Long customerId);
    List<Object[]> getCustomerByServiceId(Long serviceId);
    boolean checkCustomerPaidService(Long customerId, Long serviceId);
}
