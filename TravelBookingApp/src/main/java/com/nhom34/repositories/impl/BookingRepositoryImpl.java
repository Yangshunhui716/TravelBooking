/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.repositories.BookingRepository;
import jakarta.persistence.Query;
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
    
}
