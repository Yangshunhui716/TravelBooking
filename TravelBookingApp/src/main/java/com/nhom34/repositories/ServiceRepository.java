/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Services;
import java.util.List;

/**
 *
 * @author QUANG AN
 */
public interface ServiceRepository {
    Services getServiceById(Long id);
    Services addService(Services service);
    void updateStatus(Long id, boolean status);
    void deleteService(Long id);
    boolean checkOwner(Long provId, Long id);
    void updateImg(String img, Long id);
}
