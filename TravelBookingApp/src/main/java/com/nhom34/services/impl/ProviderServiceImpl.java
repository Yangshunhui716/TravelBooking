/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.ProviderRepository;
import com.nhom34.repositories.UserRepository;
import com.nhom34.services.ProviderService;
import com.nhom34.services.UserService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author QUANG AN
 */
@Service
public class ProviderServiceImpl implements ProviderService{
    @Autowired
    private ProviderRepository provRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserService userService;
    
    @Override
    public Providers addProv(Map<String, String> info, Users u) {
        Providers newProv = new Providers();
        newProv.setId(u.getId());
        newProv.setUsers(u);
        newProv.setBusinessName(info.get("businessName"));
        newProv.setAddress(info.get("address"));
        newProv.setTax(info.get("tax"));
        
        return this.provRepo.addProv(newProv);
    }

    @Override
    public List<Providers> getProv() {
        return this.provRepo.getProv();
    }

    @Override
    public List<Users> getProvUser(List<Providers> p) {
        return this.provRepo.getProvUser(p);
    }
    
    @Override
    public Providers getProvById(Long id) {
        return this.provRepo.getProvById(id);
    }
    
    @Override
    public Providers getProvByUsername(String username) {
        return this.provRepo.getProvById(this.userService.getUserByUsername(username).getId());
    }

    @Override
    public List<TransportServices> getTransportServices(Long provId) {
        return this.provRepo.getTransportServices(provId);
    }

    @Override
    public List<HotelRoomServices> getHotelRoomServices(Long provId) {
        return this.provRepo.getHotelRoomServices(provId);
    }

    @Override
    public List<TourServices> getTourServices(Long provId) {
        return this.provRepo.getTourServices(provId);
    }

    @Override
    @Transactional
    public Providers updateProfile(Map<String, String> params, Long id) {
        this.userRepo.updateProfile(params, id);
        return this.provRepo.updatePartial(params, id);
    }

}
