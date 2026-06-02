/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 *
 * @author PC
 */
@Configuration
@PropertySource("classpath:payments.properties")
public class MomoConfigs {
    @Value("${momo.partnerCode}")
    private String partnerCode;
    
    @Value("${momo.accessKey}")
    private String accessKey;
    
    @Value("${momo.secretKey}")
    private String secretKey;
    
    @Value("${momo.endpoint}")
    private String endpoint;
    
    @Value("${momo.returnUrl}")
    private String returnUrl;
    
    @Value("${momo.notifyUrl}")
    private String notifyUrl;

    /**
     * @return the partnerCode
     */
    public String getPartnerCode() {
        return partnerCode;
    }

    /**
     * @return the accessKey
     */
    public String getAccessKey() {
        return accessKey;
    }

    /**
     * @return the secretKey
     */
    public String getSecretKey() {
        return secretKey;
    }

    /**
     * @return the endpoint
     */
    public String getEndpoint() {
        return endpoint;
    }

    /**
     * @return the returnUrl
     */
    public String getReturnUrl() {
        return returnUrl;
    }

    /**
     * @return the notifyUrl
     */
    public String getNotifyUrl() {
        return notifyUrl;
    }
    
}
