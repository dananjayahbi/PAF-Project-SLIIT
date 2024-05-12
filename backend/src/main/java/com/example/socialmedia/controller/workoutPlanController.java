package com.example.socialmedia.controller;

import com.example.socialmedia.model.workoutPlan;
import com.example.socialmedia.repository.workoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/workoutplans")
public class workoutPlanController {

    private final workoutPlanRepository workoutPlanRepository;

    @Autowired
    public workoutPlanController(workoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    @PostMapping("/create")
    public workoutPlan createWorkoutPlan(@RequestBody workoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    @GetMapping("/all")
    public List<workoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<workoutPlan> getWorkoutPlanById(@PathVariable("id") String id) {
        Optional<workoutPlan> workoutPlanOptional = workoutPlanRepository.findById(id);
        return workoutPlanOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<workoutPlan> updateWorkoutPlan(@PathVariable("id") String id, @RequestBody workoutPlan updatedWorkoutPlan) {
        Optional<workoutPlan> workoutPlanOptional = workoutPlanRepository.findById(id);
        if (workoutPlanOptional.isPresent()) {
            updatedWorkoutPlan.setId(id);
            workoutPlan savedWorkoutPlan = workoutPlanRepository.save(updatedWorkoutPlan);
            return ResponseEntity.ok(savedWorkoutPlan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkoutPlan(@PathVariable("id") String id) {
        Optional<workoutPlan> workoutPlanOptional = workoutPlanRepository.findById(id);
        if (workoutPlanOptional.isPresent()) {
            workoutPlanRepository.deleteById(id);
            return ResponseEntity.ok("Workout plan with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
