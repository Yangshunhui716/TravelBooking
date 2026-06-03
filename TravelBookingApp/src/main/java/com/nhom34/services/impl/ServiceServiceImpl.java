package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@Transactional
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    private ServiceRepository serviceRepo;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Services getServiceById(Long id) {
        return this.serviceRepo.getServiceById(id);
    }

    @Override
    public Services addService(Map<String, String> info, Providers prov) {
        Services newService = new Services();
        
        newService.setName(info.get("name"));
        newService.setPrice(Double.parseDouble(info.get("price")));
        newService.setDescription(info.get("description"));
        newService.setDestination(info.get("destination"));
        newService.setAvailableSlots(Integer.parseInt(info.get("slots")));
        newService.setSlots(Integer.parseInt(info.get("slots")));
        newService.setStatus(true);
        newService.setCreatedAt(new Date());
        newService.setUpdatedAt(new Date());
        newService.setProviderId(prov);
        
        return this.serviceRepo.addService(newService);
    }

    @Override
    public void updateStatus(Long id, boolean status) {
        this.serviceRepo.updateStatus(id, status);
    }

    @Override
    public boolean checkOwner(Long provId, Long id) {
        return this.serviceRepo.checkOwner(provId, id);
    }

    @Override
    public void deleteService(Long id) {
        this.serviceRepo.deleteService(id);
    }

    @Override
    public boolean updateAvailableSlots(int slotsOrder, Long id, int serviceDuration, Date serviceStartDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(serviceStartDate);
        cal.add(Calendar.DAY_OF_MONTH, serviceDuration);
        Date serviceEndDate = cal.getTime();
        int availableSlot = this.hotelService.getAvailableSlots(id, serviceStartDate, serviceEndDate);
        if(availableSlot>=slotsOrder){
            return true;
        }else{
            Services s = this.serviceRepo.getServiceById(id);
            if(slotsOrder<=s.getAvailableSlots()){
                s.setAvailableSlots(s.getAvailableSlots()-slotsOrder);
                if(s.getAvailableSlots()<=0){
                    s.setStatus(false);
                }
                this.serviceRepo.updateService(s);
                return true;
            }else{
                return false;
            }
        }
    }
    
    @Override
    public void updateImg(MultipartFile img, Long id) {
        String imgUrl=null;
        if (!img.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(img.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                imgUrl = res.get("secure_url").toString();
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                throw new RuntimeException("Xảy ra lỗi khi tải ảnh lên hệ thống");
            }
        }
        this.serviceRepo.updateImg(imgUrl, id);
    }
}
