package com.example.socialmedia.repository;

import com.example.socialmedia.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
}
