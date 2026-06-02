package com.nhom34.repositories;


import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import java.util.List;
import java.util.Map;

public interface ProviderRepository {
    Providers addProv(Providers newProv);
    List<Providers> getProv();
    Providers getProvById(Long id);
    List<Users> getProvUser(List<Providers> p);
    List<TransportServices> getTransportServices(Long provId);
    List<HotelRoomServices> getHotelRoomServices(Long provId);
    List<TourServices> getTourServices(Long provId);
    Providers updatePartial(Map<String, String> params, Long id);
}
