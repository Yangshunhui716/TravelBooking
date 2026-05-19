/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.TourServices;
import com.nhom34.services.TourService;
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
public class ApiTourController {
    @Autowired
    private TourService tourService;
    
    @GetMapping("/tour-services")
    public ResponseEntity<List<TourServices>> list(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.tourService.getTourServices(params), HttpStatus.OK);
    }
    
    @GetMapping("/tour-services/{serviceId}")
    public ResponseEntity<TourServices> retrieve(@PathVariable(value = "serviceId") Long id) {
        return new ResponseEntity<>( this.tourService.getTourServiceById(id), HttpStatus.OK);
    }
}
