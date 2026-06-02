package com.nhom34.controllers;

import com.nhom34.pojo.Providers;
import com.nhom34.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/provider")
@CrossOrigin
public class ApiPublicProviderController {
    @Autowired
    private ProviderService provService;
    
    @GetMapping("/{providerId}")
    public ResponseEntity<?> getProvider(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
    
    @GetMapping("/{providerId}/tour-services")
    public ResponseEntity<?> getProviderTourServices(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(this.provService.getTourServices(id), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
    
    @GetMapping("/{providerId}/hotel-room-services")
    public ResponseEntity<?> getProviderHotelRoomServices(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(this.provService.getHotelRoomServices(id), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
    
    @GetMapping("/{providerId}/transport-services")
    public ResponseEntity<?> getProviderTransportServices(@PathVariable(value = "providerId") Long id) {
        Providers p = this.provService.getProvById(id);
        if(p!=null){
            return new ResponseEntity<>(this.provService.getTransportServices(id), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại thông tin nhà cung cấp");
    }
}
