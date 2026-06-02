package com.nhom34.repositories;

import java.util.List;
import java.util.Map;

public interface ServiceDetailRepository<T> {
    List<T> getDetailServices(Map<String, String> params);
    T getDetailServiceById(Long id);
    T addDetailService(T hotelRoom);
    T updatePartial(Map<String, String> params, Long id);
}
