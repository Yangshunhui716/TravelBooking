/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.nhom34.pojo.Providers;
import com.nhom34.services.ProviderService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.nhom34.services.UserService;
import org.springframework.stereotype.Controller;
/**
 *
 * @author QUANG AN
 */
@Controller
@RequestMapping("/admin")
public class ProviderController {
    @Autowired
    private ProviderService provService;
    
    @GetMapping("/providers")
    public String createView(Model model){
        List<Providers> p = this.provService.getProv();
        model.addAttribute("Providers", p);
        model.addAttribute("UserProviders", this.provService.getProvUser(p));
        return "providers";
    }
}
