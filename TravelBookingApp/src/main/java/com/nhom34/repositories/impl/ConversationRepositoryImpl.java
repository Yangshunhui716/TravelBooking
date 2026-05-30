/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.repositories.impl;

import com.nhom34.pojo.Conversation;
import com.nhom34.repositories.ConversationRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

/**
 *
 * @author PC
 */
@Repository
public class ConversationRepositoryImpl implements ConversationRepository{
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public void setUnreadForProvider(Conversation conversation, int amount) {
        Session s = this.factory.getObject().getCurrentSession();
        conversation.setProviderUnread(amount);
        s.merge(conversation);
    }

    @Override
    public void setUnreadForCustomer(Conversation conversation, int amount) {
        Session s = this.factory.getObject().getCurrentSession();
        conversation.setCustomerUnread(amount);
        s.merge(conversation);    }

    @Override
    public void setLastMessage(Conversation conversation, String message) {
        Session s = this.factory.getObject().getCurrentSession();
        conversation.setLastMessage(message);
        conversation.setUpdatedAt(new Date());
        s.merge(conversation);
    }

    @Override
    public void createConversation(Conversation newConversation) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(newConversation);
    }

    @Override
    public List<Conversation> getConversationsByCustomerId(Long cusId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<Conversation> query = builder.createQuery(Conversation.class);
        Root rC = query.from(Conversation.class);
        query.where(builder.equal(rC.get("customer").get("id"), cusId));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Conversation> getConversationsByProviderId(Long provId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder builder = s.getCriteriaBuilder();
        CriteriaQuery<Conversation> query = builder.createQuery(Conversation.class);
        Root rC = query.from(Conversation.class);
        query.where(builder.equal(rC.get("provider").get("id"),provId));
        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public Conversation getConversationById(String id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Conversation.class, id);
    }
    
}
