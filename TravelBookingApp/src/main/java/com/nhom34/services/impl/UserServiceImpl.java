/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nhom34.repositories.UserRepository;
import com.nhom34.services.UserService;

/**
 *
 * @author QUANG AN
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepo;

    @Override
    public List<Users> getUser() {
        return this.userRepo.getUser();
    }

    @Override
    public List<Users> getUserProvider(List<Providers> p) {
        return this.userRepo.getUserProvider(p);
    }
    
    
}
