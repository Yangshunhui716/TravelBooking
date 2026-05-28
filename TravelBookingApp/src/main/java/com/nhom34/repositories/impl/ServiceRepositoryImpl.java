/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;


import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
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
public class ServiceRepositoryImpl implements ServiceRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Services getServiceById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Services.class, id);
    }

    @Override
    public Services addService(Services service) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(service);
        
        return service;
    }

    @Override
    public void updateStatus(Long id, boolean status) {
        Session s = this.factory.getObject().getCurrentSession();
        Services service = this.getServiceById(id);
        if (service.getStatus()!=status){
            service.setStatus(status);
        }
        s.merge(service);
    }

    @Override
    public boolean checkOwner(Long provId, Long id) {
        Services service = this.getServiceById(id);
        return service.getProviderId().getId().equals(provId);
    }

    @Override
    public void deleteService(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        Services service = this.getServiceById(id);
        
        s.remove(service);
    }

    @Override
    public List<Services> getServicesByProviderId(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Services> query = b.createQuery(Services.class);
        Root root = query.from(Services.class);
        query.where(b.equal(root.get("providerId").get("id"), id));
        Query q = s.createQuery(query);
        
        return q.getResultList();
    }
}