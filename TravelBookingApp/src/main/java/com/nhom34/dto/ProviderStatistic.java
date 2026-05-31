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
public class ProviderStatistic implements Serializable {
    private String period;
    private Double revenue;
    private Long totalCustomers;
    private Long newCustomers;

    public ProviderStatistic() {
    }

    public ProviderStatistic(Integer timeValue, Double revenue) {
        this.period = String.valueOf(timeValue);
        this.revenue = revenue != null ? revenue : 0.0;
        this.totalCustomers = 0L;
        this.newCustomers = 0L;
    }

    // 3. Constructor dùng cho Query getCustomerStats (Integer, Long, Long)
    public ProviderStatistic(Integer timeValue, Long totalCustomers, Long newCustomers) {
        this.period = String.valueOf(timeValue);
        this.revenue = 0.0;
        this.totalCustomers = totalCustomers != null ? totalCustomers : 0L;
        this.newCustomers = newCustomers != null ? newCustomers : 0L;
    }

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
    public Long getTotalCustomers() {
        return totalCustomers;
    }

    /**
     * @param totalCustomers the totalCustomers to set
     */
    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    /**
     * @return the newCustomers
     */
    public Long getNewCustomers() {
        return newCustomers;
    }

    /**
     * @param newCustomers the newCustomers to set
     */
    public void setNewCustomers(Long newCustomers) {
        this.newCustomers = newCustomers;
    }
}