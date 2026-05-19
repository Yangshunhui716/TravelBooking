/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

/**
 *
 * @author PC
 */
@Entity
@Table(name = "services")
@NamedQueries({
    @NamedQuery(name = "Services.findAll", query = "SELECT s FROM Services s"),
    @NamedQuery(name = "Services.findById", query = "SELECT s FROM Services s WHERE s.id = :id"),
    @NamedQuery(name = "Services.findByName", query = "SELECT s FROM Services s WHERE s.name = :name"),
    @NamedQuery(name = "Services.findByPrice", query = "SELECT s FROM Services s WHERE s.price = :price"),
    @NamedQuery(name = "Services.findByDestination", query = "SELECT s FROM Services s WHERE s.destination = :destination"),
    @NamedQuery(name = "Services.findByAvailableSlots", query = "SELECT s FROM Services s WHERE s.availableSlots = :availableSlots"),
    @NamedQuery(name = "Services.findByStatus", query = "SELECT s FROM Services s WHERE s.status = :status"),
    @NamedQuery(name = "Services.findByCreatedAt", query = "SELECT s FROM Services s WHERE s.createdAt = :createdAt"),
    @NamedQuery(name = "Services.findByUpdatedAt", query = "SELECT s FROM Services s WHERE s.updatedAt = :updatedAt"),
    @NamedQuery(name = "Services.findByIsActive", query = "SELECT s FROM Services s WHERE s.isActive = :isActive"),
    @NamedQuery(name = "Services.findByImgUrl", query = "SELECT s FROM Services s WHERE s.imgUrl = :imgUrl")})
public class Services implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private double price;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "destination")
    private String destination;
    @Basic(optional = false)
    @NotNull
    @Column(name = "available_slots")
    private int availableSlots;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "status")
    private String status;
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
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_active")
    private boolean isActive;
    @Size(max = 255)
    @Column(name = "img_url")
    private String imgUrl;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "services")
    private HotelRoomServices hotelRoomServices;
    @JsonIgnore
    @OneToMany(mappedBy = "serviceId")
    private Collection<Reviews> reviewsCollection;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "services")
    private TransportServices transportServices;
    @JoinColumn(name = "provider_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Providers providerId;
    @JsonIgnore
    @OneToMany(mappedBy = "serviceId")
    private Collection<BookingsServiceDetail> bookingsServiceDetailCollection;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "services")
    private TourServices tourServices;

    public Services() {
    }

    public Services(Long id) {
        this.id = id;
    }

    public Services(Long id, String name, double price, String destination, int availableSlots, String description, String status, Date createdAt, Date updatedAt, boolean isActive) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.destination = destination;
        this.availableSlots = availableSlots;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public int getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(int availableSlots) {
        this.availableSlots = availableSlots;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public HotelRoomServices getHotelRoomServices() {
        return hotelRoomServices;
    }

    public void setHotelRoomServices(HotelRoomServices hotelRoomServices) {
        this.hotelRoomServices = hotelRoomServices;
    }

    public Collection<Reviews> getReviewsCollection() {
        return reviewsCollection;
    }

    public void setReviewsCollection(Collection<Reviews> reviewsCollection) {
        this.reviewsCollection = reviewsCollection;
    }

    public TransportServices getTransportServices() {
        return transportServices;
    }

    public void setTransportServices(TransportServices transportServices) {
        this.transportServices = transportServices;
    }

    public Providers getProviderId() {
        return providerId;
    }

    public void setProviderId(Providers providerId) {
        this.providerId = providerId;
    }

    public Collection<BookingsServiceDetail> getBookingsServiceDetailCollection() {
        return bookingsServiceDetailCollection;
    }

    public void setBookingsServiceDetailCollection(Collection<BookingsServiceDetail> bookingsServiceDetailCollection) {
        this.bookingsServiceDetailCollection = bookingsServiceDetailCollection;
    }

    public TourServices getTourServices() {
        return tourServices;
    }

    public void setTourServices(TourServices tourServices) {
        this.tourServices = tourServices;
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
        if (!(object instanceof Services)) {
            return false;
        }
        Services other = (Services) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.Services[ id=" + id + " ]";
    }
    
}
