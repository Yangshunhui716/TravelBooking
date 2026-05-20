/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.HotelRepository;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.services.HotelService;
import java.io.IOException;
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
public class HotelServiceImpl implements HotelService{
    @Autowired
    private HotelRepository hotelRepo;
    @Autowired
    private ServiceRepository serviceRepo;
    @Autowired
    private Cloudinary cloudinary;
    
    @Override
    public List<HotelRoomServices> getHotelRoomServices(Map<String, String> params) {
        return this.hotelRepo.getHotelRoomServices(params);
    }
    @Override
    public HotelRoomServices getHotelRoomServiceById(Long id) {
        return this.hotelRepo.getHotelRoomServiceById(id);
    }

    @Override
    @Transactional
    public HotelRoomServices addHotelRoomService(Map<String, String> info, MultipartFile img, Providers prov) {
        Services newService = new Services();
        HotelRoomServices newHotelRoom = new HotelRoomServices();
        
        try {
            Map res = this.cloudinary.uploader().upload(img.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            newService.setImgUrl(res.get("secure_url").toString());
        } catch (IOException ex) {
            Logger.getLogger(HotelServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
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
        
        newHotelRoom.setHotelName(info.get("hotelName"));
        newHotelRoom.setAddress(info.get("address"));
        newHotelRoom.setServices(newService);
        newHotelRoom.setId(newService.getId());

        return this.hotelRepo.addHotelRoomService(newHotelRoom);
    }
}
