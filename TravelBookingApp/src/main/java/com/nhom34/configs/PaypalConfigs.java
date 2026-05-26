/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.configs;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 *
 * @author PC
 */
@Configuration
@PropertySource("classpath:payments.properties")
public class PaypalConfigs {
    @Autowired
    private Environment env;
    
    @Bean
    public String getMode(){
        return env.getProperty("paypal.mode");
    }
    
    @Bean
    public String getClientId(){
        return env.getProperty("paypal.clientId");
    }
    
    @Bean
    public String getClientSecret(){
        return env.getProperty("paypal.clientSecret");
    }
    
    @Bean
    public String getReturnUrl(){
        return env.getProperty("paypal.returnUrl");
    }
    
    @Bean
    public String getCancelUrl(){
        return env.getProperty("paypal.cancelUrl");
    }
    
    @Bean
    public PayPalHttpClient payPalHttpClient() {
        PayPalEnvironment environment = new PayPalEnvironment.Sandbox(this.getClientId(), this.getClientSecret());
        return new PayPalHttpClient(environment);
    }
}
