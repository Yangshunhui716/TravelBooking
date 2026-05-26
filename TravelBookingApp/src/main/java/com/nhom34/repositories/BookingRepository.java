/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import java.util.List;

/**
 *
 * @author PC
 */
public interface BookingRepository {
    Bookings addBooking(Bookings booking);
    void addBookingDetail(List<BookingsServiceDetail> bookingDetail, Bookings booking);
    Bookings getBookingById(Long id);
    List<BookingsServiceDetail> getBookingDetailByBookingId(Long id);
    void changePaymentStatus(Long id, String paymentStatus);
    void changeBookingStatus(Long id, String bookingStatus);
}
