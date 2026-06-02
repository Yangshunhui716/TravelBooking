package com.nhom34.dto;

import java.io.Serializable;
import java.util.List;


public class RequestOrder implements Serializable{
    private List<OrderServices> booking;
    private String payMethod;


    public List<OrderServices> getBooking() {
        return booking;
    }


    public void setBooking(List<OrderServices> booking) {
        this.booking = booking;
    }


    public String getPayMethod() {
        return payMethod;
    }


    public void setPayMethod(String payMethod) {
        this.payMethod = payMethod;
    }
    
}
