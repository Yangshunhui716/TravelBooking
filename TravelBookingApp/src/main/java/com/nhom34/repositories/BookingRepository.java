package com.nhom34.repositories;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import java.util.List;

public interface BookingRepository {
    Bookings addBooking(Bookings booking);
    void addBookingDetails(List<BookingsServiceDetail> bookingDetail, Bookings booking);
    Bookings getBookingById(Long id);
    List<BookingsServiceDetail> getBookingDetailByBookingId(Long id);
    void updateBooking(Bookings booking);
    List<Bookings> getBookingsByCustomerId(Long customerId);
    List<Object[]> getCustomerByServiceId(Long serviceId);
    boolean checkCustomerPaidService(Long customerId, Long serviceId);
    List<Bookings> getBookingsByServiceId(Long serviceId);
}
