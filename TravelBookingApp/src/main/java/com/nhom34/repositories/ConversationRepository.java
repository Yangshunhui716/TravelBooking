/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories;

import com.nhom34.pojo.Conversation;
import com.nhom34.pojo.Customers;
import com.nhom34.pojo.Providers;
import com.nhom34.pojo.Users;
import java.util.List;

/**
 *
 * @author PC
 */
public interface ConversationRepository {
    void setUnreadForProvider(Conversation conversation, int amount);
    void setUnreadForCustomer(Conversation conversation, int amount);
    void setLastMessage(Conversation conversation, String message);
    Conversation createConversation(Conversation newConversation);
    List<Conversation> getConversationsByCustomerId(Long cusId);
    List<Conversation> getConversationsByProviderId(Long provId);
    Conversation getConversationById(String id);
}
