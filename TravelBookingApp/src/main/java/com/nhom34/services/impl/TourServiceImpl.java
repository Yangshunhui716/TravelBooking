package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.TourRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TourService;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class TourServiceImpl implements TourService{
    @Autowired
    private TourRepository tourRepo;
    @Autowired
    private ServiceService serviceService;
    
    @Override
    public List<TourServices> getDetailServices(Map<String, String> params) {
        return this.tourRepo.getDetailServices(params);

    }
    @Override
    public TourServices getDetailServiceById(Long id) {
        return this.tourRepo.getDetailServiceById(id);
    }

    @Override
    public TourServices addDetailService(Map<String, String> info, Providers prov) {
        TourServices newTour = new TourServices();
        Services newService = this.serviceService.addService(info, prov);
        
        newTour.setDepartureTime(new Timestamp(Long.parseLong(info.get("departureTime"))));
        newTour.setDurationDays(Integer.parseInt(info.get("durationDays")));
        newTour.setServices(newService);
        newTour.setId(newService.getId());

        return this.tourRepo.addDetailService(newTour);
    }
    
    @Override
    public TourServices updatePartial(Map<String, String> params, Long id) {
        if(params.containsKey("status")){
            this.serviceService.updateStatus(id, Boolean.parseBoolean(params.get("status")));
            return this.tourRepo.getDetailServiceById(id);
        }
        else{
            return this.tourRepo.updatePartial(params, id);
        }
    }

    @Override
    @EventListener(ContextRefreshedEvent.class)
    @Scheduled(cron = "0 0/10 * * * ?")
    public void autoUpdateStatusByCheckDate() {
        this.tourRepo.autoUpdateStatusByCheckDate();
    }
}
