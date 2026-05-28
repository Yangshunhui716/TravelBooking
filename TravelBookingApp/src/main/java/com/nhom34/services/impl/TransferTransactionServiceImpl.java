/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.TransferTransactions;
import com.nhom34.repositories.TransferTransactionRepository;
import com.nhom34.services.BookingService;
import com.nhom34.services.TransferTransactionService;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author PC
 */
@Service
public class TransferTransactionServiceImpl implements TransferTransactionService{
    @Autowired
    private TransferTransactionRepository ttRepo;
    @Autowired
    private BookingService bookingService;

    @Override
    @Transactional
    public void addTransferTransaction(String transactionCode, String status, Long id) {
        Bookings b = this.bookingService.getBookingById(id);
        
        TransferTransactions tt = new TransferTransactions();
        tt.setAmount(b.getTotalAmount());
        tt.setStatus(status);
        tt.setTransactionCode(transactionCode);
        tt.setBookingId(b);
        tt.setCreatedAt(new Date());
        tt.setUpdatedAt(new Date());
        
        this.ttRepo.addTransferTransaction(tt);
    }
    
}
