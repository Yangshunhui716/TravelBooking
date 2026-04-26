/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import java.util.List;

/**
 *
 * @author QUANG AN
 */
public interface UserRepository {
    List<Users> getUser();
    List<Users> getUserProvider(List<Providers> p);
    void updateActive(int id);
    Users getUserById(int id);
    Users getUserByUserName(String username);
    Users addUser(Users u);
    boolean authenticate(String username, String password);
    
}
