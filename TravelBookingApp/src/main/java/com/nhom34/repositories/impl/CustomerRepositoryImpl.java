package com.nhom34.repositories.impl;

import com.nhom34.pojo.Customers;
import com.nhom34.repositories.CustomerRepository;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
public class CustomerRepositoryImpl implements CustomerRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public Customers addCustomer(Customers newCustomer) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(newCustomer);
        
        return newCustomer;
    }
    
    @Override
    public Customers getCustomerByUserId(Long userId) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Customers.class, userId);
    }

    @Override
    public Customers updatePartial(Map<String, String> params, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        Customers customer = s.get(Customers.class, id);
        if (params.containsKey("fullname")) {
            customer.setFullname(params.get("fullname"));
        }
        if (params.containsKey("gender")) {
            customer.setGender(params.get("gender"));
        }
        s.merge(customer);
        return customer;
    }
}
