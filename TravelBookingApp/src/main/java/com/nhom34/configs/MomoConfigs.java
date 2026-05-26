/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.configs;

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
public class MomoConfigs {
    @Autowired
    private Environment env;
    
    @Bean
    public String getPartnerCode(){
        return env.getProperty("momo.partnerCode");
    }
    
    @Bean
    public String getAccessKey(){
        return env.getProperty("momo.accessKey");
    }
    
    @Bean
    public String getSecretKey(){
        return env.getProperty("momo.secretKey");
    }
    
    @Bean
    public String getEndpoint(){
        return env.getProperty("momo.endpoint");
    }
    
    @Bean
    public String getReturnUrl(){
        return env.getProperty("momo.returnUrl");
    }
    
    @Bean
    public String getNotifyUrl(){
        return env.getProperty("momo.notifyUrl");
    }
    
}
