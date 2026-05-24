/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import java.util.Map;
import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Users;

/**
 *
 * @author PC
 */
public interface AdminService {
    Admins addAdmin(Map<String, String> info, Users u);
}
