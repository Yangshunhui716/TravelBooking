package com.nhom34.controllers;

import com.nhom34.components.PaymentFactory;
import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.Customers;
import com.nhom34.dto.RequestOrder;
import com.paypal.orders.Order;
import com.nhom34.services.BookingService;
import com.nhom34.services.CustomerService;
import com.nhom34.services.PaymentService;
import com.nhom34.services.TransferTransactionService;
import com.nhom34.services.impl.payment.MomoServiceImpl;
import com.nhom34.services.impl.payment.PaypalServiceImpl;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


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
    
    @PostMapping("/secure/customer/pay")
    public ResponseEntity<?> createPayment(@RequestBody RequestOrder requestPayload, Principal principal) {
        Customers customer = this.cusService.getCustomerByUsername(principal.getName());
        Bookings booking;
        try {
            booking = this.bookingService.addBooking(requestPayload, customer);
        } catch (Exception ex) {
            return new ResponseEntity<>("Không thể tạo đơn", HttpStatus.BAD_REQUEST);
        }
        
        if(!"CASH".equals(requestPayload.getPayMethod())){
            PaymentService payMethod = paymentFactory.getMethod(requestPayload.getPayMethod());
            String bookingId = booking.getId().toString();
            String orderInfo = "Thanh toán đơn "+ bookingId;
            String totalAmount = String.format("%.0f", booking.getTotalAmount());
            Map<String, String> response = new HashMap<>();
            response.put("payUrl", payMethod.call(bookingId, totalAmount, orderInfo));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            this.bookingService.changeBookingStatus(booking.getId(), "CONFIRM");
            this.bookingService.changePaymentStatus(booking.getId(), "UNPAID");
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }
    
    @PostMapping("/secure/customer/pay/{bookingId}")
    public ResponseEntity<?> rePay(@PathVariable("bookingId") Long bookingId, @RequestBody RequestOrder requestPayload, Principal principal) {
        Customers customer = this.cusService.getCustomerByUsername(principal.getName());
        Bookings booking = this.bookingService.getBookingById(bookingId);

        if(booking.getPaymentStatus().equals("PAID")){
            return new ResponseEntity<>("Đơn đã thanh toán",HttpStatus.BAD_REQUEST);
        }
        
        this.bookingService.changeBookingPayMethod(bookingId, requestPayload.getPayMethod());
        
        if(!"CASH".equals(requestPayload.getPayMethod())){
            PaymentService payMethod = paymentFactory.getMethod(requestPayload.getPayMethod());
            String id = booking.getId().toString();
            String orderInfo = "Thanh toán đơn "+ id;
            String totalAmount = String.format("%.0f", booking.getTotalAmount());
            Map<String, String> response = new HashMap<>();
            response.put("payUrl", payMethod.call(id, totalAmount, orderInfo));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            this.bookingService.changeBookingStatus(booking.getId(), "CONFIRM");
            this.bookingService.changePaymentStatus(booking.getId(), "UNPAID");
            return new ResponseEntity<>(null,HttpStatus.OK);
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
        
        String momoReturnOrderId = momoIpn.get("orderId").toString();
        String realOrderId = momoReturnOrderId.split("_")[0];
        Long orderId = Long.parseLong(realOrderId);
        
        if (resultCode != null && resultCode == 0) {
            this.bookingService.bookingPaySuccess(transactionCode, orderId);
        } else {
            this.ttService.addTransferTransaction(transactionCode, "FAILED", orderId);
        }
        
        return ResponseEntity.noContent().build();
    } 
    
    @PostMapping("/secure/customer/paypal/capture")
    public ResponseEntity<?> capturePaypalPayment(@RequestParam("token") String token) {
        Order order= paypalService.capturePayment(token);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Giao dịch không hợp lệ");
        }
        if ("COMPLETED".equals(order.status())) {    
            Long orderId = Long.valueOf(order.purchaseUnits().get(0).customId());
            String transactionCode = "PAYPAL_" + order.purchaseUnits().get(0).payments().captures().get(0).id();
            this.bookingService.bookingPaySuccess(transactionCode, orderId);
            return ResponseEntity.status(HttpStatus.OK).body("Thanh toán thành công! Đã ghi nhận đơn hàng");
        } else {
            if (order.purchaseUnits() != null && !order.purchaseUnits().isEmpty()) {
                Long orderId = Long.valueOf(order.purchaseUnits().get(0).customId());
                String transactionCode = "PAYPAL_" + System.currentTimeMillis();
                this.ttService.addTransferTransaction(transactionCode, "FAILED", orderId);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Giao dịch chưa hoàn tất hoặc thất bại");
        }
    }
}

