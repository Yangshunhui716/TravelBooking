/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
public interface HotelService {
    List<HotelRoomServices> getHotelRoomServices(Map<String, String> params);
    HotelRoomServices getHotelRoomServiceById(Long id);
    HotelRoomServices addHotelRoomService(Map<String, String> info, MultipartFile img, Providers prov);
}
