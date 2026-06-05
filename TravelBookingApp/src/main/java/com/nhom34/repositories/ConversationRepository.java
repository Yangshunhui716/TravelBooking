package com.nhom34.repositories;

import com.nhom34.pojo.Conversation;
import java.util.List;

public interface ConversationRepository {
    void updateConversation(Conversation conversation);
    Conversation createConversation(Conversation newConversation);
    List<Conversation> getConversationsByCustomerId(Long cusId);
    List<Conversation> getConversationsByProviderId(Long provId);
    Conversation getConversationById(String id);
}
