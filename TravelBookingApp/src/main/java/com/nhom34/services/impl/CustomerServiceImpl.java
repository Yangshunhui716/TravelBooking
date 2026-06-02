package com.nhom34.services.impl;

import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.CustomerRepository;
import com.nhom34.repositories.UserRepository;
import com.nhom34.services.CustomerService;
import com.nhom34.services.UserService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;
  
    @Override
    @Transactional
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
    
    @Override
    @Transactional
    public Customers updateProfile(Map<String, String> params, Long id) {
        this.userRepo.updateProfile(params, id);
        return this.customerRepo.updatePartial(params, id);
    }
    
    
}
