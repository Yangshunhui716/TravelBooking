package com.nhom34.repositories.impl;


import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
import java.util.Date;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


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
    public void deleteService(Services service) {
        Session s = this.factory.getObject().getCurrentSession();
        s.remove(service);
    }

    @Override
    public void updateService(Services service) {
        Session s = this.factory.getObject().getCurrentSession();
        service.setUpdatedAt(new Date());
        s.merge(service);  
    }
}