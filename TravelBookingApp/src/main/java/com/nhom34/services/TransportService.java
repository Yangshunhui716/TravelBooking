/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TransportServices;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
public interface TransportService {
    List<TransportServices> getTransportServices(Map<String, String> params);
    TransportServices getTransportServiceById(Long id);
    TransportServices addTransportService(Map<String, String> info, MultipartFile img, Providers prov);
    TransportServices updatePartial(Map<String, String> params, Long id);
}
