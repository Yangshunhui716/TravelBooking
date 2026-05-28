/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.services.HotelService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author QUANG AN
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiHotelController {
    @Autowired
    private HotelService hotelService;
    
    @GetMapping("/hotel-room-services")
    public ResponseEntity<List<HotelRoomServices>> list( @RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.hotelService.getDetailServices(params),HttpStatus.OK);
    }
    
    @GetMapping("/hotel-room-services/{serviceId}")
    public ResponseEntity<HotelRoomServices> retrieve(@PathVariable(value = "serviceId") Long id) {
        return new ResponseEntity<>((HotelRoomServices)this.hotelService.getDetailServiceById(id), HttpStatus.OK);
    }   
}
