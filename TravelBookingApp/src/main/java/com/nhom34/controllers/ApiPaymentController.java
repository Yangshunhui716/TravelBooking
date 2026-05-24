/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.configs.MomoConfigs;
import com.nhom34.pojo.BookingsServiceDetail;
import com.nhom34.services.PaymentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author PC
 */
@Controller
@RequestMapping("/api")
@CrossOrigin
public class ApiPaymentController {
    @Autowired
    private MomoConfigs momoConfig;
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/secure/pay/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public String addBooking(@RequestBody List<BookingsServiceDetail> booking) {
        return "";
    }
    
}
