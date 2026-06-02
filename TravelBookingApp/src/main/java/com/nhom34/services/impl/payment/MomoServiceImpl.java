/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl.payment;

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
public class MomoServiceImpl implements PaymentService{
    @Autowired
    private MomoConfigs momoConfigs;
    
    @Override
    public String getProviderName() {
        return "MOMO";
    }
    
    @Override
    public String call(String orderId, String amount, String orderInfo) {
        String requestType = "payWithATM";
        String extraData = "";
        
        String uniqueOrderId = orderId + "_" + System.currentTimeMillis();
        
        String rawData = "accessKey=" + momoConfigs.getAccessKey() + 
                         "&amount=" + amount + 
                         "&extraData=" + extraData +
                         "&ipnUrl=" + momoConfigs.getNotifyUrl() + 
                         "&orderId=" + uniqueOrderId + 
                         "&orderInfo=" + orderInfo +
                         "&partnerCode=" + momoConfigs.getPartnerCode() + 
                         "&redirectUrl=" + momoConfigs.getReturnUrl() +
                         "&requestId=" + uniqueOrderId + 
                         "&requestType=" + requestType;

        String signature;
        try {
            signature = MomoUtils.createSignature(rawData, momoConfigs.getSecretKey());
        } catch (Exception ex) {
            System.getLogger(MomoServiceImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
            throw new RuntimeException("Xảy ra lỗi khi tạo signature");
        }

        Map<String, String> body = new HashMap<>();
        body.put("partnerCode", momoConfigs.getPartnerCode());
        body.put("accessKey", momoConfigs.getAccessKey());
        body.put("requestId", uniqueOrderId);
        body.put("amount", amount);
        body.put("orderId", uniqueOrderId);
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

    public boolean verifyNotify(Map<String, Object> payload) {
        try {
            String momoSignature = (String) payload.get("signature");

            String amount = String.valueOf(payload.get("amount"));
            String extraData = payload.get("extraData") != null ? (String) payload.get("extraData") : "";
            String message = (String) payload.get("message");
            String orderId = String.valueOf(payload.get("orderId"));
            String orderInfo = (String) payload.get("orderInfo");
            String orderType = (String) payload.get("orderType");
            String partnerCode = (String) payload.get("partnerCode");
            String payType = (String) payload.get("payType");
            String requestId = String.valueOf(payload.get("requestId"));
            String responseTime = String.valueOf(payload.get("responseTime"));
            String resultCode = String.valueOf(payload.get("resultCode"));
            String transId = String.valueOf(payload.get("transId"));

            String rawData = "accessKey=" + momoConfigs.getAccessKey() +
                             "&amount=" + amount +
                             "&extraData=" + extraData +
                             "&message=" + message +
                             "&orderId=" + orderId +
                             "&orderInfo=" + orderInfo +
                             "&orderType=" + orderType +
                             "&partnerCode=" + partnerCode + 
                             "&payType=" + payType +
                             "&requestId=" + requestId +
                             "&responseTime=" + responseTime +
                             "&resultCode=" + resultCode +
                             "&transId=" + transId;

            String mySignature = MomoUtils.createSignature(rawData, momoConfigs.getSecretKey());
            return mySignature.equals(momoSignature);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
}
