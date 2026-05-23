/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.AdminRepository;
import com.nhom34.services.AdminService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author PC
 */
@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminRepository adminRepo;

    @Override
    public Admins addAdmin(Map<String, String> info, Users u) {
        Admins newAdmin = new Admins();
        newAdmin.setId(u.getId());
        newAdmin.setUsers(u);
        
        return this.adminRepo.addAdmin(newAdmin);
    }
    
}
