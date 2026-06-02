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
    public void updateImg(String img, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        Services service;
        if (img!=null){
            service = this.getServiceById(id);
            service.setImgUrl(img);
            service.setUpdatedAt(new Date());
            s.merge(service);
        }
    }

    @Override
    public void updateService(Services service) {
        Session s = this.factory.getObject().getCurrentSession();
        s.merge(service);  
    }
}