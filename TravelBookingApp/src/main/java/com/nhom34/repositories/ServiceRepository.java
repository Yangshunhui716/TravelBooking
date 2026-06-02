package com.nhom34.repositories;

import com.nhom34.pojo.Services;


public interface ServiceRepository {
    Services getServiceById(Long id);
    Services addService(Services service);
    void updateStatus(Long id, boolean status);
    void deleteService(Long id);
    boolean checkOwner(Long provId, Long id);
    void updateImg(String img, Long id);
    void updateService(Services s);
}
