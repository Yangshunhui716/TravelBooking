/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Services;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.CriteriaUpdate;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Subquery;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class TransportRepositoryImpl implements TransportRepository{
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<TransportServices> getDetailServices(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<TransportServices> q =  b.createQuery(TransportServices.class);
        Root root = q.from(TransportServices.class);
        
        Join<TransportServices, Services> services = root.join("services");
        q.select(root);
        
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(services.get("status"), true));

        List<Order> orders = new ArrayList<>();
        if (params != null) {
            String destination = params.get("destination");
            if (destination != null && !destination.isEmpty()) {
                predicates.add(b.like(services.get("destination"), "%" + destination + "%"));
            }
            
            String departureLocation = params.get("departureLocation");
            if (departureLocation != null && !departureLocation.isEmpty()) {
                predicates.add(b.like(root.get("departureLocation"), "%" + departureLocation + "%"));
            }
            
            String transportType = params.get("transportType");
            if (transportType != null && !transportType.isEmpty()) {
                predicates.add(b.equal(root.get("transportType"), transportType)); 
            }
            
            String departureDateStr = params.get("departureTime");
            if (departureDateStr != null && !departureDateStr.isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date parsedDate = sdf.parse(departureDateStr);

                    Calendar calStart = Calendar.getInstance();
                    calStart.setTime(parsedDate);
                    calStart.set(Calendar.HOUR_OF_DAY, 0);
                    calStart.set(Calendar.MINUTE, 0);
                    calStart.set(Calendar.SECOND, 0);

                    Calendar calEnd = Calendar.getInstance();
                    calEnd.setTime(parsedDate);
                    calEnd.set(Calendar.HOUR_OF_DAY, 23);
                    calEnd.set(Calendar.MINUTE, 59);
                    calEnd.set(Calendar.SECOND, 59);

                    predicates.add(b.between(root.get("departureTime"), calStart.getTime(), calEnd.getTime()));

                } catch (ParseException e) {
                    System.out.println("Lỗi ngày khởi hành: " + e.getMessage());
                }
            }
            
            String slot = params.get("slot");
            if (slot != null && !slot.isEmpty()) {
                if (slot.equals("asc"))
                    orders.add(b.asc(root.get("services").get("availableSlots")));
                if (slot.equals("desc"))
                    orders.add(b.desc(root.get("services").get("availableSlots")));
            }
            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                if (price.equals("asc"))
                    orders.add(b.asc(root.get("services").get("price")));
                if (price.equals("desc"))
                    orders.add(b.desc(root.get("services").get("price")));
            }
        }
        
        q.where(predicates.toArray(new Predicate[0]));
        
        if (!orders.isEmpty()) q.orderBy(orders);
        
        Query query = s.createQuery(q);
        return query.getResultList();

    }
    
    @Override
    public TransportServices getDetailServiceById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(TransportServices.class, id);
    }  

    @Override
    public TransportServices addDetailService(TransportServices transport) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(transport);
        
        return transport;
    }

    @Override
    public TransportServices updatePartial(Map<String, String> params, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        TransportServices serv = this.getDetailServiceById(id);
        
        if(params.containsKey("price")){
            serv.getServices().setPrice(Double.parseDouble(params.get("price")));
        }
        if(params.containsKey("slot")){
            serv.getServices().setAvailableSlots(Integer.parseInt(params.get("slot")));
        }
        if(params.containsKey("description")){
            serv.getServices().setDescription(params.get("description"));
        }
        if(params.containsKey("departureLocation")){
            serv.setDeparture(params.get("departure"));
        }
        if(params.containsKey("endLocation")){
            serv.setLoactionDetail(params.get("locationDetail"));
        }
        
        s.merge(serv);
        return serv;
    }

    @Override
    public void autoUpdateStatusByCheckDate() {
        try {
            Session s = this.factory.getObject().getCurrentSession();
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.MINUTE, 30);
            Date closingTime = cal.getTime();
            

            CriteriaBuilder cb = s.getCriteriaBuilder();
            CriteriaUpdate<Services> update = cb.createCriteriaUpdate(Services.class);
            Root root = update.from(Services.class);
            update.set(root.get("status"), false);
            update.set(root.get("updatedAt"), new Date());

            Subquery<Long> subquery = update.subquery(Long.class);
            Root<TransportServices> transportRoot = subquery.from(TransportServices.class);
            subquery.select(transportRoot.get("services").get("id")); 
            subquery.where(cb.lessThanOrEqualTo(transportRoot.get("departureTime"), closingTime));

            update.where(
                cb.and(root.get("id").in(subquery),cb.equal(root.get("status"), true))
            );

            int rowCount = s.createMutationQuery(update).executeUpdate();

            System.out.println("Đã cập nhật thành công " + rowCount + " Transport Services.");

        } catch (Exception e) {
            System.out.println("Xảy ra lỗi khi chạy Auto Update TourServices: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
