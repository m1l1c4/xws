package com.example.tim2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference(value = "advertisementcar_mov")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Car carAd;

    //@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date", nullable = false)
    private Date startDate;

    //@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    @JsonManagedReference(value = "advertisementdiscount_mov")
    @OneToMany(mappedBy = "advertisement", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Discount> discounts = new HashSet<Discount>();

    // ko ga je objavio
    @JsonBackReference(value = "entrepreneur_mov")	
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)	
    private Entrepreneur entrepreneur;

    @JsonBackReference(value = "pricelist_mov")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Pricelist pricelist;

    @Column
    private Long microId;

    @JsonBackReference(value = "wishlist_movement")
    @OneToOne(mappedBy = "advertisement", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private WishlistItem wishlistItem;

    //slike

    public Advertisement() {
    }

    public Advertisement(Car car, Date startDate, Date endDate, Entrepreneur entrepreneur, Pricelist pricelist, String city, boolean deleted, Long micro) {
        this.carAd = car;
        this.startDate = startDate;
        this.endDate = endDate;    
        this.entrepreneur = entrepreneur;
        this.pricelist = pricelist;
        this.city = city;
        this.deleted = deleted;
        this.microId = micro;
    }

    public com.example.tim2.soap.gen.Advertisement getGenerated() throws DatatypeConfigurationException {
        com.example.tim2.soap.gen.Advertisement ret =  new com.example.tim2.soap.gen.Advertisement();
        ret.setEntrepreneurUsername(getEntrepreneur().getUser().getUsername());
        ret.setEntrepreneurName(getEntrepreneur().getName());
        ret.setDeleted(isDeleted());
        ret.setCity(getCity());
        ret.setCarAd(getCarAd().getGenerated());
        GregorianCalendar c = new GregorianCalendar();
        c.setTime(getEndDate());
        ret.setEndDate(DatatypeFactory.newInstance().newXMLGregorianCalendar(c));
        c.setTime(getStartDate());
        ret.setStartDate(DatatypeFactory.newInstance().newXMLGregorianCalendar(c));
        return ret;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Car getCarAd() {
        return carAd;
    }

    public void setCaAdr(Car car) {
        this.carAd = car;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Set<Discount> getDiscounts() {
        return discounts;
    }

    public void setDiscounts(Set<Discount> discounts) {
        this.discounts = discounts;
    }

    public void setCarAd(Car carAd) {
        this.carAd = carAd;
    }   

    public Pricelist getPricelist() {
        return pricelist;
    }

    public void setPricelist(Pricelist pricelist) {
        this.pricelist = pricelist;
    }
    
     public Entrepreneur getEntrepreneur() {	
        return entrepreneur;	
    }	

    public void setEntrepreneur(Entrepreneur entrepreneur) {	
        this.entrepreneur = entrepreneur;	
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Long getMicroId() {
        return microId;
    }

    public void setMicroId(Long microId) {
        this.microId = microId;
    }

    public WishlistItem getWishlistItem() {
        return wishlistItem;
    }

    public void setWishlistItem(WishlistItem wishlistItem) {
        this.wishlistItem = wishlistItem;
    }
}
