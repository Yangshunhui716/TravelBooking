/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.services;

import com.nhom34.pojo.Conversation;
import com.nhom34.pojo.Users;
import java.util.List;

/**
 *
 * @author PC
 */
public interface ConversationService {
    void setReaded(Users user, String conversationId);
    void setLastMessage(Users user, String conversationId, String message);
    Conversation createConversation(Users currentUser, Users targetUser);
    List<Conversation> getConversationsByUser(Users user);
}
