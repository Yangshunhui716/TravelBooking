package com.nhom34.pojo;

import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import org.hibernate.annotations.BatchSize;

@Entity
@Table(name = "bookings")
@NamedQueries({
    @NamedQuery(name = "Bookings.findAll", query = "SELECT b FROM Bookings b"),
    @NamedQuery(name = "Bookings.findById", query = "SELECT b FROM Bookings b WHERE b.id = :id"),
    @NamedQuery(name = "Bookings.findByTotalAmount", query = "SELECT b FROM Bookings b WHERE b.totalAmount = :totalAmount"),
    @NamedQuery(name = "Bookings.findByBookingStatus", query = "SELECT b FROM Bookings b WHERE b.bookingStatus = :bookingStatus"),
    @NamedQuery(name = "Bookings.findByPaymentStatus", query = "SELECT b FROM Bookings b WHERE b.paymentStatus = :paymentStatus"),
    @NamedQuery(name = "Bookings.findByPaymentMethod", query = "SELECT b FROM Bookings b WHERE b.paymentMethod = :paymentMethod"),
    @NamedQuery(name = "Bookings.findByCreatedAt", query = "SELECT b FROM Bookings b WHERE b.createdAt = :createdAt"),
    @NamedQuery(name = "Bookings.findByUpdatedAt", query = "SELECT b FROM Bookings b WHERE b.updatedAt = :updatedAt")})
@BatchSize(size=20)
public class Bookings implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "total_amount")
    private double totalAmount;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "booking_status")
    private String bookingStatus;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "payment_status")
    private String paymentStatus;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "payment_method")
    private String paymentMethod;
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
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @ManyToOne
    private Customers customerId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "bookingId")
    private Collection<BookingsServiceDetail> bookingsServiceDetailCollection;

    public Bookings() {
    }

    public Bookings(Long id) {
        this.id = id;
    }

    public Bookings(Long id, double totalAmount, String bookingStatus, String paymentStatus, String paymentMethod, Date createdAt, Date updatedAt) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.bookingStatus = bookingStatus;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
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

    public Customers getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customers customerId) {
        this.customerId = customerId;
    }
    public Collection<BookingsServiceDetail> getBookingsServiceDetailCollection() {
    return bookingsServiceDetailCollection;
}

    public void setBookingsServiceDetailCollection(
            Collection<BookingsServiceDetail> bookingsServiceDetailCollection) {
        this.bookingsServiceDetailCollection = bookingsServiceDetailCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Bookings)) {
            return false;
        }
        Bookings other = (Bookings) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.Bookings[ id=" + id + " ]";
    }
    
    
}
