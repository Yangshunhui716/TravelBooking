/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.repositories.ProviderRepository;
import com.nhom34.services.ProviderService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class ProviderServiceImpl implements ProviderService{
    @Autowired
    private ProviderRepository provRepo;

    @Override
    public List<Providers> getProv() {
        return this.provRepo.getProv();
    }
    
    
}
