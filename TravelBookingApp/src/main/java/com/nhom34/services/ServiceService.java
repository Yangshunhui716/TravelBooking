package com.nhom34.services;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Services;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;


public interface ServiceService {
    Services getServiceById(Long id);
    Services addService(Map<String, String> info, Providers prov);
    void updateStatus(Long id, boolean status);
    void deleteService(Long id);
    boolean checkOwner(Long provId, Long id);
    boolean checkAvailableSlots(int slotsOrder,Long id);
    void updateImg(MultipartFile img, Long id);
}
