package com.nhom34.dto;

import java.io.Serializable;


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


    public ProviderStatistic(Integer timeValue, Long totalCustomers, Long newCustomers) {
        this.period = String.valueOf(timeValue);
        this.revenue = 0.0;
        this.totalCustomers = totalCustomers != null ? totalCustomers : 0L;
        this.newCustomers = newCustomers != null ? newCustomers : 0L;
    }


    public String getPeriod() {
        return period;
    }


    public void setPeriod(String period) {
        this.period = period;
    }


    public Double getRevenue() {
        return revenue;
    }


    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }


    public Long getTotalCustomers() {
        return totalCustomers;
    }


    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public Long getNewCustomers() {
        return newCustomers;
    }


    public void setNewCustomers(Long newCustomers) {
        this.newCustomers = newCustomers;
    }
}