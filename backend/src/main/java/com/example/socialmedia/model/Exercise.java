package com.example.socialmedia.model;

// import java.util.List;

public class Exercise {
    private String name;
    private int sets;
    private int repetitions;

    public Exercise() {
    }

    public Exercise(String name, int sets, int repetitions) {
        this.name = name;
        this.sets = sets;
        this.repetitions = repetitions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }
}
