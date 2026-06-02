package com.nhom34.controllers;

import com.nhom34.pojo.TransportServices;
import com.nhom34.services.TransportService;
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


@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiTransportController {
    @Autowired
    private TransportService transportService;
    
    @GetMapping("/transport-services")
    public ResponseEntity<List<TransportServices>> list( @RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.transportService.getDetailServices(params),HttpStatus.OK);
    }
    
    @GetMapping("/transport-services/{serviceId}")
    public ResponseEntity<TransportServices> retrieve(@PathVariable(value = "serviceId") Long id) {
        return new ResponseEntity<>((TransportServices)this.transportService.getDetailServiceById(id),HttpStatus.OK);
    }   
}
