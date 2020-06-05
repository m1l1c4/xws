package com.example.adservice.dto;

import com.example.adservice.model.Car;

public class CarOrderDTO {
    private String make;
    private String model;
    private String fuel;
    private String carClass;
    private Boolean insurance;
    private Double mileage;
    private Double mileageLimit;
    private Double raiting;
    private String state;
    private String gearbox;
    private String entrepreneurUsername;

    public CarOrderDTO() {
    }

    public CarOrderDTO(String make, String model, String fuel, String carClass, Boolean insurance,
                  Double mileage, Double mileageLimit, Double raiting, String state) {
        this.make = make;
        this.model = model;
        this.fuel = fuel;
        this.carClass = carClass;
        this.insurance = insurance;
        this.mileage = mileage;
        this.mileageLimit = mileageLimit;
        this.raiting = raiting;
        this.state = state;
    }

    public CarOrderDTO(Car c) {
        this.make = c.getMake().getName();
        this.model = c.getModel().getName();
        this.fuel = c.getFuel().getName();
        this.carClass = c.getCarClass().getName();
        this.insurance = c.getInsurance();
        this.mileage = c.getMileage();
        this.mileageLimit = c.getMileageLimit();
        this.raiting = c.getRaiting();
        this.state = c.getState();
        this.gearbox = c.getGearbox().getName();
        this.entrepreneurUsername = c.getEntrepreneurUsername();
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public String getCarClass() {
        return carClass;
    }

    public void setCarClass(String carClass) {
        this.carClass = carClass;
    }

    public Boolean getInsurance() {
        return insurance;
    }

    public void setInsurance(Boolean insurance) {
        this.insurance = insurance;
    }

    public Double getMileage() {
        return mileage;
    }

    public void setMileage(Double mileage) {
        this.mileage = mileage;
    }

    public Double getMileageLimit() {
        return mileageLimit;
    }

    public void setMileageLimit(Double mileageLimit) {
        this.mileageLimit = mileageLimit;
    }

    public Double getRaiting() {
        return raiting;
    }

    public void setRaiting(Double raiting) {
        this.raiting = raiting;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getGearbox() {
        return gearbox;
    }

    public void setGearbox(String gearbox) {
        this.gearbox = gearbox;
    }

    public String getEntrepreneurUsername() {
        return entrepreneurUsername;
    }

    public void setEntrepreneurUsername(String entrepreneurUsername) {
        this.entrepreneurUsername = entrepreneurUsername;
    }
}
