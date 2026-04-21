/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;


import com.nhom34.pojo.Providers;
import com.nhom34.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.nhom34.services.UserService;
import java.util.List;

/**
 *
 * @author QUANG AN
 */
@Controller
public class HomeController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private ProviderService provService;
    
    @RequestMapping("/")
    public String index(Model model){
        List<Providers> p = this.provService.getProv();
        model.addAttribute("Providers", p);
        model.addAttribute("UserProviders", this.userService.getUserProvider(p));
        return "providers";
        
        
    }
    
    
}
