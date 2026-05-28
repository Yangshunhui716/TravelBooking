/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.AutoUpdateServiceRepository;
import com.nhom34.repositories.TourRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TourService;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.nhom34.services.AutoUpdateServiceService;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 *
 * @author QUANG AN
 */
@Service
public class TourServiceImpl implements  TourService, AutoUpdateServiceService{
    @Autowired
    private TourRepository tourRepo;
    @Autowired
    private ServiceService serviceService;
    @Autowired
    @Qualifier("tourRepositoryImpl")
    private AutoUpdateServiceRepository autoUpdateRepo;
    
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
        TourServices newTour = new TourServices();
        Services newService = this.serviceService.addService(info, img, prov);
        
        newTour.setDepartureTime(Timestamp.valueOf(info.get("departureTime")));
        newTour.setDurationDays(Integer.parseInt(info.get("durationDays")));
        newTour.setServices(newService);
        newTour.setId(newService.getId());

        return this.tourRepo.addTourService(newTour);
    }
    
    @Override
    @Transactional
    public TourServices updatePartial(Map<String, String> params, Long id) {
        if(params.containsKey("status")){
            this.serviceService.updateStatus(id, Boolean.parseBoolean(params.get("status")));
            return this.tourRepo.getTourServiceById(id);
        }
        else{
            return this.tourRepo.updatePartial(params, id);
        }
    }

    @Override
    @Scheduled(cron = "0 0/10 * * * ?")
    @Transactional
    public void autoUpdateStatusByCheckDate() {
        this.autoUpdateRepo.autoUpdateStatusByCheckDate();
    }
}
