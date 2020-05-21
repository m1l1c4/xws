package com.example.adservice.dto;

import com.example.adservice.model.Pricelist;

public class PricelistDTO {

    private Long id;
    private Double priceDay;
    private Double collisionDW;
    private Double discount20;
    private Double discount30;
    private Double exceedMileage;

    public PricelistDTO(){

    }

    public PricelistDTO(Long id, Double priceDay, Double collisionDW, Double discount20, Double discount30, Double exceedMileage){
        this.id = id;
        this.priceDay = priceDay;
        this.collisionDW = collisionDW;
        this.discount20 = discount20;
        this.discount30 = discount30;
        this.exceedMileage = exceedMileage;
    }

    public PricelistDTO(Pricelist p){
        this(p.getId(), p.getPriceDay(), p.getCollisionDW(), p.getDiscount20(), p.getDiscount20(), p.getExceedMileage());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPriceDay() {
        return priceDay;
    }

    public void setPriceDay(Double priceDay) {
        this.priceDay = priceDay;
    }

    public Double getCollisionDW() {
        return collisionDW;
    }

    public void setCollisionDW(Double collisionDW) {
        this.collisionDW = collisionDW;
    }

    public Double getDiscount20() {
        return discount20;
    }

    public void setDiscount20(Double discount20) {
        this.discount20 = discount20;
    }

    public Double getDiscount30() {
        return discount30;
    }

    public void setDiscount30(Double discount30) {
        this.discount30 = discount30;
    }

    public Double getExceedMileage() {
        return exceedMileage;
    }

    public void setExceedMileage(Double exceedMileage) {
        this.exceedMileage = exceedMileage;
    }
}
