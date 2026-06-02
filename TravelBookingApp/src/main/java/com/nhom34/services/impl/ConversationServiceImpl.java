package com.nhom34.services.impl;

import com.nhom34.pojo.Conversation;
import com.nhom34.pojo.Users;
import com.nhom34.repositories.ConversationRepository;
import com.nhom34.services.ConversationService;
import com.nhom34.services.CustomerService;
import com.nhom34.services.ProviderService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ConversationServiceImpl implements ConversationService{
    @Autowired
    private ConversationRepository conversationRepo;
    @Autowired
    private ProviderService provSerivce;
    @Autowired
    private CustomerService cusSerivce;

    @Override
    @Transactional
    public void setReaded(Users user, String conversationId) {
        Conversation conversation = this.conversationRepo.getConversationById(conversationId);
        if(user.getRole().equals("ROLE_PROVIDER")&&conversation.getProvider().getId().equals(user.getId())){
            this.conversationRepo.setUnreadForProvider(conversation, 0);
        }
        else if(user.getRole().equals("ROLE_CUSTOMER")&&conversation.getCustomer().getId().equals(user.getId())){
            this.conversationRepo.setUnreadForCustomer(conversation, 0);
        }
    }

    @Override
    @Transactional
    public void setLastMessage(Users user, String conversationId, String message) {
        Conversation conversation = this.conversationRepo.getConversationById(conversationId);
        if(user.getRole().equals("ROLE_PROVIDER")&&conversation.getProvider().getId().equals(user.getId())){
            this.conversationRepo.setLastMessage(conversation, message);
            this.conversationRepo.setUnreadForCustomer(conversation, (conversation.getCustomerUnread()+1));
            this.conversationRepo.setUnreadForProvider(conversation, 0);
        }
        else if(user.getRole().equals("ROLE_CUSTOMER")&&conversation.getCustomer().getId().equals(user.getId())){
            this.conversationRepo.setLastMessage(conversation, message);
            this.conversationRepo.setUnreadForProvider(conversation, (conversation.getProviderUnread()+1));
            this.conversationRepo.setUnreadForCustomer(conversation, 0);
        }
    }

    @Override
    @Transactional
    public Conversation createConversation(Users currentUser, Users targetUser) {
        Long uid1 = Math.min(currentUser.getId(), targetUser.getId());
        Long uid2 = Math.max(currentUser.getId(), targetUser.getId());
        String conversationId = "user_" + uid1 + "_" + uid2;
        
        Conversation newConversation = this.conversationRepo.getConversationById(conversationId);
        
        if(newConversation==null){
            newConversation = new Conversation();
            
            if(currentUser.getRole().equals("ROLE_PROVIDER")){
                newConversation.setProvider(this.provSerivce.getProvById(currentUser.getId()));
                newConversation.setCustomer(this.cusSerivce.getCustomerByUserId(targetUser.getId()));
            }else{
                newConversation.setProvider(this.provSerivce.getProvById(targetUser.getId()));
                newConversation.setCustomer(this.cusSerivce.getCustomerByUserId(currentUser.getId()));
            }
            
            newConversation.setCustomerUnread(0);
            newConversation.setProviderUnread(0);
            newConversation.setCreatedAt(new Date());
            newConversation.setUpdatedAt(new Date());
            newConversation.setId(conversationId);
            
            return this.conversationRepo.createConversation(newConversation);
        }
        return newConversation;
    }

    @Override
    @Transactional
    public List<Conversation> getConversationsByUser(Users user) {
        if(user.getRole().equals("ROLE_PROVIDER")){
            return this.conversationRepo.getConversationsByProviderId(user.getId());
        }else if(user.getRole().equals("ROLE_CUSTOMER")){
            return this.conversationRepo.getConversationsByCustomerId(user.getId());
        }
        return null;
    }
    
}
