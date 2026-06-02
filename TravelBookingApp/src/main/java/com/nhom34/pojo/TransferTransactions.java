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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "transfer_transactions")
@NamedQueries({
    @NamedQuery(name = "TransferTransactions.findAll", query = "SELECT t FROM TransferTransactions t"),
    @NamedQuery(name = "TransferTransactions.findById", query = "SELECT t FROM TransferTransactions t WHERE t.id = :id"),
    @NamedQuery(name = "TransferTransactions.findByAmount", query = "SELECT t FROM TransferTransactions t WHERE t.amount = :amount"),
    @NamedQuery(name = "TransferTransactions.findByTransactionCode", query = "SELECT t FROM TransferTransactions t WHERE t.transactionCode = :transactionCode"),
    @NamedQuery(name = "TransferTransactions.findByStatus", query = "SELECT t FROM TransferTransactions t WHERE t.status = :status"),
    @NamedQuery(name = "TransferTransactions.findByCreatedAt", query = "SELECT t FROM TransferTransactions t WHERE t.createdAt = :createdAt"),
    @NamedQuery(name = "TransferTransactions.findByUpdatedAt", query = "SELECT t FROM TransferTransactions t WHERE t.updatedAt = :updatedAt")})
public class TransferTransactions implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private double amount;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "transaction_code")
    private String transactionCode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
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
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @ManyToOne
    private Bookings bookingId;

    public TransferTransactions() {
    }

    public TransferTransactions(Long id) {
        this.id = id;
    }

    public TransferTransactions(Long id, double amount, String transactionCode, String status, Date createdAt, Date updatedAt) {
        this.id = id;
        this.amount = amount;
        this.transactionCode = transactionCode;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
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

    public Bookings getBookingId() {
        return bookingId;
    }

    public void setBookingId(Bookings bookingId) {
        this.bookingId = bookingId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TransferTransactions)) {
            return false;
        }
        TransferTransactions other = (TransferTransactions) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.TransferTransactions[ id=" + id + " ]";
    }
    
}
