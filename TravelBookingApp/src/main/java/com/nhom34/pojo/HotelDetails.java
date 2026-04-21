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
@Table(name = "hotel_details")
@NamedQueries({
    @NamedQuery(name = "HotelDetails.findAll", query = "SELECT h FROM HotelDetails h"),
    @NamedQuery(name = "HotelDetails.findById", query = "SELECT h FROM HotelDetails h WHERE h.id = :id"),
    @NamedQuery(name = "HotelDetails.findByRoomType", query = "SELECT h FROM HotelDetails h WHERE h.roomType = :roomType"),
    @NamedQuery(name = "HotelDetails.findByCheckinTime", query = "SELECT h FROM HotelDetails h WHERE h.checkinTime = :checkinTime"),
    @NamedQuery(name = "HotelDetails.findByCheckoutTime", query = "SELECT h FROM HotelDetails h WHERE h.checkoutTime = :checkoutTime"),
    @NamedQuery(name = "HotelDetails.findByAddress", query = "SELECT h FROM HotelDetails h WHERE h.address = :address")})
public class HotelDetails implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Size(max = 100)
    @Column(name = "room_type")
    private String roomType;
    @Column(name = "checkin_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date checkinTime;
    @Column(name = "checkout_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date checkoutTime;
    @Size(max = 255)
    @Column(name = "address")
    private String address;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Services services;

    public HotelDetails() {
    }

    public HotelDetails(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Date getCheckinTime() {
        return checkinTime;
    }

    public void setCheckinTime(Date checkinTime) {
        this.checkinTime = checkinTime;
    }

    public Date getCheckoutTime() {
        return checkoutTime;
    }

    public void setCheckoutTime(Date checkoutTime) {
        this.checkoutTime = checkoutTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
        if (!(object instanceof HotelDetails)) {
            return false;
        }
        HotelDetails other = (HotelDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.HotelDetails[ id=" + id + " ]";
    }
    
}
