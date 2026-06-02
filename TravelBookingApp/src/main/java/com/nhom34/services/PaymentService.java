package com.nhom34.services;


public interface PaymentService {
    String getProviderName();
    String call(String orderId, String amount, String orderInfo);
}
