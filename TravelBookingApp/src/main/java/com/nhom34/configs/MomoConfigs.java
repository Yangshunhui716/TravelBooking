package com.nhom34.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


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

    public String getPartnerCode() {
        return partnerCode;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public String getNotifyUrl() {
        return notifyUrl;
    }
    
}
