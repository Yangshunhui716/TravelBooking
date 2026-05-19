/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.TourRepository;
import com.nhom34.services.TourService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class TourServiceImpl implements  TourService{
    @Autowired
    private TourRepository tourRepo;
    @Override
    public List<TourServices> getTourServices(Map<String, String> params) {
        return this.tourRepo.getTourServices(params);

    }
    @Override
    public TourServices getTourServiceById(Long id) {
        return this.tourRepo.getTourServiceById(id);
    }
    
}
