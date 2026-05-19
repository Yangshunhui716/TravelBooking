/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author QUANG AN
 */
@Service
@Transactional
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepo;

    @Override
    public Services getServiceById(Long id) {
        return this.serviceRepo.getServiceById(id);
    }
}
