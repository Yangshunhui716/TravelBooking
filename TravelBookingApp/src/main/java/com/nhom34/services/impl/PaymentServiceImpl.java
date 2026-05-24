/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.configs.MomoConfigs;
import com.nhom34.services.PaymentService;
import com.nhom34.utils.MomoUtils;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author PC
 */
@Service
public class PaymentServiceImpl implements PaymentService{
    @Autowired
    private MomoConfigs momoConfigs;
    
    @Override
    public String callMomo(String orderId, String amount, String orderInfo) {
        String requestType = "captureWallet";
        String extraData = "";
        String rawData = "accessKey=" + momoConfigs.getAccessKey() + 
                         "&amount=" + amount + 
                         "&extraData=" + extraData +
                         "&ipnUrl=" + momoConfigs.getNotifyUrl() + 
                         "&orderId=" + orderId + 
                         "&orderInfo=" + orderInfo +
                         "&partnerCode=" + momoConfigs.getPartnerCode() + 
                         "&redirectUrl=" + momoConfigs.getReturnUrl() +
                         "&requestId=" + orderId + 
                         "&requestType=" + requestType;

        String signature;
        try {
            signature = MomoUtils.createSignature(rawData, momoConfigs.getSecretKey());
        } catch (Exception ex) {
            System.getLogger(PaymentServiceImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
            throw new RuntimeException("Xảy ra lỗi khi tạo signature");
        }

        Map<String, String> body = new HashMap<>();
        body.put("partnerCode", momoConfigs.getPartnerCode());
        body.put("accessKey", momoConfigs.getAccessKey());
        body.put("requestId", orderId);
        body.put("amount", amount);
        body.put("orderId", orderId);
        body.put("orderInfo", orderInfo);
        body.put("redirectUrl", momoConfigs.getReturnUrl());
        body.put("ipnUrl", momoConfigs.getNotifyUrl());
        body.put("extraData", extraData);
        body.put("requestType", requestType);
        body.put("lang", "vi");
        body.put("signature", signature);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        Map<String, Object> response = restTemplate.postForObject(momoConfigs.getEndpoint(), entity, Map.class);

        if (response != null && response.containsKey("payUrl")) {
            return (String) response.get("payUrl");
        }
        else{
            throw new RuntimeException("Không thể tạo giao dịch MoMo");
        }
    }

    @Override
    public boolean verifyMomoNotify(Map<String, Object> payload) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
