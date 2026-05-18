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
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToOne;
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
@Table(name = "transport_services")
@NamedQueries({
    @NamedQuery(name = "TransportServices.findAll", query = "SELECT t FROM TransportServices t"),
    @NamedQuery(name = "TransportServices.findById", query = "SELECT t FROM TransportServices t WHERE t.id = :id"),
    @NamedQuery(name = "TransportServices.findByTransportType", query = "SELECT t FROM TransportServices t WHERE t.transportType = :transportType"),
    @NamedQuery(name = "TransportServices.findByDepartureLocation", query = "SELECT t FROM TransportServices t WHERE t.departureLocation = :departureLocation"),
    @NamedQuery(name = "TransportServices.findByEndLoaction", query = "SELECT t FROM TransportServices t WHERE t.endLoaction = :endLoaction"),
    @NamedQuery(name = "TransportServices.findByTicketType", query = "SELECT t FROM TransportServices t WHERE t.ticketType = :ticketType"),
    @NamedQuery(name = "TransportServices.findByDepartureTime", query = "SELECT t FROM TransportServices t WHERE t.departureTime = :departureTime"),
    @NamedQuery(name = "TransportServices.findByEndTime", query = "SELECT t FROM TransportServices t WHERE t.endTime = :endTime")})
public class TransportServices implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "transport_type")
    private String transportType;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "departure_location")
    private String departureLocation;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "end_loaction")
    private String endLoaction;
    @Size(max = 100)
    @Column(name = "ticket_type")
    private String ticketType;
    @Basic(optional = false)
    @NotNull
    @Column(name = "departure_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date departureTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "end_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Services services;

    public TransportServices() {
    }

    public TransportServices(Long id) {
        this.id = id;
    }

    public TransportServices(Long id, String transportType, String departureLocation, String endLoaction, Date departureTime, Date endTime) {
        this.id = id;
        this.transportType = transportType;
        this.departureLocation = departureLocation;
        this.endLoaction = endLoaction;
        this.departureTime = departureTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getDepartureLocation() {
        return departureLocation;
    }

    public void setDepartureLocation(String departureLocation) {
        this.departureLocation = departureLocation;
    }

    public String getEndLoaction() {
        return endLoaction;
    }

    public void setEndLoaction(String endLoaction) {
        this.endLoaction = endLoaction;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
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
        if (!(object instanceof TransportServices)) {
            return false;
        }
        TransportServices other = (TransportServices) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.TransportServices[ id=" + id + " ]";
    }
    
}
