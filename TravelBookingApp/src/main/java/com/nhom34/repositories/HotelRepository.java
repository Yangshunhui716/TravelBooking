package com.nhom34.repositories;

import com.nhom34.pojo.HotelRoomServices;
import java.util.Date;


public interface HotelRepository extends ServiceDetailRepository<HotelRoomServices>{
    int getAvailableSlots(Long id, Date startDate, Date endDate);
}
