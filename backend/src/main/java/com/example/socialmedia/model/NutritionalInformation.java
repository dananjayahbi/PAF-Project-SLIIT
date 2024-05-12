package com.example.socialmedia.model;

public class NutritionalInformation {
    private double calories;         
    private String caloriesUnit;     
    private double protein;          
    private String proteinUnit;      
    private double carbohydrates;    
    private String carbohydratesUnit;
    private double fat;              
    private String fatUnit;          

    public NutritionalInformation() {
    }

    public NutritionalInformation(double calories, String caloriesUnit, double protein, String proteinUnit, double carbohydrates, String carbohydratesUnit, double fat, String fatUnit) {
        this.calories = calories;
        this.caloriesUnit = caloriesUnit;
        this.protein = protein;
        this.proteinUnit = proteinUnit;
        this.carbohydrates = carbohydrates;
        this.carbohydratesUnit = carbohydratesUnit;
        this.fat = fat;
        this.fatUnit = fatUnit;
    }

    // Getters and setters
    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public String getCaloriesUnit() {
        return caloriesUnit;
    }

    public void setCaloriesUnit(String caloriesUnit) {
        this.caloriesUnit = caloriesUnit;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public String getProteinUnit() {
        return proteinUnit;
    }

    public void setProteinUnit(String proteinUnit) {
        this.proteinUnit = proteinUnit;
    }

    public double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public String getCarbohydratesUnit() {
        return carbohydratesUnit;
    }

    public void setCarbohydratesUnit(String carbohydratesUnit) {
        this.carbohydratesUnit = carbohydratesUnit;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public String getFatUnit() {
        return fatUnit;
    }

    public void setFatUnit(String fatUnit) {
        this.fatUnit = fatUnit;
    }
}
