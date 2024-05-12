package com.example.socialmedia.repository;

import com.example.socialmedia.model.workoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface workoutPlanRepository extends MongoRepository<workoutPlan, String> {
    // You can add custom query methods here if needed
}
