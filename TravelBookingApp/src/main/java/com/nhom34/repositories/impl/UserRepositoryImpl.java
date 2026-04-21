/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import jakarta.persistence.Query;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.nhom34.repositories.UserRepository;

/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private LocalSessionFactoryBean factory; 
    @Override
    public List<Users> getUser() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users", Users.class);
        return q.getResultList();
    }

    @Override
    public List<Users> getUserProvider(List<Providers> p) {
    return p.stream()
            .map(Providers::getUsers)
            .toList();
    }
    
}
