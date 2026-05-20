/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.TourRepository;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class TourRepositoryImpl implements TourRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<TourServices> getTourServices(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b= s.getCriteriaBuilder();
        CriteriaQuery<TourServices> q = b.createQuery(TourServices.class);
        Root root = q.from(TourServices.class);
        q.select(root);
        
        List<Order> orders = new ArrayList<>();
        if(params != null){
            String slot = params.get("slot");
            if(slot !=null && !slot.isEmpty()){
                if(slot.equals("asc")){orders.add(b.asc(root.get("services").get("availableSlots")));}
                else {
                    orders.add(b.desc(root.get("services").get("availableSlots")));
                }
            }
            String price = params.get("price");
            if(price!=null &&!price.isEmpty()){
                if(price.equals("asc")){orders.add(b.asc(root.get("services").get("price"))); }
                else
                {
                    orders.add(b.desc(root.get("services").get("price")));
                }
            }
        }
        if(!orders.isEmpty()) q.orderBy(orders);
        Query query = s.createQuery(q);
        return query.getResultList();
    }
    
    @Override
    public TourServices getTourServiceById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(TourServices.class, id);
    }   

    @Override
    public TourServices addTourService(TourServices tour) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(tour);
        
        return tour;
    }
}
