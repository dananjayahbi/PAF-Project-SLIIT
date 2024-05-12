package com.example.socialmedia.controller;

import com.example.socialmedia.model.FitnessPost;
import com.example.socialmedia.repository.FitnessPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fitnesspost")
public class FitnessPostController {
    
        @Autowired
        private FitnessPostRepository fitnessPostRepository;
    
        @GetMapping("/all")
        public Iterable<FitnessPost> getFitnessPosts() {
            return fitnessPostRepository.findAll();
        }

        @GetMapping("/getpost/{id}")
        public FitnessPost getFitnessPostById(@PathVariable String id) {
            return fitnessPostRepository.findById(id).orElse(null);
        }
    
        @PostMapping("/create")
        public FitnessPost createFitnessPost(@RequestBody FitnessPost fitnessPost) {
            return fitnessPostRepository.save(fitnessPost);
        }
    
        @DeleteMapping("/{id}") 
        public void deleteFitnessPost(@PathVariable String id) {
            fitnessPostRepository.deleteById(id);
        }

        @PutMapping("/{id}")
        public FitnessPost updateFitnessPost(@PathVariable String id, @RequestBody FitnessPost fitnessPost) {
            FitnessPost existingPost = fitnessPostRepository.findById(id).orElse(null);
            if (existingPost != null) {
                if(fitnessPost.getCaption() != null) {
                    existingPost.setCaption(fitnessPost.getCaption());
                } else {
                    existingPost.setCaption(existingPost.getCaption());
                }
                if(fitnessPost.getImage() != null) {
                    existingPost.setImage(fitnessPost.getImage());
                } else {
                    existingPost.setImage(existingPost.getImage());
                }
                if(fitnessPost.getVideo() != null) {
                    existingPost.setVideo(fitnessPost.getVideo());
                } else {
                    existingPost.setVideo(existingPost.getVideo());
                }
                if(fitnessPost.getUser() != null) {
                    existingPost.setUser(fitnessPost.getUser());
                } else {
                    existingPost.setUser(existingPost.getUser());
                }
                if(fitnessPost.getComments() != null) {
                    existingPost.setComments(fitnessPost.getComments());
                } else {
                    existingPost.setComments(existingPost.getComments());
                }
                if(fitnessPost.getLikes() != null) {
                    existingPost.setLikes(fitnessPost.getLikes());
                } else {
                    existingPost.setLikes(existingPost.getLikes());
                }
                return fitnessPostRepository.save(existingPost);
            } else {
                return null;
            }
        }
}
