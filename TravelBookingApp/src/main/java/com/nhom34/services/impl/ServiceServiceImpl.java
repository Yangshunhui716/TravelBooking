/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.services.ServiceService;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
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
@Transactional
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    private ServiceRepository serviceRepo;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Services getServiceById(Long id) {
        return this.serviceRepo.getServiceById(id);
    }

    @Override
    public Services addService(Map<String, String> info, MultipartFile img, Providers prov) {
        Services newService = new Services();
        
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
        
        return this.serviceRepo.addService(newService);
    }

    @Override
    public void updateStatus(Long id, String status) {
        this.serviceRepo.updateStatus(id, status);
    }
    
    @Override
    public void updateActive(Long id, boolean active) {
        this.serviceRepo.updateActive(id, active);
    }

    @Override
    public boolean checkOwner(Long provId, Long id) {
        return this.serviceRepo.checkOwner(provId, id);
    }

    @Override
    public void deleteService(Long id) {
        this.serviceRepo.deleteService(id);
    }
}
