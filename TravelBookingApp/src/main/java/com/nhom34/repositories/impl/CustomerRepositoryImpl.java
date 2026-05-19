/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Customers;
import com.nhom34.repositories.CustomerRepository;
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
public class CustomerRepositoryImpl implements CustomerRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public Customers getCustomerByUserId(Long userId) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Customers.class, userId);
    }
}
