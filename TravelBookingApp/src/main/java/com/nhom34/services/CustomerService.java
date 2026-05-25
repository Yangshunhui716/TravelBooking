/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Users;
import java.util.Map;

/**
 *
 * @author QUANG AN
 */
public interface CustomerService {
    Customers addCustomer(Map<String, String> info, Users u);
    Customers getCustomerByUserId(Long userId);
    Customers updateProfile(Map<String, String> params, Long id);
}
