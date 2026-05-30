/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.configs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
@PropertySource("classpath:databases.properties")
public class CloudinaryConfigs {
    @Autowired
    private Environment env;
    
    @Bean
    public Cloudinary cloudinary() {
        Cloudinary cloudinary
                = new Cloudinary(ObjectUtils.asMap(
                        "cloud_name", env.getProperty("cloudinary.cloudName"),
                        "api_key", env.getProperty("cloudinary.apiKey"),
                        "api_secret", env.getProperty("cloudinary.apiSecret"),
                        "secure", true));
        return cloudinary;
    }
    
}
