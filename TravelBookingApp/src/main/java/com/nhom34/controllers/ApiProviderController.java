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
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

        return new ResponseEntity<>(
                this.provService.getTourServices(user.getId()),
                HttpStatus.OK
        );
    }

    @GetMapping("/transport-services")
    public ResponseEntity<List<TransportServices>> getTransportServices(Principal principal) {

        Users user = this.userService.getUserByUsername(principal.getName());

        return new ResponseEntity<>(
                this.provService.getTransportServices(user.getId()),
                HttpStatus.OK
        );
    }

    @GetMapping("/hotel-room-services")
    public ResponseEntity<List<HotelRoomServices>> getHotelRoomServices(Principal principal) {

        Users user = this.userService.getUserByUsername(principal.getName());

        return new ResponseEntity<>(
                this.provService.getHotelRoomServices(user.getId()),
                HttpStatus.OK
        );
    }

    @PostMapping(
            value = "/tour-services",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<TourServices> addTourService(
            @RequestParam Map<String, String> info,
            @RequestParam("img") MultipartFile img,
            Principal principal
    ) {
        System.out.println("IMG = " + img);

        if (img != null) {
            System.out.println("FILE NAME = " + img.getOriginalFilename());
            System.out.println("EMPTY = " + img.isEmpty());
        }
        Users user = this.userService.getUserByUsername(principal.getName());

        Providers provider = this.provService.getProvById(user.getId());

        return new ResponseEntity<>(
                this.tourService.addTourService(info, img, provider),
                HttpStatus.CREATED
        );
    }

    @PostMapping(
            value = "/transport-services",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<TransportServices> addTransportService(
            @RequestParam Map<String, String> info,
            @RequestParam("img") MultipartFile img,
            Principal principal
    ) {

        Users user = this.userService.getUserByUsername(principal.getName());

        Providers provider = this.provService.getProvById(user.getId());

        return new ResponseEntity<>(
                this.transpotService.addTransportService(info, img, provider),
                HttpStatus.CREATED
        );
    }

    @PostMapping(
            value = "/hotel-room-services",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<HotelRoomServices> addHotelRoomService(
            @RequestParam Map<String, String> info,
            @RequestParam("img") MultipartFile img,
            Principal principal
    ) {

        Users user = this.userService.getUserByUsername(principal.getName());

        Providers provider = this.provService.getProvById(user.getId());

        return new ResponseEntity<>(
                this.hotelRoomService.addHotelRoomService(info, img, provider),
                HttpStatus.CREATED
        );
    }
}