/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;


import com.nhom34.pojo.Providers;
import com.nhom34.repositories.ProviderRepository;
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
public class ProviderRepositoryImpl implements ProviderRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Providers> getProv() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Providers", Providers.class);
        return q.getResultList();
    }  
    
}
