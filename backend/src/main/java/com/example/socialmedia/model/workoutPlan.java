package com.example.socialmedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "workoutPlans")
public class workoutPlan {
    @Id
        private String id;
        private String title;
        private String description;
        private List<Exercise> exercises;
        private Routine routine;
        private List<String> photos;
        private String createdByUserId;
        
        public workoutPlan() {
        }
        public workoutPlan(String id, String title, String description,List<Exercise> exercises,Routine routine,List<String> photos,String createdByUserId) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.exercises = exercises;
            this.routine = routine;
            this.photos = photos;
            this.createdByUserId = createdByUserId;
        }

        public String getId() {
            return id;
        }
            
        public void setId(String id) {
            this.id = id;
        }
            
        public String getTitle() {
            return title;
        }
           
        public void setTitle(String title) {
            this.title = title;
        }
            
        public String getDescription() {
            return description;
        }
            
        public void setDescription(String description) {
            this.description = description;
        }
        public List<Exercise> getExercises() {
            return exercises;
        }
    
        public void setExercises(List<Exercise> exercises) {
            this.exercises = exercises;
        }
        public List<String> getPhotos() {
            return photos;
        }
    
        public void setPhotos(List<String> photos) {
            this.photos = photos;
        } 
        public Routine getRoutine() {
            return routine;
        }
    
        public void setRoutine(Routine routine) {
            this.routine = routine;
        }   
    
        public String getCreatedByUserId() {
            return createdByUserId;
        }
    
        public void setCreatedByUserId(String createdByUserId) {
            this.createdByUserId = createdByUserId;
        }
    
}
