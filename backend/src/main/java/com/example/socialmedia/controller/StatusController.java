package com.example.socialmedia.controller;

import com.example.socialmedia.model.Status;
import com.example.socialmedia.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/status")
public class StatusController {

    private final StatusRepository statusRepository;
    
    @Autowired
    public StatusController(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    // Create a new status
    @PostMapping("/create")
    public Status createStatus(@RequestBody Status status) {
        return statusRepository.save(status);
    }

    // Get all statuses
    @GetMapping("/all")
    public List<Status> getAllStatus() {
        return statusRepository.findAll();
    }

    // Get status by ID
    @GetMapping("/{id}")
    public ResponseEntity<Status> getStatusById(@PathVariable("id") String id) {
        Optional<Status> statusOptional = statusRepository.findById(id);
        return statusOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update status
    @PutMapping("update/{id}")
    public ResponseEntity<Status> updateStatus(@PathVariable("id") String id, @RequestBody Status updatedStatus) {
        Optional<Status> statusOptional = statusRepository.findById(id);
        if (statusOptional.isPresent()) {
            updatedStatus.setId(id);
            Status savedStatus = statusRepository.save(updatedStatus);
            return ResponseEntity.ok(savedStatus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete status by ID
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteStatus(@PathVariable("id") String id) {
        Optional<Status> statusOptional = statusRepository.findById(id);
        if (statusOptional.isPresent()) {
            statusRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
