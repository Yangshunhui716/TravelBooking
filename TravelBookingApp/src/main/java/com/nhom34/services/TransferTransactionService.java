/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Bookings;

/**
 *
 * @author PC
 */
public interface TransferTransactionService {
    void addTransferTransaction(String transactionCode, String status, Long id);
}
