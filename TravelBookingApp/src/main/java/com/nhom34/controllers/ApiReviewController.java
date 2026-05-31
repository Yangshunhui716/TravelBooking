/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Reviews;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.Users;
import com.nhom34.services.BookingService;
import com.nhom34.services.CustomerService;
import com.nhom34.services.ReviewService;
import com.nhom34.services.ServiceService;
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author QUANG AN
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private UserService userService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private BookingService bookingService;
    
    @GetMapping("/services/{serviceId}/reviews")
    public ResponseEntity<List<Reviews>> getReviews(@PathVariable(value = "serviceId") Long serviceId) {
        return new ResponseEntity<>(this.reviewService.getReviewsByServiceId(serviceId),HttpStatus.OK
        );
    }

    @PostMapping("/secure/customer/services/{serviceId}/reviews")
    public ResponseEntity<?> addReview(@PathVariable(value = "serviceId") Long serviceId,    @RequestBody Map<String, String> params,  Principal principal) {
        Services service = this.serviceService.getServiceById(serviceId);
        Users user = this.userService.getUserByUsername(principal.getName());
        Customers customer = this.customerService.getCustomerByUserId(user.getId());
        boolean hasPaid = this.bookingService.checkCustomerPaidService(customer.getId(), service.getId());
        if (!hasPaid) {
            Map<String, String> errResponse = new HashMap<>();
            errResponse.put("message", "Bạn không thể đánh giá dịch vụ này vì chưa đặt hàng hoặc chưa hoàn tất thanh toán!");
            return new ResponseEntity<>(errResponse, HttpStatus.BAD_REQUEST);
        }
        Reviews review = new Reviews();
        review.setComment(params.get("comment"));
        review.setRating(Integer.valueOf(params.get("rating")));
        review.setCreatedAt(new Date());
        review.setServiceId(service);
        review.setCustomerId(customer);
        return new ResponseEntity<>(this.reviewService.addReview(review), HttpStatus.CREATED);
     }

    @PatchMapping("/secure/customer/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable("reviewId") Long reviewId,@RequestBody Map<String, String> params, Principal principal) {
        Reviews review = this.reviewService.getReviewById(reviewId);
        Users currentUser = this.userService.getUserByUsername(principal.getName());

        if (!review.getCustomerId().getId().equals(currentUser.getId())) {
            return new ResponseEntity<>("Ban khong co quyen sua review nay", HttpStatus.FORBIDDEN);
        }
        if (params.get("comment") != null) {
            review.setComment(params.get("comment"));
        }
        if (params.get("rating") != null) {
            review.setRating(Integer.valueOf(params.get("rating")));
        }

        return new ResponseEntity<>(this.reviewService.updateReview(review), HttpStatus.OK);
    }
}