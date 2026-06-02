package com.nhom34.repositories;

import com.nhom34.pojo.Customers;
import java.util.Map;

public interface CustomerRepository {
    Customers addCustomer(Customers newCustomer);
    Customers getCustomerByUserId(Long userId);
    Customers updatePartial(Map<String, String> params, Long id);
}
