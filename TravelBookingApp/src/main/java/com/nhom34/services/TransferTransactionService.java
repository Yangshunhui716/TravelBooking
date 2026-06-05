package com.nhom34.services;

import com.nhom34.pojo.Bookings;


public interface TransferTransactionService {
    void addTransferTransaction(String transactionCode, String status, Bookings booking);
}
