/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl.payment;

import com.nhom34.configs.PaypalConfigs;
import com.nhom34.services.PaymentService;
import com.paypal.http.HttpResponse;
import com.paypal.orders.AmountWithBreakdown;
import com.paypal.orders.ApplicationContext;
import com.paypal.orders.LinkDescription;
import com.paypal.orders.Order;
import com.paypal.orders.OrderRequest;
import com.paypal.orders.OrdersCaptureRequest;
import com.paypal.orders.OrdersCreateRequest;
import com.paypal.orders.PurchaseUnitRequest;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author PC
 */
@Service
public class PaypalServiceImpl implements PaymentService{
    @Autowired
    private PaypalConfigs paypalConfigs;

    @Override
    public String getProviderName() {
        return "PAYPAL";
    }

    @Override
    public String call(String orderId, String amount, String orderInfo) {
        double totalUSD = Double.parseDouble(amount) / 25000.0;
        String totalAmountStr = String.format("%.2f", totalUSD);
        
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");
        
        ApplicationContext applicationContext = new ApplicationContext()
                .brandName("AH Travel Booking")
                .returnUrl("http://localhost:3000/payment/success")
                .cancelUrl("http://localhost:3000/payment/cancel");
        orderRequest.applicationContext(applicationContext);
        
        List<PurchaseUnitRequest> purchaseUnitRequests = new ArrayList<>();
        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
                .amountWithBreakdown(new AmountWithBreakdown().currencyCode("USD").value(totalAmountStr))
                .customId(orderId)
                .description(orderInfo);
        purchaseUnitRequests.add(purchaseUnitRequest);
        orderRequest.purchaseUnits(purchaseUnitRequests);
        
        try {
            OrdersCreateRequest paypalReq = new OrdersCreateRequest().requestBody(orderRequest);
            HttpResponse<Order> response = paypalConfigs.payPalHttpClient().execute(paypalReq);
            Order order = response.result();

            for (LinkDescription link : order.links()) {
                if ("approve".equals(link.rel())) {
                    return link.href();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Không thể tạo giao dịch PayPal");
        }
        
        return null;
    }
    
    public Order capturePayment(String token) {
        OrdersCaptureRequest captureRequest = new OrdersCaptureRequest(token);
        captureRequest.requestBody(new OrderRequest());
        Order order = new Order();
        try {
            HttpResponse<Order> response = paypalConfigs.payPalHttpClient().execute(captureRequest);
            order = response.result();
        } catch (Exception e) {
            System.err.println("Lỗi capture PayPal: " + e.getMessage());
        }
        
        return order;
    }
    
}
