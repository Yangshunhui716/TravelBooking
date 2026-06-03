package com.nhom34.services.impl;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.HotelRepository;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
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
    public HotelRoomServices updatePartial(Map<String, String> params, Long id) {
        if(params.containsKey("status")){
            this.serviceService.updateStatus(id, Boolean.parseBoolean(params.get("status")));
            return this.hotelRepo.getDetailServiceById(id);
        }
        else{
            return this.hotelRepo.updatePartial(params, id); 
        }
    }

    @Override
    public int getAvailableSlots(Long id, Date startDate, Date endDate) {
        return this.hotelRepo.getAvailableSlots(id, startDate, endDate);
    }

    @Override
    public int getAvailableSlots(Long id, Map<String, String> params) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date startDate = new Date();
        Date endDate = cal.getTime();
        
        if (params != null) {
            String startDateStr = params.get("startDate");
            String endDateStr = params.get("endDate");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            try {
                if (startDateStr != null && !startDateStr.trim().isEmpty()) {
                    startDate = sdf.parse(startDateStr);
                }
                if (endDateStr != null && !endDateStr.trim().isEmpty()) {
                    endDate = sdf.parse(endDateStr);
                }
            } catch (ParseException ex) {
                System.getLogger(HotelServiceImpl.class.getName())
                      .log(System.Logger.Level.ERROR, "Lỗi format ngày tháng", ex);
            }
        }
        return this.getAvailableSlots(id, startDate, endDate);
    }
}