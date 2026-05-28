/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.Providers;
import com.nhom34.services.ProviderService;
import com.nhom34.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author PC
 */
@RestController
@RequestMapping("/api/provider")
@CrossOrigin
public class ApiPublicProviderController {
    @Autowired
    private ProviderService provService;
    @Autowired
    private ServiceService serviceService;
    
    @GetMapping("/{providerId}")
    public ResponseEntity<?> getProvider(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
    
    @GetMapping("/{providerId}/services")
    public ResponseEntity<?> getProviderService(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(this.serviceService.getServicesByProviderId(id), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
}
