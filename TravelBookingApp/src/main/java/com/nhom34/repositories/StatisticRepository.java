package com.nhom34.repositories;

import com.nhom34.dto.ProviderStatistic;
import java.util.List;
import java.util.Map;

public interface StatisticRepository {
    List<ProviderStatistic> getRevenueStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue);
    List<ProviderStatistic> getCustomerStats(Long providerId, String serviceType, String timePeriod, Integer year, Integer periodValue);
    Map<String, Long> countActiveServices();
    List<Object[]> getRevenueByTime(String time, int year, int month);
    List<Object[]> getTop5Services();
    
}
