package com.nhom34.services;

import com.nhom34.dto.ProviderStatistic;
import com.nhom34.pojo.Providers;
import java.util.List;
import java.util.Map;


public interface StatisticService {
    List<ProviderStatistic> providerStatistic(Map<String, String> filter, Providers prov, String metric);
    
    Map<String, Long> countActiveServices();
    List<Object[]> getRevenueByTime(String time, int year, int month);
    List<Object[]> getTop5Services();
}
