/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.dto.ProviderStatistic;
import java.util.List;

/**
 *
 * @author PC
 */
public interface StatisticRepository {
    List<ProviderStatistic> getRevenueStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue);
    List<ProviderStatistic> getCustomerStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue);
}
