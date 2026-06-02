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
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class BookingRepositoryImpl implements BookingRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<Bookings> getBookingsByCustomerId(Long customerId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery(
            "SELECT DISTINCT b FROM Bookings b " +
            "LEFT JOIN FETCH b.bookingsServiceDetailCollection " +
            "WHERE b.customerId.id = :customerId " +
            "ORDER BY b.id DESC",
            Bookings.class);
        q.setParameter("customerId", customerId);
        return q.getResultList();
    }

    @Override
    public Bookings getBookingById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery(
                "SELECT DISTINCT b FROM Bookings b " +
                "LEFT JOIN FETCH b.bookingsServiceDetailCollection " +
                "WHERE b.id = :id",
                Bookings.class);
        q.setParameter("id", id);
        return (Bookings) q.getSingleResult();
    }
    
    @Override
    public Bookings addBooking(Bookings booking) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(booking);
        
        return booking;
    }

    @Override
    public void addBookingDetails(List<BookingsServiceDetail> bookingDetail, Bookings booking) {
        Session s = this.factory.getObject().getCurrentSession();
        for (var b : bookingDetail) {
            b.setBookingId(booking);
            s.persist(b);
        } 
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
    
    @Override
    public void changeBookingPayMethod(Long id, String payMethod){
        Session s = this.factory.getObject().getCurrentSession();
        Bookings b = this.getBookingById(id);
        if (!b.getPaymentMethod().equals(payMethod)){
            b.setPaymentMethod(payMethod);
            s.merge(b);
        }
    }

    @Override
    public List<Object[]> getCustomerByServiceId(Long serviceId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = builder.createQuery(Object[].class);
        Root rBD = query.from(BookingsServiceDetail.class);
        Join<BookingsServiceDetail, Bookings> join = rBD.join("bookingId", JoinType.LEFT);
        
        query.multiselect(join.get("customerId").get("fullname"), join.get("customerId").get("gender"),
                join.get("customerId").get("users").get("phone"), join.get("customerId").get("users").get("email"),
                join.get("customerId").get("users").get("avatar"));
        query.where(builder.equal(rBD.get("serviceId").get("id"), serviceId));
        query.distinct(true);
        Query q = s.createQuery(query);
        
        return q.getResultList();
    }
    @Override
    public boolean checkCustomerPaidService(Long customerId, Long serviceId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        
        // Gốc từ bảng chi tiết đơn hàng (BookingsServiceDetail)
        Root<BookingsServiceDetail> rBD = query.from(BookingsServiceDetail.class);
        
        // INNER JOIN sang bảng Bookings thông qua thuộc tính "bookingId"
        Join<BookingsServiceDetail, Bookings> joinBooking = rBD.join("bookingId");
        
        // SELECT COUNT(rBD) 
        query.select(builder.count(rBD));
        
        // Điều kiện WHERE: 
        // 1. Đúng customerId
        // 2. Đúng serviceId tương ứng
        // 3. Trạng thái thanh toán phải là "PAID"
        query.where(builder.and(
            builder.equal(joinBooking.get("customerId").get("id"), customerId),
            builder.equal(rBD.get("serviceId").get("id"), serviceId),
            builder.equal(joinBooking.get("paymentStatus"), "PAID")
        ));
        
        Query q = s.createQuery(query);
        Long count = (Long) q.getSingleResult();
        
        return count > 0; // Trả về true nếu đã từng mua và thanh toán thành công
    }
}
