package com.example.socialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SocialmediaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialmediaApplication.class, args);
    }

    @RestController
    public static class HelloController {

        @GetMapping("/")
        public String apiRoot() {
            return "Hello World!";
        }

        @GetMapping("/secured")
        public String secured() {
            return "This is a secured page";
        }

        //test path
        @GetMapping("/test")
        public String test() {
            return "This is a test page";
        }
    }
}
