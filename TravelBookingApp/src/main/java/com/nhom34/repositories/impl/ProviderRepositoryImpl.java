/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;


import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.ProviderRepository;
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
 * @author QUANG AN
 */
@Repository
@Transactional
public class ProviderRepositoryImpl implements ProviderRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<Providers> getProv() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Providers", Providers.class);
        return q.getResultList();
    }  

    @Override
    public List<Users> getProvUser(List<Providers> p) {
        return p.stream().map(Providers::getUsers).toList();
    }

    @Override
    public List<TransportServices> getTransportServices(Long provId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<TransportServices> query = builder.createQuery(TransportServices.class);
        Root rTS = query.from(TransportServices.class);
        query.where(builder.equal(rTS.get("services").get("providerId").get("id"), provId));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<HotelRoomServices> getHotelRoomServices(Long provId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<HotelRoomServices> query = builder.createQuery(HotelRoomServices.class);
        Root rTS = query.from(TransportServices.class);
        query.where(builder.equal(rTS.get("services").get("providerId").get("id"), provId));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<TourServices> getTourServices(Long provId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<TourServices> query = builder.createQuery(TourServices.class);
        Root rTS = query.from(TransportServices.class);
        query.where(builder.equal(rTS.get("services").get("providerId").get("id"), provId));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public Providers getProvById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Providers.class, id);
    }
    
}
