package com.example.socialmedia.config;

import com.example.socialmedia.controller.UserController;
import com.example.socialmedia.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class AuthenticationConfig {

    @Autowired
    private UserController userController;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/secured").authenticated()
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("http://localhost:8080/oauth2/authorization/github")
                        .successHandler(loginSuccessHandler()))
                .build();
    }

    private AuthenticationSuccessHandler loginSuccessHandler() {
        return (request, response, authentication) -> {
            if (authentication instanceof OAuth2AuthenticationToken) {
                OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

                String email = oauthToken.getPrincipal().getAttribute("email"); // GitHub email

                User existingUser = userController.getUserByEmail(email);

                if (existingUser == null) {
                    // Create a new user object with the GitHub data
                    User newUser = new User();
                    newUser.setFirstName("");
                    newUser.setLastName("");
                    newUser.setUsername(oauthToken.getPrincipal().getAttribute("login")); // GitHub username
                    newUser.setEmail(email);
                    newUser.setIsloggedIn(true);

                    User createdUser = userController.createUser(newUser);

                    // Redirect with user object
                    response.sendRedirect("http://localhost:5173?user=" + createdUser.getId());
                } else {
                    // Fetch the existing user object
                    User user = (User) existingUser;
                    user.setIsloggedIn(true);
                    userController.updateUserById(user.getId(), user);
                    
                    // Redirect with user object
                    response.sendRedirect("http://localhost:5173?user=" + user.getId());
                }
            }
        };
    }
}