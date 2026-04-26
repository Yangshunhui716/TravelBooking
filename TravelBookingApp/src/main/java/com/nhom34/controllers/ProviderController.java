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
import org.springframework.web.bind.annotation.RestController;
import com.nhom34.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
/**
 *
 * @author QUANG AN
 */
@Controller
@RequestMapping("/admin")
public class ProviderController {
    @Autowired
    private ProviderService provService;
    @Autowired
    private UserService userService;
    
    @GetMapping("/providers")
    public String createView(Model model){
        List<Providers> p = this.provService.getProv();
        model.addAttribute("Providers", p);
        model.addAttribute("UserProviders", this.userService.getUserProvider(p));
        return "providers";
        
    }
    
}
