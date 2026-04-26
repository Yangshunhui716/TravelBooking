/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nhom34.repositories.UserRepository;
import com.nhom34.services.UserService;
import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author QUANG AN
 */
@Service("userDetailsService")
@Transactional
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<Users> getUser() {
        return this.userRepo.getUser();
    }

    @Override
    public List<Users> getUserProvider(List<Providers> p) {
        return this.userRepo.getUserProvider(p);
    }
     @Override
    public Users getUserById(int id) {
        return this.userRepo.getUserById(id);
    }

    @Override
    public void updateActive(int id) {
         this.userRepo.updateActive(id);
    }
        @Override
    public Users getUserByUsername(String username) {
        return this.userRepo.getUserByUserName(username);
    }

    @Override
    public Users addUser(Map<String, String> info, MultipartFile avatar) {
        Users u = new Users();
        u.setPhone(info.get("phone"));
        u.setUsername(info.get("username"));
        u.setPassword(this.passwordEncoder.encode(info.get("password")));
        u.setCreatedAt(new Date());
        u.setUpdatedAt(new Date());
        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        
        return this.userRepo.addUser(u);
    }
        @Override
    public boolean authenticate(String username, String password) {
        return this.userRepo.authenticate(username, password);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users u = this.userRepo.getUserByUserName(username);
        if (u == null)
            throw new UsernameNotFoundException("Invalid username!");
        
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(u.getRole()));
        System.out.println("Username: " + u.getUsername());
        System.out.println("Role: " + u.getRole());
        System.out.println("Password: " + u.getPassword());
        return new org.springframework.security.core.userdetails.User(u.getUsername(), 
                u.getPassword(), authorities);

    }

       


       
    
    
}
