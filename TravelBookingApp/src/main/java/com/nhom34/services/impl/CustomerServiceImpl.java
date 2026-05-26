/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.CustomerRepository;
import com.nhom34.services.CustomerService;
import com.nhom34.services.UserService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepo;
    @Autowired
    private UserService userService;
    
    @Override
    public Customers addCustomer(Map<String, String> info, Users u) {
        Customers newCustomer = new Customers();
        newCustomer.setId(u.getId());
        newCustomer.setUsers(u);
        newCustomer.setGender(info.get("gender"));
        newCustomer.setFullname(info.get("fullname"));
        
        return this.customerRepo.addCustomer(newCustomer);
    }

    @Override
    public Customers getCustomerByUserId(Long userId) {
        return this.customerRepo.getCustomerByUserId(userId);
    }

    @Override
    public Customers getCustomerByUsername(String username) {
        return this.customerRepo.getCustomerByUserId(this.userService.getUserByUsername(username).getId());
    }
}
