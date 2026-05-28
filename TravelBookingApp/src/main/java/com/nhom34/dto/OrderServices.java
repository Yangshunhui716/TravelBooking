/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.dto;

import java.util.Date;

/**
 *
 * @author PC
 */
public class OrderServices {
    private Long id;
    private double unitPrice;
    private int quantity;
    private Date serviceStartDate;
    private int serviceDuration;

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the unitPrice
     */
    public double getUnitPrice() {
        return unitPrice;
    }

    /**
     * @param unitPrice the unitPrice to set
     */
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    /**
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * @return the serviceStartDate
     */
    public Date getServiceStartDate() {
        return serviceStartDate;
    }

    /**
     * @param serviceStartDate the serviceStartDate to set
     */
    public void setServiceStartDate(Date serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
    }

    /**
     * @return the serviceDuration
     */
    public int getServiceDuration() {
        return serviceDuration;
    }

    /**
     * @param serviceDuration the serviceDuration to set
     */
    public void setServiceDuration(int serviceDuration) {
        this.serviceDuration = serviceDuration;
    }

    
}
