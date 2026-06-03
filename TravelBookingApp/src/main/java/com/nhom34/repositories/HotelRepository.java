package com.nhom34.repositories;

import com.nhom34.pojo.HotelRoomServices;


public interface HotelRepository extends ServiceDetailRepository<HotelRoomServices>{
   void updateHotelRate(Long hotelId, Double newRate);

}
