package com.nhom34.configs;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


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

    public String getMode() {
        return mode;
    }

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }
}
