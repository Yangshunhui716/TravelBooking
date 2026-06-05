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
import java.io.Serializable;
import java.util.Date;
import org.hibernate.annotations.BatchSize;

@Entity
@Table(name = "tour_services")
@NamedQueries({
    @NamedQuery(name = "TourServices.findAll", query = "SELECT t FROM TourServices t"),
    @NamedQuery(name = "TourServices.findById", query = "SELECT t FROM TourServices t WHERE t.id = :id"),
    @NamedQuery(name = "TourServices.findByDurationDays", query = "SELECT t FROM TourServices t WHERE t.durationDays = :durationDays"),
    @NamedQuery(name = "TourServices.findByDepartureTime", query = "SELECT t FROM TourServices t WHERE t.departureTime = :departureTime")})
@BatchSize(size=20)
public class TourServices implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "duration_days")
    private int durationDays;
    @Basic(optional = false)
    @NotNull
    @Column(name = "departure_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date departureTime;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Services services;

    public TourServices() {
    }

    public TourServices(Long id) {
        this.id = id;
    }

    public TourServices(Long id, int durationDays, Date departureTime) {
        this.id = id;
        this.durationDays = durationDays;
        this.departureTime = departureTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(int durationDays) {
        this.durationDays = durationDays;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
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
        if (!(object instanceof TourServices)) {
            return false;
        }
        TourServices other = (TourServices) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.TourServices[ id=" + id + " ]";
    }
    
}
