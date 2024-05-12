package com.example.socialmedia.repository;
import com.example.socialmedia.model.FitnessPost;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FitnessPostRepository extends MongoRepository<FitnessPost, String> {

    
}
