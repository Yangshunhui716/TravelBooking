package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TourServices;
import com.nhom34.repositories.TourRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TourService;
import java.sql.Timestamp;
import java.util.Date;
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
            TourServices serv = this.getDetailServiceById(id);
            if(params.containsKey("price")){
                serv.getServices().setPrice(Double.parseDouble(params.get("price")));
            }
            if(params.containsKey("slots")){
                int preSlots = serv.getServices().getSlots();
                int afterSlots = Integer.parseInt(params.get("slots"));
                int addSlots = afterSlots-preSlots;
                int availableSlots = serv.getServices().getAvailableSlots();
                if(addSlots>0){
                    serv.getServices().setSlots(afterSlots);
                    serv.getServices().setAvailableSlots(availableSlots+addSlots);
                }
            }
            if(params.containsKey("description")){
                serv.getServices().setDescription(params.get("description"));
            }
            if(params.containsKey("departureTime")){
                long newTimeInMillis = Long.parseLong(params.get("departureTime"));
                Date oldDepartureTime = serv.getDepartureTime();
                if (newTimeInMillis > System.currentTimeMillis() && newTimeInMillis > oldDepartureTime.getTime()) {
                    serv.setDepartureTime(new Timestamp(newTimeInMillis));
                }
            }
            serv.getServices().setUpdatedAt(new Date());
            return this.tourRepo.updatePartial(serv);
        }
    }

    @Override
    @EventListener(ContextRefreshedEvent.class)
    @Scheduled(cron = "0 0/10 * * * ?")
    public void autoUpdateStatusByCheckDate() {
        this.tourRepo.autoUpdateStatusByCheckDate();
    }
    
    @Override
    public void delete(Long id) {
        TourServices t = this.getDetailServiceById(id);
        if(t!=null){
            this.tourRepo.delete(t);
        }
    }
}
