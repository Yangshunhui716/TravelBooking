package com.nhom34.services;

import java.util.Map;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author PC
 */
public interface PaymentService {
    String callMomo(String orderId, String amount, String orderInfo);
    boolean verifyMomoNotify(Map<String, Object> payload);
}
