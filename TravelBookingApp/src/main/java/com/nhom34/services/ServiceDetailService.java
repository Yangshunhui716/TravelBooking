/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Providers;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author PC
 */
public interface ServiceDetailService<T> {
    List<T> getDetailServices(Map<String, String> params);
    T getDetailServiceById(Long id);
    T addDetailService(Map<String, String> info, MultipartFile img, Providers prov);
    T updatePartial(Map<String, String> params, Long id);
}
