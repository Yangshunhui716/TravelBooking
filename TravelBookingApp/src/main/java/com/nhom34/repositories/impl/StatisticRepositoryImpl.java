/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.dto.ProviderStatistic;
import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.StatisticRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

/**
 *
 * @author PC
 */
@Repository
public class StatisticRepositoryImpl implements StatisticRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    private void applyServiceTypeFilter(CriteriaBuilder cb, CriteriaQuery<?> query, Join<BookingsServiceDetail, Services> s, String serviceType, List<Predicate> predicates) {
        if (serviceType == null || "all".equals(serviceType)) return;

        Subquery<Integer> subquery = query.subquery(Integer.class);
        Root<?> childRoot = null;

        switch (serviceType) {
            case "hotelRoom" -> childRoot = subquery.from(HotelRoomServices.class);
            case "tour" -> childRoot = subquery.from(TourServices.class);
            case "transport" -> childRoot = subquery.from(TransportServices.class);
        }

        if (childRoot != null) {
            subquery.select(cb.literal(1));
            subquery.where(cb.equal(childRoot.get("serviceId").get("id"), s.get("id")));
            predicates.add(cb.exists(subquery));
        }
    }

    @Override
    public List<ProviderStatistic> getRevenueStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<ProviderStatistic> query = cb.createQuery(ProviderStatistic.class);
        Root<Bookings> b = query.from(Bookings.class);

        Join<Bookings, BookingsServiceDetail> bsd = b.join("bookingsServiceDetailCollection", JoinType.INNER);
        Join<BookingsServiceDetail, Services> s = bsd.join("serviceId", JoinType.INNER);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(b.get("paymentStatus"), "PAID"));
        predicates.add(cb.equal(s.get("providerId").get("id"), providerId));
        
        applyServiceTypeFilter(cb, query, s, serviceType, predicates);

        Expression<Integer> yearExpr = cb.function("YEAR", Integer.class, b.get("createdAt"));
        Expression<Integer> monthExpr = cb.function("MONTH", Integer.class, b.get("createdAt"));
        Expression<Integer> dayExpr = cb.function("DAY", Integer.class, b.get("createdAt"));
        Expression<Integer> quarterExpr = cb.function("QUARTER", Integer.class, b.get("createdAt"));

        predicates.add(cb.equal(yearExpr, year));

        if (null != timePeriod) switch (timePeriod) {
            case "month" -> {
                predicates.add(cb.equal(monthExpr, periodValue));
                query.select(cb.construct(ProviderStatistic.class, dayExpr, cb.sum(bsd.get("subtotal"))));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(dayExpr);
                query.orderBy(cb.asc(dayExpr));
            }
            case "quarter" -> {
                predicates.add(cb.equal(quarterExpr, periodValue)); 
                query.select(cb.construct(ProviderStatistic.class, monthExpr, cb.sum(bsd.get("subtotal"))));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(monthExpr);
                query.orderBy(cb.asc(monthExpr));
            }
            case "year" -> {
                query.select(cb.construct(ProviderStatistic.class, monthExpr, cb.sum(bsd.get("subtotal"))));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(monthExpr);
                query.orderBy(cb.asc(monthExpr));
            }
        }
        return session.createQuery(query).getResultList();
    }

    @Override
    public List<ProviderStatistic> getCustomerStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<ProviderStatistic> query = cb.createQuery(ProviderStatistic.class);
        Root<Bookings> b = query.from(Bookings.class);

        Join<Bookings, BookingsServiceDetail> bsd = b.join("bookingsServiceDetailCollection", JoinType.INNER);
        Join<BookingsServiceDetail, Services> s = bsd.join("serviceId", JoinType.INNER);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(b.get("paymentStatus"), "PAID"));
        predicates.add(cb.equal(s.get("providerId").get("id"), providerId));
        
        applyServiceTypeFilter(cb, query, s, serviceType, predicates);

        Subquery<Date> minDateSubquery = query.subquery(Date.class);
        Root<Bookings> b2 = minDateSubquery.from(Bookings.class);
        Join<Bookings, BookingsServiceDetail> bsd2 = b2.join("bookingsServiceDetailCollection", JoinType.INNER);
        Join<BookingsServiceDetail, Services> s2 = bsd2.join("serviceId", JoinType.INNER);
        
        minDateSubquery.select(cb.least(b2.<Date>get("createdAt")));
        minDateSubquery.where(
            cb.equal(b2.get("customerId").get("id"), b.get("customerId").get("id")),
            cb.equal(s2.get("providerId").get("id"), s.get("providerId").get("id")),
            cb.equal(b2.get("paymentStatus"), "PAID")
        );

        Expression<Long> newCustomerExpr = cb.selectCase()
            .when(cb.equal(b.<Date>get("createdAt"), minDateSubquery), b.get("customerId").get("id"))
            .otherwise(cb.nullLiteral(Long.class))
            .as(Long.class);
        
        Expression<Integer> yearExpr = cb.function("YEAR", Integer.class, b.get("createdAt"));
        Expression<Integer> monthExpr = cb.function("MONTH", Integer.class, b.get("createdAt"));
        Expression<Integer> dayExpr = cb.function("DAY", Integer.class, b.get("createdAt"));
        Expression<Integer> quarterExpr = cb.function("QUARTER", Integer.class, b.get("createdAt"));

        predicates.add(cb.equal(yearExpr, year));

        if (null != timePeriod) switch (timePeriod) {
            case "month" -> {
                predicates.add(cb.equal(monthExpr, periodValue));
                query.select(cb.construct(ProviderStatistic.class, 
                        dayExpr,                                  // Trục thời gian
                        cb.countDistinct(b.get("customerId")),    // Tổng khách
                        cb.countDistinct(newCustomerExpr)         // Khách mới
                ));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(dayExpr);
                query.orderBy(cb.asc(dayExpr));
            }
            case "quarter" -> {
                predicates.add(cb.equal(quarterExpr, periodValue));
                query.select(cb.construct(ProviderStatistic.class, 
                        monthExpr, 
                        cb.countDistinct(b.get("customerId")),
                        cb.countDistinct(newCustomerExpr)
                ));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(monthExpr);
                query.orderBy(cb.asc(monthExpr));
            }
            case "year" -> {
                query.select(cb.construct(ProviderStatistic.class, 
                        monthExpr, 
                        cb.countDistinct(b.get("customerId")),
                        cb.countDistinct(newCustomerExpr)
                ));
                query.where(predicates.toArray(new Predicate[0]));
                query.groupBy(monthExpr);
                query.orderBy(cb.asc(monthExpr));
            }
        }

        return session.createQuery(query).getResultList();
    }
}
