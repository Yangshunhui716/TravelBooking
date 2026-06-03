package com.nhom34.services;

import com.nhom34.pojo.HotelRoomServices;
import java.util.Date;
import java.util.Map;


public interface HotelService extends ServiceDetailService<HotelRoomServices>{
    int getAvailableSlots(Long id, Date startDate, Date endDate);
    int getAvailableSlots(Long id, Map<String, String> params);
    void updateHotelRate(Long hotelId, Double newRate);
    
}
