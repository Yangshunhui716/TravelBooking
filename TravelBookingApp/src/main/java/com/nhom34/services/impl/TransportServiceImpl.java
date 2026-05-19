/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import com.nhom34.services.TransportService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class TransportServiceImpl implements TransportService{
    @Autowired
    private TransportRepository transportRepo;
    @Override
    public List<TransportServices> getTransportServices(Map<String, String> params) {
        return this.transportRepo.getTransportServices(params);
    }
    @Override
    public TransportServices getTransportServiceById(Long id) {
        return this.transportRepo.getTransportServiceById(id);
    }   
}
