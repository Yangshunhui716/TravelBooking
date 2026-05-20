/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.repositories.TourRepository;
import com.nhom34.services.TourService;
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
public class TourServiceImpl implements  TourService{
    @Autowired
    private TourRepository tourRepo;
    @Autowired
    private ServiceRepository serviceRepo;
    @Autowired
    private Cloudinary cloudinary;
    
    @Override
    public List<TourServices> getTourServices(Map<String, String> params) {
        return this.tourRepo.getTourServices(params);

    }
    @Override
    public TourServices getTourServiceById(Long id) {
        return this.tourRepo.getTourServiceById(id);
    }

    @Override
    @Transactional
    public TourServices addTourService(Map<String, String> info, MultipartFile img, Providers prov) {
        Services newService = new Services();
        TourServices newTour = new TourServices();

        try {
            Map res = this.cloudinary.uploader().upload(img.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            newService.setImgUrl(res.get("secure_url").toString());
        } catch (IOException ex) {
            Logger.getLogger(TourServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
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
        
        newTour.setDepartureTime(Timestamp.valueOf(info.get("departureTime")));
        newTour.setDurationDays(Integer.parseInt(info.get("durationDays")));
        newTour.setServices(newService);
        newTour.setId(newService.getId());

        return this.tourRepo.addTourService(newTour);
    }
    
}
