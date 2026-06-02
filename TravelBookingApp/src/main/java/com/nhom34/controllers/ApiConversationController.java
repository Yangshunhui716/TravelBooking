/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.nhom34.pojo.Conversation;
import com.nhom34.pojo.Users;
import com.nhom34.services.ConversationService;
import com.nhom34.services.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author PC
 */
@RestController
@RequestMapping("/api/secure")
@CrossOrigin
public class ApiConversationController {
    @Autowired
    private UserService userService;
    @Autowired
    private ConversationService conversationService;
    
    @GetMapping("/firebase-token")
    public ResponseEntity<String> getFirebaseCustomToken(Principal principal) {
        try {
            Users u = this.userService.getUserByUsername(principal.getName());
            String customToken = FirebaseAuth.getInstance().createCustomToken(u.getId().toString());
            return new ResponseEntity<>(customToken, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); 
            return new ResponseEntity<>("Lỗi máy chủ khi tạo token Firebase", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(Principal principal) {
        Users u = this.userService.getUserByUsername(principal.getName());
        List<Conversation> conversations = this.conversationService.getConversationsByUser(u);
        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }
    
    @PostMapping("/conversations/{targetId}")
    public ResponseEntity<?> createConversation(@PathVariable(value = "targetId") Long targetId, Principal principal) {
        Users currentUser = this.userService.getUserByUsername(principal.getName());
        Users targetUser = this.userService.getUserById(targetId);

        if(targetUser==null || currentUser.getRole().equals(targetUser.getRole())){
            return new ResponseEntity<>("Đối tượng nhắn tin không hợp lệ", HttpStatus.BAD_REQUEST);
        }
        Conversation c = this.conversationService.createConversation(currentUser, targetUser);
        return new ResponseEntity<>(c, HttpStatus.OK);
    }
    
    @PatchMapping("/conversations/{conversationId}")
    public void getConversationDetail(@PathVariable("conversationId") String conversationId, @RequestBody Map<String, String> body, Principal principal) {
        Users u = this.userService.getUserByUsername(principal.getName());
        if(body.isEmpty()){
            this.conversationService.setReaded(u, conversationId);
        }else{
            this.conversationService.setLastMessage(u, conversationId, body.get("message"));
        }
    }

}
