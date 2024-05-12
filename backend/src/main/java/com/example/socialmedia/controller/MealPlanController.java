package com.example.socialmedia.controller;
import com.example.socialmedia.model.MealPlan;
import com.example.socialmedia.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mealplans")
public class MealPlanController {

    private final MealPlanRepository mealPlanRepository;

    @Autowired
    public MealPlanController(MealPlanRepository mealPlanRepository) {
        this.mealPlanRepository = mealPlanRepository;
    }

    @PostMapping("/create")
    public MealPlan createMealPlan(@RequestBody MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    @GetMapping("/all")
    public List<MealPlan> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<MealPlan> getMealPlanById(@PathVariable("id") String id) {
    //     Optional<MealPlan> mealPlanOptional = mealPlanRepository.findById(id);
    //     return mealPlanOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> getMealPlanById(@PathVariable("id") String id) {
        Optional<MealPlan> mealPlanOptional = mealPlanRepository.findById(id);
        return mealPlanOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MealPlan> updateMealPlan(@PathVariable("id") String id, @RequestBody MealPlan updatedMealPlan) {
        Optional<MealPlan> mealPlanOptional = mealPlanRepository.findById(id);
        if (mealPlanOptional.isPresent()) {
            updatedMealPlan.setId(id);
            MealPlan savedMealPlan = mealPlanRepository.save(updatedMealPlan);
            return ResponseEntity.ok(savedMealPlan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMealPlan(@PathVariable("id") String id) {
        Optional<MealPlan> mealPlanOptional = mealPlanRepository.findById(id);
        if (mealPlanOptional.isPresent()) {
            mealPlanRepository.deleteById(id);
            return ResponseEntity.ok("Meal plan with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
