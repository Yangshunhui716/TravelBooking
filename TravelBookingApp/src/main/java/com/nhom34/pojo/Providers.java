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
@Table(name = "providers")
@NamedQueries({
    @NamedQuery(name = "Providers.findAll", query = "SELECT p FROM Providers p"),
    @NamedQuery(name = "Providers.findById", query = "SELECT p FROM Providers p WHERE p.id = :id"),
    @NamedQuery(name = "Providers.findByTax", query = "SELECT p FROM Providers p WHERE p.tax = :tax"),
    @NamedQuery(name = "Providers.findByBusinessName", query = "SELECT p FROM Providers p WHERE p.businessName = :businessName"),
    @NamedQuery(name = "Providers.findByAddress", query = "SELECT p FROM Providers p WHERE p.address = :address")})
public class Providers implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "tax")
    private String tax;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "business_name")
    private String businessName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "address")
    private String address;
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Users users;

    public Providers() {
    }

    public Providers(Long id) {
        this.id = id;
    }

    public Providers(Long id, String tax, String businessName, String address) {
        this.id = id;
        this.tax = tax;
        this.businessName = businessName;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Providers)) {
            return false;
        }
        Providers other = (Providers) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom34.pojo.Providers[ id=" + id + " ]";
    }
    
}
