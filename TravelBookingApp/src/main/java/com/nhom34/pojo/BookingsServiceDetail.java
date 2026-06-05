package com.nhom34.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import org.hibernate.annotations.BatchSize;

@Entity
@Table(name = "bookings_service_detail")
@NamedQueries({
    @NamedQuery(name = "BookingsServiceDetail.findAll", query = "SELECT b FROM BookingsServiceDetail b"),
    @NamedQuery(name = "BookingsServiceDetail.findById", query = "SELECT b FROM BookingsServiceDetail b WHERE b.id = :id"),
    @NamedQuery(name = "BookingsServiceDetail.findByUnitPrice", query = "SELECT b FROM BookingsServiceDetail b WHERE b.unitPrice = :unitPrice"),
    @NamedQuery(name = "BookingsServiceDetail.findBySubtotal", query = "SELECT b FROM BookingsServiceDetail b WHERE b.subtotal = :subtotal"),
    @NamedQuery(name = "BookingsServiceDetail.findByQuantity", query = "SELECT b FROM BookingsServiceDetail b WHERE b.quantity = :quantity"),
    @NamedQuery(name = "BookingsServiceDetail.findByServiceStartDate", query = "SELECT b FROM BookingsServiceDetail b WHERE b.serviceStartDate = :serviceStartDate"),
    @NamedQuery(name = "BookingsServiceDetail.findByServiceDuration", query = "SELECT b FROM BookingsServiceDetail b WHERE b.serviceDuration = :serviceDuration")})
@BatchSize(size=20)
public class BookingsServiceDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "unit_price")
    private double unitPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "subtotal")
    private double subtotal;
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private int quantity;
    @Basic(optional = false)
    @NotNull
    @Column(name = "service_start_date")
    @Temporal(TemporalType.DATE)
    private Date serviceStartDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "service_duration")
    private int serviceDuration;
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JsonIgnore
    private Bookings bookingId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    private Services serviceId;

    public BookingsServiceDetail() {
    }

    public BookingsServiceDetail(Long id) {
        this.id = id;
    }

    public BookingsServiceDetail(Long id, double unitPrice, double subtotal, int quantity, Date serviceStartDate, int serviceDuration) {
        this.id = id;
        this.unitPrice = unitPrice;
        this.subtotal = subtotal;
        this.quantity = quantity;
        this.serviceStartDate = serviceStartDate;
        this.serviceDuration = serviceDuration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getServiceStartDate() {
        return serviceStartDate;
    }

    public void setServiceStartDate(Date serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
    }

    public int getServiceDuration() {
        return serviceDuration;
    }

    public void setServiceDuration(int serviceDuration) {
        this.serviceDuration = serviceDuration;
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
        if (!(object instanceof BookingsServiceDetail)) {
            return false;
        }
        BookingsServiceDetail other = (BookingsServiceDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.BookingsServiceDetail[ id=" + id + " ]";
    }
    
}
