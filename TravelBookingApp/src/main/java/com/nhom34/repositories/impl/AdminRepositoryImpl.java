/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.repositories.AdminRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

/**
 *
 * @author PC
 */
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
