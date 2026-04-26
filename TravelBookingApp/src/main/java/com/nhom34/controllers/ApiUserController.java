/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.Users;
import com.nhom34.services.ProviderService;
import com.nhom34.services.UserService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
@RestController
@RequestMapping("/api")
public class ApiUserController {
    @Autowired
    private UserService userService;
    @PostMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ADMIN')")
    public void update(@PathVariable(value = "userId") int id){
        this.userService.updateActive(id);
    }
      @PostMapping("/users")
    public ResponseEntity<Users> create(@RequestParam Map<String, String> info, 
            @RequestParam(value = "avatar") MultipartFile avatar) {
        Users u = this.userService.addUser(info, avatar);
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }


}
