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
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

/**
 *
 * @author QUANG AN
 */
@Entity
@Table(name = "transport_details")
@NamedQueries({
    @NamedQuery(name = "TransportDetails.findAll", query = "SELECT t FROM TransportDetails t"),
    @NamedQuery(name = "TransportDetails.findById", query = "SELECT t FROM TransportDetails t WHERE t.id = :id"),
    @NamedQuery(name = "TransportDetails.findByTransportType", query = "SELECT t FROM TransportDetails t WHERE t.transportType = :transportType"),
    @NamedQuery(name = "TransportDetails.findByFromLocation", query = "SELECT t FROM TransportDetails t WHERE t.fromLocation = :fromLocation"),
    @NamedQuery(name = "TransportDetails.findByDescriptionLocation", query = "SELECT t FROM TransportDetails t WHERE t.descriptionLocation = :descriptionLocation")})
public class TransportDetails implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Size(max = 100)
    @Column(name = "transport_type")
    private String transportType;
    @Size(max = 255)
    @Column(name = "from_location")
    private String fromLocation;
    @Size(max = 255)
    @Column(name = "description_location")
    private String descriptionLocation;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Services services;

    public TransportDetails() {
    }

    public TransportDetails(Long id) {
        this.id = id;
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

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getDescriptionLocation() {
        return descriptionLocation;
    }

    public void setDescriptionLocation(String descriptionLocation) {
        this.descriptionLocation = descriptionLocation;
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
        if (!(object instanceof TransportDetails)) {
            return false;
        }
        TransportDetails other = (TransportDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.TransportDetails[ id=" + id + " ]";
    }
    
}
