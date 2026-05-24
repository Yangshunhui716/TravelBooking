/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.HotelRoomServices;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.TourServices;
import com.nhom34.pojo.TransportServices;
import com.nhom34.pojo.Users;
import com.nhom34.services.ProviderService;
import com.nhom34.services.TourService;
import com.nhom34.services.TransportService;
import com.nhom34.services.HotelService;
import com.nhom34.services.ServiceService;
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author PC
 */
@RestController
@RequestMapping("/api/secure/provider")
@PreAuthorize("hasRole('PROVIDER')")
@CrossOrigin
public class ApiProviderController {
    @Autowired
    private ServiceService servService;
    @Autowired
    private ProviderService provService;
    @Autowired
    private TourService tourService;
    @Autowired
    private TransportService transpotService;
    @Autowired
    private HotelService hotelRoomService;
    @Autowired
    private UserService userService;
    
    @GetMapping("/tour-services")
    public ResponseEntity<List<TourServices>> getTourServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getTourServices(user.getId()),HttpStatus.OK);
    }
    
    @GetMapping("/transport-services")
    public ResponseEntity<List<TransportServices>> getTransportServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getTransportServices(user.getId()),HttpStatus.OK);
    } 
    
    @GetMapping("/hotel-room-services")
    public ResponseEntity<List<HotelRoomServices>> getHotelRoomServices(Principal principal) {
        Users user = this.userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(this.provService.getHotelRoomServices(user.getId()),HttpStatus.OK);
    }
    
    @PostMapping("/tour-services")
    public ResponseEntity<TourServices> addTourService(@RequestParam Map<String, String> info, 
            @RequestParam(value = "img") MultipartFile img, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        return new ResponseEntity<>(this.tourService.addTourService(info, img, provider),HttpStatus.CREATED);
    }
    
    @PostMapping("/transport-services")
    public ResponseEntity<TransportServices> addTransportService(@RequestParam Map<String, String> info, 
            @RequestParam(value = "img") MultipartFile img, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        return new ResponseEntity<>(this.transpotService.addTransportService(info, img, provider),HttpStatus.CREATED);
    } 
    
    @PostMapping("/hotel-room-services")
    public ResponseEntity<HotelRoomServices> addHotelRoomService(@RequestParam Map<String, String> info, 
            @RequestParam(value = "img") MultipartFile img, Principal principal) {
        Providers provider = this.provService.getProvByUsername(principal.getName());
        return new ResponseEntity<>(this.hotelRoomService.addHotelRoomService(info, img, provider),HttpStatus.CREATED);
    }
    
    @PatchMapping("/tour-services/{serviceId}")
    public ResponseEntity<?> updateTourService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(this.servService.checkOwner(servId, provider.getId())){
            return new ResponseEntity<>(this.tourService.updatePartial(params, servId),HttpStatus.CREATED);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @PatchMapping("/transport-services/{serviceId}")
    public ResponseEntity<?> updateTransportService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(this.servService.checkOwner(servId, provider.getId())){
            return new ResponseEntity<>(this.transpotService.updatePartial(params, servId),HttpStatus.CREATED);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
    
    @PatchMapping("/hotel-room-services/{serviceId}")
    public ResponseEntity<?> updateHotelRoomService(@PathVariable(value = "serviceId") Long servId, @RequestBody Map<String, String> params,
            Principal principal){
        if (params==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tồn tại các giá trị và tham số yêu cầu cập nhật");
        }
        Providers provider = this.provService.getProvByUsername(principal.getName());
        if(this.servService.checkOwner(servId, provider.getId())){
            return new ResponseEntity<>(this.hotelRoomService.updatePartial(params, servId),HttpStatus.CREATED);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dịch vụ không thuộc nhà cung cấp");
        }
    }
}
