/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
public interface ServiceService {
    Services getServiceById(Long id);
    Services addService(Map<String, String> info, MultipartFile img, Providers prov);
    void updateStatus(Long id, boolean status);
    void deleteService(Long id);
    boolean checkOwner(Long provId, Long id);
    boolean checkAvailableSlots(int slotsOrder,Long id);
}
