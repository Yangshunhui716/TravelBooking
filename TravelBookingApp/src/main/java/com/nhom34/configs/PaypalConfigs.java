/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.configs;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 *
 * @author PC
 */
@Configuration
@PropertySource("classpath:payments.properties")
public class PaypalConfigs {
    @Value("${paypal.mode}")
    private String mode;
    
    @Value("${paypal.clientId}")
    private String clientId;
    
    @Value("${paypal.clientSecret}")
    private String clientSecret;
    
    @Value("${paypal.returnUrl}")
    private String returnUrl;
    
    @Value("${paypal.cancelUrl}")
    private String cancelUrl;
    
    @Bean
    public PayPalHttpClient payPalHttpClient() {
        PayPalEnvironment environment = new PayPalEnvironment.Sandbox(this.getClientId(), this.getClientSecret());
        return new PayPalHttpClient(environment);
    }

    /**
     * @return the mode
     */
    public String getMode() {
        return mode;
    }

    /**
     * @return the clientId
     */
    public String getClientId() {
        return clientId;
    }

    /**
     * @return the clientSecret
     */
    public String getClientSecret() {
        return clientSecret;
    }

    /**
     * @return the returnUrl
     */
    public String getReturnUrl() {
        return returnUrl;
    }

    /**
     * @return the cancelUrl
     */
    public String getCancelUrl() {
        return cancelUrl;
    }
}
