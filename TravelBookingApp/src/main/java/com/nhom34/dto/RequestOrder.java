/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.dto;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author PC
 */
public class RequestOrder implements Serializable{
    private List<OrderServices> booking;
    private String payMethod;

    /**
     * @return the booking
     */
    public List<OrderServices> getBooking() {
        return booking;
    }

    /**
     * @param booking the booking to set
     */
    public void setBooking(List<OrderServices> booking) {
        this.booking = booking;
    }

    /**
     * @return the payMethod
     */
    public String getPayMethod() {
        return payMethod;
    }

    /**
     * @param payMethod the payMethod to set
     */
    public void setPayMethod(String payMethod) {
        this.payMethod = payMethod;
    }
    
}
