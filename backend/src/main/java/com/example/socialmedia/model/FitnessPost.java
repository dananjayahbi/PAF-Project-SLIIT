package com.example.socialmedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fitnessposts")
public class FitnessPost {

    @Id
    private String id;
    private String caption;
    private String[] image;
    private String[] video;
    private Object user;
    private Object comments;
    private Number likes;

    public FitnessPost() {

    }

    public FitnessPost(String id, String caption, String[] image, String[] video, Object user, Object comments, Number likes) {
        this.caption = caption;
        this.image = image;
        this.video = video;
        this.user = user;
        this.comments = comments;
        this.likes = likes;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String[] getImage() {
        return image;
    }

    public void setImage(String[] image) {
        this.image = image;
    }

    public String[] getVideo() {
        return video;
    }

    public void setVideo(String[] video) {
        this.video = video;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }

    public Object getComments() {
        return comments;
    }

    public void setComments(Object comments) {
        this.comments = comments;
    }

    public Number getLikes() {
        return likes;
    }

    public void setLikes(Number likes) {
        this.likes = likes;
    }
}


