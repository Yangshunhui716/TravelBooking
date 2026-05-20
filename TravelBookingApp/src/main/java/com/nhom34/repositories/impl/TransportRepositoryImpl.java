/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import jakarta.persistence.criteria.Order;
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
    public List<TransportServices> getTransportServices(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<TransportServices> q =  b.createQuery(TransportServices.class);
        Root root = q.from(TransportServices.class);
        
        q.select(root);

        List<Order> orders = new ArrayList<>();
        if (params != null) {
            String slot = params.get("slot");
            if (slot != null && !slot.isEmpty()) {
                if (slot.equals("asc"))
                    orders.add(b.asc(root.get("services").get("availableSlots")));
                else
                    orders.add(b.desc(root.get("services").get("availableSlots")));
            }
            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                if (price.equals("asc"))
                    orders.add(b.asc(root.get("services").get("price")));
                else
                    orders.add(b.desc(root.get("services").get("price")));
            }
        }
        if (!orders.isEmpty()) q.orderBy(orders);
        
        Query query = s.createQuery(q);
        return query.getResultList();

    }
    @Override
    public TransportServices getTransportServiceById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(TransportServices.class, id);
    }  

    @Override
    public TransportServices addTransportService(TransportServices transport) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(transport);
        
        return transport;
    }
}
