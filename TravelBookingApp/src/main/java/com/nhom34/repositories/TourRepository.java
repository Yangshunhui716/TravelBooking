/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.TourServices;
import java.util.List;
import java.util.Map;

/**
 *
 * @author QUANG AN
 */
public interface TourRepository {
    List<TourServices> getTourServices(Map<String, String> params);
    TourServices getTourServiceById(Long id);
}
