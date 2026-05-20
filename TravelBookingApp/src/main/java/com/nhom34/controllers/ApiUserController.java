/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.Users;
import com.nhom34.services.UserService;
import com.nhom34.utils.JwtUtils;
import java.util.Collections;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    @PatchMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ADMIN')")
    public void updatePartial(@PathVariable(value = "userId") int id, @RequestBody Map<String, String> params){
        if (params.containsKey("is_active")) {
            String activeStr = params.get("is_active");
            boolean isActive = Boolean.parseBoolean(activeStr); 
            this.userService.updateActive(id, isActive);
        }
    }
    
    @PostMapping("/auth/register")
    public ResponseEntity<Users> create(@RequestParam Map<String, String> info, 
            @RequestParam(value = "avatar") MultipartFile avatar) {
        Users u = this.userService.addUser(info, avatar);
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }
    
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> login) {

        if (this.userService.authenticate(login.get("username"), login.get("password"))) {
            try {
                String token = JwtUtils.generateToken(login.get("username"));
                return ResponseEntity.ok().body(Collections.singletonMap("token", token));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Lỗi khi tạo JWT");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai thông tin đăng nhập");
    }
}
