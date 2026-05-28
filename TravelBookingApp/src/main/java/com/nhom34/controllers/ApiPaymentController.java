
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.components.PaymentFactory;
import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.pojo.RequestOrder;
import com.paypal.orders.Order;
import com.nhom34.services.BookingService;
import com.nhom34.services.CustomerService;
import com.nhom34.services.PaymentService;
import com.nhom34.services.TransferTransactionService;
import com.nhom34.services.impl.payment.MomoServiceImpl;
import com.nhom34.services.impl.payment.PaypalServiceImpl;
import java.security.Principal;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author PC
 */
@Controller
@RequestMapping("/api")
@CrossOrigin
public class ApiPaymentController {
    @Autowired
    private PaymentFactory paymentFactory;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private MomoServiceImpl momoService;
    @Autowired
    private PaypalServiceImpl paypalService;
    @Autowired
    private CustomerService cusService;
    @Autowired
    private TransferTransactionService ttService;
    
    @PostMapping("/secure/pay")
    @PreAuthorize("hasRole('CUSTOMER')")
    public String createPayment(@RequestBody RequestOrder requestPayload, Principal principal) {
        Customers customer = this.cusService.getCustomerByUsername(principal.getName());
        Bookings booking = this.bookingService.addBooking(requestPayload, customer);
        if(!"CASH".equals(requestPayload.getPayMethod())){
            PaymentService payMethod = paymentFactory.getMethod(requestPayload.getPayMethod());
            String bookingId = booking.getId().toString();
            String orderInfo = "Thanh toán đơn "+ bookingId;
            String totalAmount = String.format("%.0f", booking.getTotalAmount());
            return payMethod.call(bookingId, totalAmount, orderInfo);
        }else{
            this.bookingService.changeBookingStatus(booking.getId(), "CONFIRM");
            return null;
        }
    }
    
    @PostMapping("/momo/ipn")
    public ResponseEntity<?> receiveMomoIpn(@RequestBody Map<String, Object> momoIpn){
        boolean isValid = momoService.verifyNotify(momoIpn);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        Integer resultCode = (Integer) momoIpn.get("resultCode");
        String transactionCode = "MOMO_" + String.valueOf(momoIpn.get("transId"));
        Long orderId = Long.valueOf(momoIpn.get("orderId").toString());
        
        if (resultCode != null && resultCode == 0) {
            this.bookingService.bookingPaySuccess(transactionCode, "SUCCESS", orderId, "PAID", "CONFIRM");
        } else {
            this.ttService.addTransferTransaction(transactionCode, "FAILED", orderId);
        }
        
        return ResponseEntity.noContent().build();
    } 
    
    @PostMapping("/paypal/capture")
    public ResponseEntity<?> capturePaypalPayment(@RequestParam("token") String token) {
        Order order= paypalService.capturePayment(token);
        Long orderId = Long.valueOf(order.purchaseUnits().get(0).customId());
        String transactionCode = "PAYPAL_" + order.purchaseUnits().get(0).payments().captures().get(0).id();
        if ("COMPLETED".equals(order.status())) {    
            this.bookingService.bookingPaySuccess(transactionCode, "SUCCESS", orderId, "PAID", "CONFIRM");
            return ResponseEntity.status(HttpStatus.OK).body("Thanh toán thành công! Đã ghi nhận đơn hàng");
        } else {
            this.ttService.addTransferTransaction(transactionCode, "FAILED", orderId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Giao dịch chưa hoàn tất hoặc thất bại");
        }
    }
}

