/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.repositories.HotelRepository;
import com.nhom34.services.HotelService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author QUANG AN
 */
@Service
public class HotelServiceImpl implements HotelService{
    @Autowired
    private HotelRepository hotelRepo;
    
    @Override
    public List<HotelRoomServices> getHotelRoomServices(Map<String, String> params) {
        return this.hotelRepo.getHotelRoomServices(params);
    }
    @Override
    public HotelRoomServices getHotelRoomServiceById(Long id) {
        return this.hotelRepo.getHotelRoomServiceById(id);
    }
}
