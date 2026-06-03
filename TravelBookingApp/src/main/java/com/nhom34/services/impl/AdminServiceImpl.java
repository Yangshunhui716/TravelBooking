package com.nhom34.services.impl;

import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.AdminRepository;
import com.nhom34.services.AdminService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
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
