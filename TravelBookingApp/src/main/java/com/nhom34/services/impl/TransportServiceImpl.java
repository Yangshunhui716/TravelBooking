/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.repositories.TransportRepository;
import com.nhom34.services.TransportService;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
@Service
public class TransportServiceImpl implements TransportService{
    @Autowired
    private TransportRepository transportRepo;
    @Autowired
    private ServiceRepository serviceRepo;
    @Autowired
    private Cloudinary cloudinary;
    
    @Override
    public List<TransportServices> getTransportServices(Map<String, String> params) {
        return this.transportRepo.getTransportServices(params);
    }
    @Override
    public TransportServices getTransportServiceById(Long id) {
        return this.transportRepo.getTransportServiceById(id);
    }   

    @Override
    @Transactional
    public TransportServices addTransportService(Map<String, String> info, MultipartFile img, Providers prov) {
        Services newService = new Services();
        TransportServices newTransport = new TransportServices();
        
        try {
            Map res = this.cloudinary.uploader().upload(img.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            newService.setImgUrl(res.get("secure_url").toString());
        } catch (IOException ex) {
            Logger.getLogger(TransportServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            throw new RuntimeException("Xảy ra lỗi khi tải ảnh lên hệ thống");
        }
        
        newService.setName(info.get("name"));
        newService.setPrice(Double.parseDouble(info.get("price")));
        newService.setDescription(info.get("description"));
        newService.setDestination(info.get("destination"));
        newService.setAvailableSlots(Integer.parseInt(info.get("slot")));
        newService.setStatus("AVAILABLE");
        newService.setIsActive(true);
        newService.setCreatedAt(Date.from(Instant.now()));
        newService.setUpdatedAt(Date.from(Instant.now()));
        newService.setProviderId(prov);
        newService = this.serviceRepo.addService(newService);
        
        newTransport.setDepartureTime(Timestamp.valueOf(info.get("departureTime")));
        newTransport.setEndTime(Timestamp.valueOf(info.get("endTime")));
        newTransport.setDepartureLocation(info.get("departureLocation"));
        newTransport.setEndLoaction(info.get("endLocation"));
        newTransport.setTicketType(info.get("ticketType"));
        newTransport.setTransportType(info.get("transportType"));
        newTransport.setServices(newService);
        newTransport.setId(newService.getId());

        return this.transportRepo.addTransportService(newTransport);
    }
}
