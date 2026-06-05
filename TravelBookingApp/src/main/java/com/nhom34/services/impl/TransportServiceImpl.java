package com.nhom34.services.impl;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import com.nhom34.pojo.TransportServices;
import com.nhom34.repositories.TransportRepository;
import com.nhom34.services.ServiceService;
import com.nhom34.services.TransportService;
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
            TransportServices serv = this.getDetailServiceById(id);
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
            if(params.containsKey("locationDetail")){
                serv.setLoactionDetail(params.get("locationDetail"));
            }
            serv.getServices().setUpdatedAt(new Date());
            return this.transportRepo.updatePartial(serv);
        }
    }

    @Override
    @EventListener(ContextRefreshedEvent.class)
    @Scheduled(cron = "0 0/10 * * * ?")
    public void autoUpdateStatusByCheckDate() {
        this.transportRepo.autoUpdateStatusByCheckDate();
    }
    
    @Override
    public void delete(Long id) {
        TransportServices t = this.getDetailServiceById(id);
        if(t!=null){
            this.transportRepo.delete(t);
        }
    }
}
