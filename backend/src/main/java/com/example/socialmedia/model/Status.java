package com.example.socialmedia.model;

import java.util.List;

public class Status {
    private String id;
    private String  distanceRun;
    private String  timeRun;
    private String date;

    private String pushups;
    private String weightLifted;
    private String cardio;
    private String description;



    public Status() {
    }

    public Status(String id,String distanceRun, String date, String timeRun, String pushups, String weightLifted, String cardio, String description) {
        this.id = id;
        this.distanceRun = distanceRun;
        this.timeRun = timeRun;
        this.date = date;
        this.pushups = pushups;
        this.weightLifted = weightLifted;
        this.cardio = cardio;
        this.description = description;    
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDistanceRun() {
        return distanceRun;
    }

    public void setDistanceRun(String distanceRun) {
        this.distanceRun = distanceRun;
    }   

    public String getTimeRun() {
        return timeRun;
    }       

    public void setTimeRun(String timeRun) {
        this.timeRun = timeRun;
    }  
    
    public String getDate() {
        return date;
    }               

    public void setDate(String date) {
        this.date = date;
    }

    public String getPushups() {
        return pushups;
    }   

    public void setPushups(String pushups) {
        this.pushups = pushups;
    }

    public String getWeightLifted() {
        return weightLifted;
    }

    public void setWeightLifted(String weightLifted) {
        this.weightLifted = weightLifted;
    }

    public String getCardio() {
        return cardio;
    }   

    public void setCardio(String cardio) {
        this.cardio = cardio;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }







    


    
}
