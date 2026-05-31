/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.dto.ProviderStatistic;
import com.nhom34.pojo.Providers;
import java.util.List;
import java.util.Map;

/**
 *
 * @author PC
 */
public interface StatisticService {
    List<ProviderStatistic> providerStatistic(Map<String, String> filter, Providers prov, String metric);
}
