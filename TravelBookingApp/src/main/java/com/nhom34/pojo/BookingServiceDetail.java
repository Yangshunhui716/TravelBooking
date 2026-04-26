/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nhom34.pojo;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import java.io.Serializable;

/**
 *
 * @author QUANG AN
 */
@Entity
@Table(name = "booking_service_detail")
@NamedQueries({
    @NamedQuery(name = "BookingServiceDetail.findAll", query = "SELECT b FROM BookingServiceDetail b"),
    @NamedQuery(name = "BookingServiceDetail.findById", query = "SELECT b FROM BookingServiceDetail b WHERE b.id = :id"),
    @NamedQuery(name = "BookingServiceDetail.findByUnitPrice", query = "SELECT b FROM BookingServiceDetail b WHERE b.unitPrice = :unitPrice"),
    @NamedQuery(name = "BookingServiceDetail.findBySubtotal", query = "SELECT b FROM BookingServiceDetail b WHERE b.subtotal = :subtotal"),
    @NamedQuery(name = "BookingServiceDetail.findByQuantity", query = "SELECT b FROM BookingServiceDetail b WHERE b.quantity = :quantity")})
public class BookingServiceDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "unit_price")
    private Double unitPrice;
    @Column(name = "subtotal")
    private Double subtotal;
    @Column(name = "quantity")
    private Integer quantity;
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @ManyToOne
    private Bookings bookingId;
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    @ManyToOne
    private Services serviceId;

    public BookingServiceDetail() {
    }

    public BookingServiceDetail(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Bookings getBookingId() {
        return bookingId;
    }

    public void setBookingId(Bookings bookingId) {
        this.bookingId = bookingId;
    }

    public Services getServiceId() {
        return serviceId;
    }

    public void setServiceId(Services serviceId) {
        this.serviceId = serviceId;
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
        if (!(object instanceof BookingServiceDetail)) {
            return false;
        }
        BookingServiceDetail other = (BookingServiceDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.BookingServiceDetail[ id=" + id + " ]";
    }
    
}
