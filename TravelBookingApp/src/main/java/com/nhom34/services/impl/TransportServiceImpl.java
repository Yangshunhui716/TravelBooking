package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TransportService;
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
public class TransportServiceImpl implements TransportService{
    @Autowired
    private TransportRepository transportRepo;
    @Autowired
    private ServiceService serviceService;
    
    @Override
    public List<TransportServices> getDetailServices(Map<String, String> params) {
        return this.transportRepo.getDetailServices(params);
    }
    @Override
    public TransportServices getDetailServiceById(Long id) {
        return this.transportRepo.getDetailServiceById(id);
    }   

    @Override
    public TransportServices addDetailService(Map<String, String> info, Providers prov) {
        TransportServices newTransport = new TransportServices();
        Services newService = this.serviceService.addService(info, prov);
        
        newTransport.setDepartureTime(new Timestamp(Long.parseLong(info.get("departureTime"))));
        newTransport.setEndTime(new Timestamp(Long.parseLong(info.get("endTime"))));
        newTransport.setDeparture(info.get("departure"));
        newTransport.setLoactionDetail(info.get("locationDetail"));
        newTransport.setTicketType(info.get("ticketType"));
        newTransport.setTransportType(info.get("transportType"));
        newTransport.setServices(newService);
        newTransport.setId(newService.getId());

        return this.transportRepo.addDetailService(newTransport);
    }

    @Override
    public TransportServices updatePartial(Map<String, String> params, Long id) {
        if(params.containsKey("status")){
            this.serviceService.updateStatus(id, Boolean.parseBoolean(params.get("status")));
            return this.transportRepo.getDetailServiceById(id);
        }
        else{
            return this.transportRepo.updatePartial(params, id);
        }
    }

    @Override
    @EventListener(ContextRefreshedEvent.class)
    @Scheduled(cron = "0 0/10 * * * ?")
    public void autoUpdateStatusByCheckDate() {
        this.transportRepo.autoUpdateStatusByCheckDate();
    }
}
