package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Bookings;
import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.repositories.ServiceRepository;
import com.nhom34.services.BookingService;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TourService;
import com.nhom34.services.TransportService;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
    private TransportService transportService;
    @Autowired
    private TourService tourService;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private BookingService bookingService;

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
        Services s = this.getServiceById(id);
        if(!s.getStatus()==status) s.setStatus(status);
        this.serviceRepo.updateService(s);
    }

    @Override
    public boolean checkOwner(Long provId, Long id) {
        return this.serviceRepo.getServiceById(id).getProviderId().getId().equals(provId);
    }

    @Override
    public boolean deleteService(Long id) {
        List<Bookings> bookings = this.bookingService.getBookingsByServiceId(id);
        if(bookings == null || bookings.isEmpty()){
            Services s = this.getServiceById(id);
            this.serviceRepo.deleteService(s);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateAvailableSlots(int slotsOrder, Long id, int serviceDuration, Date serviceStartDate) {
        HotelRoomServices hotel = this.hotelService.getDetailServiceById(id);
        if (hotel != null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(serviceStartDate);
            cal.add(Calendar.DAY_OF_MONTH, serviceDuration);
            Date serviceEndDate = cal.getTime();
            int availableSlot = this.hotelService.getAvailableSlots(id, serviceStartDate, serviceEndDate);
            return availableSlot >= slotsOrder;
        } else {
            Services s = this.serviceRepo.getServiceById(id);
            if (slotsOrder <= s.getAvailableSlots()) {
                s.setAvailableSlots(s.getAvailableSlots() - slotsOrder);
                if (s.getAvailableSlots() <= 0) {
                    s.setStatus(false);
                }
                this.serviceRepo.updateService(s);
                return true;
            } else {
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
        Services s = this.getServiceById(id);
        s.setImgUrl(imgUrl);
        this.serviceRepo.updateService(s);
    }
}
