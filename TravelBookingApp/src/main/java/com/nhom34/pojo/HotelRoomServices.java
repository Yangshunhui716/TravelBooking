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

@Entity
@Table(name = "hotel_room_services")
@NamedQueries({
    @NamedQuery(name = "HotelRoomServices.findAll", query = "SELECT h FROM HotelRoomServices h"),
    @NamedQuery(name = "HotelRoomServices.findById", query = "SELECT h FROM HotelRoomServices h WHERE h.id = :id"),
    @NamedQuery(name = "HotelRoomServices.findByHotelName", query = "SELECT h FROM HotelRoomServices h WHERE h.hotelName = :hotelName"),
    @NamedQuery(name = "HotelRoomServices.findByAddress", query = "SELECT h FROM HotelRoomServices h WHERE h.address = :address"),
    @NamedQuery(name = "HotelRoomServices.findByRate", query = "SELECT h FROM HotelRoomServices h WHERE h.rate = :rate")})
public class HotelRoomServices implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "hotel_name")
    private String hotelName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "address")
    private String address;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "rate")
    private Double rate;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Services services;

    public HotelRoomServices() {
    }

    public HotelRoomServices(Long id) {
        this.id = id;
    }

    public HotelRoomServices(Long id, String hotelName, String address) {
        this.id = id;
        this.hotelName = hotelName;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
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
        if (!(object instanceof HotelRoomServices)) {
            return false;
        }
        HotelRoomServices other = (HotelRoomServices) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.HotelRoomServices[ id=" + id + " ]";
    }
    
}
