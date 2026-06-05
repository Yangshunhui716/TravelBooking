package com.nhom34.repositories;

import java.util.List;
import java.util.Map;

public interface ServiceDetailRepository<T> {
    List<T> getDetailServices(Map<String, String> params);
    T getDetailServiceById(Long id);
    T addDetailService(T serv);
    T updatePartial(T serv);
    void delete(T serv);
}
