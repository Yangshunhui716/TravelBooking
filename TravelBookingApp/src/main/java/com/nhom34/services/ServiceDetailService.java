package com.nhom34.services;

import com.nhom34.pojo.Providers;
import java.util.List;
import java.util.Map;


public interface ServiceDetailService<T> {
    List<T> getDetailServices(Map<String, String> params);
    T getDetailServiceById(Long id);
    T addDetailService(Map<String, String> info, Providers prov);
    T updatePartial(Map<String, String> params, Long id);
    void delete(Long id);
}
