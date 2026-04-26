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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author QUANG AN
 */
@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private LocalSessionFactoryBean factory; 
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    

    public UserRepositoryImpl() {
    }
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
    @Override
    public Users getUserById(int id) {
       Session s = this.factory.getObject().getCurrentSession();
       return s.get(Users.class, id);
    }

    @Override
    public void updateActive(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        Users u = this.getUserById(id);
        if (u.getIsActive().equals(Boolean.TRUE) ){
            u.setIsActive(Boolean.FALSE);
        }
        else u.setIsActive(Boolean.TRUE);
        s.merge(u);
    }

    @Override
    public Users getUserByUserName(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query query = s.createNamedQuery("Users.findByUsername", Users.class);
        query.setParameter("username", username);

        return (Users) query.getSingleResult();
    }
    
    @Override
    public Users addUser(Users u) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(u);
        
        return u;
    }
    
    @Override
    public boolean authenticate(String username, String password) {
        Users u = this.getUserByUserName(username);

        return this.passwordEncoder.matches(password, u.getPassword());
    }


    
}
