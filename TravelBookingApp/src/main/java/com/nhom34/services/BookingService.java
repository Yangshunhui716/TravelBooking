package com.nhom34.services;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.dto.RequestOrder;
import java.util.List;


public interface BookingService {
    Bookings addBooking(RequestOrder requestPayload, Customers customer);
    Bookings getBookingById(Long id);
    void changePaymentStatus(Bookings booking, String paymentStatus);
    void changeBookingStatus(Bookings booking, String bookingStatus);
    void bookingPaySuccess(String transactionCode, Bookings booking);
    void changeBookingPayMethod(Bookings booking, String payMethod);
    List<Bookings> getBookingsByCustomerId(Long customerId);
    List<Object[]> getCustomerByServiceId(Long serviceId);
    boolean checkCustomerPaidService(Long customerId, Long serviceId);
    List<Bookings> getBookingsByServiceId(Long serviceId);
}
