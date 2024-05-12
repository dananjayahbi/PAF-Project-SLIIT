package com.example.socialmedia.repository;
import com.example.socialmedia.model.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatusRepository extends MongoRepository<Status, String> {

    
}



