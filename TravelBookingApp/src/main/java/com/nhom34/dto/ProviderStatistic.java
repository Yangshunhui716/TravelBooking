/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.dto;

import java.io.Serializable;

/**
 *
 * @author PC
 */
public class ProviderStatistic implements Serializable{
    private String period;
    private Double revenue;
    private Integer totalCustomers;
    private Integer newCustomers;

    /**
     * @return the period
     */
    public String getPeriod() {
        return period;
    }

    /**
     * @param period the period to set
     */
    public void setPeriod(String period) {
        this.period = period;
    }

    /**
     * @return the revenue
     */
    public Double getRevenue() {
        return revenue;
    }

    /**
     * @param revenue the revenue to set
     */
    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    /**
     * @return the totalCustomers
     */
    public Integer getTotalCustomers() {
        return totalCustomers;
    }

    /**
     * @param totalCustomers the totalCustomers to set
     */
    public void setTotalCustomers(Integer totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    /**
     * @return the newCustomers
     */
    public Integer getNewCustomers() {
        return newCustomers;
    }

    /**
     * @param newCustomers the newCustomers to set
     */
    public void setNewCustomers(Integer newCustomers) {
        this.newCustomers = newCustomers;
    }
}
