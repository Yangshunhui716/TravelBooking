/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;


/**
 *
 * @author QUANG AN
 */

public interface UserService extends UserDetailsService{
    List<Users> getUser();
    List<Users> getUserProvider(List<Providers> p);
     void updateActive(int id);
    Users getUserById(int id);
    Users getUserByUsername(String username);
    Users addUser(Map<String, String> info, MultipartFile avatar);
    boolean authenticate(String username, String password);
    
}
