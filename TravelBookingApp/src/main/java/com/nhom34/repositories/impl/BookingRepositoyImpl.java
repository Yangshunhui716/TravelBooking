/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.repositories.BookingRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author PC
 */
@Repository
@Transactional
public class BookingRepositoyImpl implements BookingRepository{
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Bookings addBooking(Bookings booking) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(booking);
        
        return booking;
    }

    @Override
    public void addBookingDetail(List<BookingsServiceDetail> bookingDetail, Bookings booking) {
        Session s = this.factory.getObject().getCurrentSession();
        for (var b : bookingDetail) {
            b.setBookingId(booking);
            s.persist(b);
        } 
    }

    @Override
    public Bookings getBookingById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Bookings.class, id);
    }

    @Override
    public List<BookingsServiceDetail> getBookingDetailByBookingId(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<BookingsServiceDetail> query = builder.createQuery(BookingsServiceDetail.class);
        Root rBD = query.from(BookingsServiceDetail.class);
        query.where(builder.equal(rBD.get("bookingId").get("id"), id));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public void changePaymentStatus(Long id, String paymentStatus) {
        Session s = this.factory.getObject().getCurrentSession();
        Bookings b = this.getBookingById(id);
        if (!b.getPaymentStatus().equals(paymentStatus)){
            b.setPaymentStatus(paymentStatus);
            s.merge(b);
        }
    }
    
    @Override
    public void changeBookingStatus(Long id, String bookingStatus) {
        Session s = this.factory.getObject().getCurrentSession();
        Bookings b = this.getBookingById(id);
        if (!b.getBookingStatus().equals(bookingStatus)){
            b.setBookingStatus(bookingStatus);
            s.merge(b);
        }
    }

}
