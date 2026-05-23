/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Customers;

/**
 *
 * @author QUANG AN
 */
public interface CustomerRepository {
    Customers addCustomer(Customers newCustomer);
    Customers getCustomerByUserId(Long userId);
}
