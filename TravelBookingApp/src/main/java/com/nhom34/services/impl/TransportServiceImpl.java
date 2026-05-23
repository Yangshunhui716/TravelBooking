/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TransportService;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
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
    private ServiceService serviceService;
    
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
        TransportServices newTransport = new TransportServices();
        Services newService = this.serviceService.addService(info, img, prov);
        
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
