/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.pojo;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author PC
 */
@Entity
@Table(name = "conversation")
@NamedQueries({
    @NamedQuery(name = "Conversation.findAll", query = "SELECT c FROM Conversation c"),
    @NamedQuery(name = "Conversation.findById", query = "SELECT c FROM Conversation c WHERE c.id = :id"),
    @NamedQuery(name = "Conversation.findByLastMessage", query = "SELECT c FROM Conversation c WHERE c.lastMessage = :lastMessage"),
    @NamedQuery(name = "Conversation.findByProviderSeen", query = "SELECT c FROM Conversation c WHERE c.providerSeen = :providerSeen"),
    @NamedQuery(name = "Conversation.findByCustomerSeen", query = "SELECT c FROM Conversation c WHERE c.customerSeen = :customerSeen"),
    @NamedQuery(name = "Conversation.findByCreatedAt", query = "SELECT c FROM Conversation c WHERE c.createdAt = :createdAt"),
    @NamedQuery(name = "Conversation.findByUpdatedAt", query = "SELECT c FROM Conversation c WHERE c.updatedAt = :updatedAt")})
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "id")
    private String id;
    @Size(max = 255)
    @Column(name = "last_message")
    private String lastMessage;
    @Basic(optional = false)
    @NotNull
    @Column(name = "provider_seen")
    private short providerSeen;
    @Basic(optional = false)
    @NotNull
    @Column(name = "customer_seen")
    private short customerSeen;
    @Basic(optional = false)
    @NotNull
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Basic(optional = false)
    @NotNull
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    @JoinColumn(name = "customer", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Customers customer;
    @JoinColumn(name = "provider", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Providers provider;

    public Conversation() {
    }

    public Conversation(String id) {
        this.id = id;
    }

    public Conversation(String id, short providerSeen, short customerSeen, Date createdAt, Date updatedAt) {
        this.id = id;
        this.providerSeen = providerSeen;
        this.customerSeen = customerSeen;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public short getProviderSeen() {
        return providerSeen;
    }

    public void setProviderSeen(short providerSeen) {
        this.providerSeen = providerSeen;
    }

    public short getCustomerSeen() {
        return customerSeen;
    }

    public void setCustomerSeen(short customerSeen) {
        this.customerSeen = customerSeen;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public Providers getProvider() {
        return provider;
    }

    public void setProvider(Providers provider) {
        this.provider = provider;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Conversation)) {
            return false;
        }
        Conversation other = (Conversation) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.Conversation[ id=" + id + " ]";
    }
    
}
