package com.nhom34.services.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.HotelRepository;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class HotelServiceImpl implements HotelService{
    @Autowired
    private HotelRepository hotelRepo;
    @Autowired
    private ServiceService serviceService;
    
    @Override
    public List<HotelRoomServices> getDetailServices(Map<String, String> params) {
        return this.hotelRepo.getDetailServices(params);
    }

    @Override
    public HotelRoomServices getDetailServiceById(Long id) {
        return this.hotelRepo.getDetailServiceById(id);
    }

    @Override
    @Transactional
    public HotelRoomServices addDetailService(Map<String, String> info, Providers prov) {
        HotelRoomServices newHotelRoom = new HotelRoomServices();
        Services newService = this.serviceService.addService(info, prov);
        
        newHotelRoom.setHotelName(info.get("hotelName"));
        newHotelRoom.setAddress(info.get("address"));
        newHotelRoom.setServices(newService);
        newHotelRoom.setId(newService.getId());

        return this.hotelRepo.addDetailService(newHotelRoom);
    }
    
    @Override
    @Transactional
    public HotelRoomServices updatePartial(Map<String, String> params, Long id) {
        if(params.containsKey("status")){
            this.serviceService.updateStatus(id, Boolean.parseBoolean(params.get("status")));
            return this.hotelRepo.getDetailServiceById(id);
        }
        else{
            return this.hotelRepo.updatePartial(params, id);
        }
    }
}
