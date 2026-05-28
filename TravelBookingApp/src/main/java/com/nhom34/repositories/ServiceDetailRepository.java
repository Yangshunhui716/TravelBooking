/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories;

import java.util.List;
import java.util.Map;

/**
 *
 * @author PC
 */
public interface ServiceDetailRepository<T> {
    List<T> getDetailServices(Map<String, String> params);
    T getDetailServiceById(Long id);
    T addDetailService(T hotelRoom);
    T updatePartial(Map<String, String> params, Long id);
}
