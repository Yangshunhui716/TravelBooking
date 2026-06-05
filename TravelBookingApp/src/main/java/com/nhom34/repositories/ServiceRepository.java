package com.nhom34.repositories;

import com.nhom34.pojo.Services;


public interface ServiceRepository {
    Services getServiceById(Long id);
    Services addService(Services service);
    void deleteService(Services service);
    void updateService(Services service);
}
