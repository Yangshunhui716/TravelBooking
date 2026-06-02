package com.nhom34.repositories.impl;

import com.nhom34.pojo.TransferTransactions;
import com.nhom34.repositories.TransferTransactionRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class TransferTransactionRepositoryImpl implements TransferTransactionRepository{
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public void addTransferTransaction(TransferTransactions tt) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(tt);
    }
    
}
