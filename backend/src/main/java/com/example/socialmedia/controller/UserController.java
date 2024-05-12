package com.example.socialmedia.controller;

import com.example.socialmedia.model.User;
import com.example.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("create")
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login a user by username and password
    @PostMapping("login")
    public User loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                existingUser.setIsloggedIn(true);
                return userRepository.save(existingUser);
            } else {
                return null;
            }
        }
        return null;
    }

    // Get a user by email
    @GetMapping("getuserbyemail/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by id
    @GetMapping("getuser/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }

    // Get a user by username
    @GetMapping("getuserbyusername/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    // Update the login status of a user by id
    public User updateUserLoginStatus(String id, Boolean isLoggedIn) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setIsloggedIn(isLoggedIn);
            return userRepository.save(existingUser);
        }
        return null;
    }

    // Update a user by id
    @PutMapping("updateuser/{id}")
    public User updateUserById(@PathVariable String id, @RequestBody User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (user.getFirstName() != null) {
                existingUser.setFirstName(user.getFirstName());
            } else {
                existingUser.setFirstName(existingUser.getFirstName());
            }
            if (user.getLastName() != null) {
                existingUser.setLastName(user.getLastName());
            } else {
                existingUser.setLastName(existingUser.getLastName());
            }
            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            } else {
                existingUser.setUsername(existingUser.getUsername());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            } else {
                existingUser.setEmail(existingUser.getEmail());
            }
            if (user.getIsloggedIn() != null) {
                existingUser.setIsloggedIn(user.getIsloggedIn());
            } else {
                existingUser.setIsloggedIn(existingUser.getIsloggedIn());
            }
            if (user.getPosts() != null) {
                existingUser.setPosts(user.getPosts());
            } else {
                existingUser.setPosts(existingUser.getPosts());
            }
            if (user.getImage() != null) {
                existingUser.setImage(user.getImage());
            } else {
                existingUser.setImage(existingUser.getImage());
            }

            return userRepository.save(existingUser);
        }
        return null;
    }

    // Delete a user by id
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable String id) {
        userRepository.deleteById(id);
    }
}
