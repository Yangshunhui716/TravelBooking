/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import java.util.List;

/**
 *
 * @author QUANG AN
 */
public interface ProviderRepository {
    Providers addProv(Providers newProv);
    List<Providers> getProv();
    Providers getProvById(Long id);
    List<Users> getProvUser(List<Providers> p);
    List<TransportServices> getTransportServices(Long provId);
    List<HotelRoomServices> getHotelRoomServices(Long provId);
    List<TourServices> getTourServices(Long provId);
}
