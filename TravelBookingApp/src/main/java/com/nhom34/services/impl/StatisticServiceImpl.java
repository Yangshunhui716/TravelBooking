/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.dto.ProviderStatistic;
import com.nhom34.pojo.Providers;
import com.nhom34.repositories.StatisticRepository;
import com.nhom34.services.StatisticService;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author PC
 */
@Service
@Transactional
public class StatisticServiceImpl implements StatisticService{
    @Autowired
    private StatisticRepository statisticRepo;
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    @Transactional
    public List<ProviderStatistic> providerStatistic(Map<String, String> filter, Providers prov, String metric) {
        Long providerId = prov.getId(); 
        String serviceType = filter.getOrDefault("serviceType", "all");
        String timePeriod = filter.getOrDefault("timePeriod", "month");
        int periodValue = Integer.parseInt(filter.getOrDefault("periodValue","5"));
        int statisticYear = LocalDate.now().getYear();
        if (filter.containsKey("year")&&!filter.get("year").isEmpty()) {
            statisticYear = Integer.parseInt(filter.get("year"));
        }

        if ("revenue".equals(metric)) {
            return this.statisticRepo.getRevenueStats(providerId, serviceType, timePeriod, statisticYear, periodValue);
        } else if ("customers".equals(metric)) {
            return this.statisticRepo.getCustomerStats(providerId, serviceType, timePeriod, statisticYear, periodValue);
        }
        
        return null;
    }

    @Override
    public Map<String, Long> countActiveServices() {
        return this.statisticRepo.countActiveServices();
    }

    @Override
    public List<Object[]> getRevenueByTime(String time, int year) {
        return this.statisticRepo.getRevenueByTime(time, year);
       
    }

    @Override
    public List<Object[]> getTop5Services() {
        return this.statisticRepo.getTop5Services();
    }
    
}
