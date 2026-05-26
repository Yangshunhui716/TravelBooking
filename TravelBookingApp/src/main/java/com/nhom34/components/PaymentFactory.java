/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.components;

import com.nhom34.services.PaymentService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author PC
 */
@Component
public class PaymentFactory {
    private final Map<String, PaymentService> providers = new HashMap<>();

    @Autowired
    public PaymentFactory(List<PaymentService> providerList) {
        for (PaymentService provider : providerList) {
            providers.put(provider.getProviderName(), provider);
        }
    }

    public PaymentService getMethod(String methodName) {
        PaymentService provider = providers.get(methodName.toUpperCase());
        if (provider == null) {
            throw new IllegalArgumentException("Phương thức thanh toán không được hỗ trợ");
        }
        return provider;
    }
}
