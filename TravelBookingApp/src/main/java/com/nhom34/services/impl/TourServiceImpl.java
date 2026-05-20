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
        System.out.println("=== START ADD TOUR ===");

        if (img == null || img.isEmpty()) {
            throw new RuntimeException("Vui lòng chọn ảnh");
        }

        Services newService = new Services();
        TourServices newTour = new TourServices();

        try {
            Map res = this.cloudinary.uploader().upload(
                    img.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto")
            );

            System.out.println("UPLOAD CLOUDINARY OK");

            newService.setImgUrl(res.get("secure_url").toString());

        } catch (IOException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Upload ảnh thất bại");
        }

        System.out.println("SET SERVICE INFO");

        newService.setName(info.get("name"));
        newService.setPrice(Double.parseDouble(info.get("price")));
        newService.setDescription(info.get("description"));
        newService.setDestination(info.get("destination"));
        newService.setAvailableSlots(Integer.parseInt(info.get("slot")));
        newService.setStatus("AVAILABLE");
        newService.setIsActive(true);
        newService.setCreatedAt(new Date());
        newService.setUpdatedAt(new Date());
        newService.setProviderId(prov);

        System.out.println("SAVE SERVICE");

        newService = this.serviceRepo.addService(newService);

        System.out.println("SET TOUR INFO");

        newTour.setDepartureTime(
                Timestamp.valueOf(info.get("departureTime"))
        );

        newTour.setDurationDays(
                Integer.parseInt(info.get("durationDays"))
        );

        newTour.setServices(newService);

        System.out.println("BEFORE SAVE TOUR");
        System.out.println("SERVICE ID = " + newService.getId());
        System.out.println("TOUR SERVICE = " + newTour.getServices());
        System.out.println("PROVIDER = " + prov);
        return this.tourRepo.addTourService(newTour);
    }
    
}
