package com.nhom34.pojo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "tour_services")
@NamedQueries({
    @NamedQuery(name = "TourServices.findAll", query = "SELECT t FROM TourServices t"),
    @NamedQuery(name = "TourServices.findById", query = "SELECT t FROM TourServices t WHERE t.id = :id"),
    @NamedQuery(name = "TourServices.findByDurationDays", query = "SELECT t FROM TourServices t WHERE t.durationDays = :durationDays"),
    @NamedQuery(name = "TourServices.findByDepartureTime", query = "SELECT t FROM TourServices t WHERE t.departureTime = :departureTime")
})
public class TourServices implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Long id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "duration_days")
    private int durationDays;

    @Basic(optional = false)
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "departure_time")
    private Date departureTime;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "id")
    private Services services;

    public TourServices() {
    }

    public Long getId() {
        return id;
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
}