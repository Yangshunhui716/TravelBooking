package com.nhom34.services;

import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Users;
import java.util.Map;


public interface CustomerService {
    Customers addCustomer(Map<String, String> info, Users u);
    Customers getCustomerByUserId(Long userId);
    Customers getCustomerByUsername(String username);
    Customers updateProfile(Map<String, String> params, Long id);
}
