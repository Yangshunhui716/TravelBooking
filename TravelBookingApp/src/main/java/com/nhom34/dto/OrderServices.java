package com.nhom34.dto;

import java.io.Serializable;
import java.util.Date;


public class OrderServices implements Serializable{
    private Long id;
    private double unitPrice;
    private int quantity;
    private Date serviceStartDate;
    private int serviceDuration;


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public double getUnitPrice() {
        return unitPrice;
    }


    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }


    public int getQuantity() {
        return quantity;
    }


    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public Date getServiceStartDate() {
        return serviceStartDate;
    }


    public void setServiceStartDate(Date serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
    }


    public int getServiceDuration() {
        return serviceDuration;
    }


    public void setServiceDuration(int serviceDuration) {
        this.serviceDuration = serviceDuration;
    }

    
}
