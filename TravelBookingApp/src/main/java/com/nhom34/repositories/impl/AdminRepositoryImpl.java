package com.nhom34.repositories.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.repositories.AdminRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class AdminRepositoryImpl implements AdminRepository{
    @Autowired
    private LocalSessionFactoryBean factory; 

    @Override
    public Admins addAdmin(Admins newAdmin) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(newAdmin);
        
        return newAdmin;
    }
    
}
