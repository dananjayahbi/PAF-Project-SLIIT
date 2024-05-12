package com.example.socialmedia.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    // Inject the upload directory path from application.properties
    @Value("${upload.directory}")
    private String uploadDirectory;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select one or more files to upload");
        }
        List<String> imageIds = new ArrayList<>();
        List<String> videoIds = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                byte[] bytes = file.getBytes();
                // Generate a unique file name using UUID
                String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
                Path path = Paths.get(uploadDirectory + "/" + uniqueFileName);
                
                Files.createDirectories(path.getParent());
                Files.write(path, bytes);
                
                if (isImageFile(file)) {
                    imageIds.add(uniqueFileName);
                } else if (isVideoFile(file)) {
                    videoIds.add(uniqueFileName);
                }
            }

            // Prepare JSON response
            List<String> images = new ArrayList<>(imageIds);
            List<String> videos = new ArrayList<>(videoIds);
            return ResponseEntity.ok().body(Map.of("images", images, "videos", videos));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to upload files: " + e.getMessage());
        }
    }

    // Get a file by name
    @GetMapping("/files/{fileName}")
    public ResponseEntity<?> getFile(@PathVariable String fileName) {
        Path directory = Paths.get(uploadDirectory);
        try {
            // Search for files in the upload directory with matching prefix
            Path filePath = Files.walk(directory)
                                  .filter(path -> path.getFileName().toString().startsWith(fileName))
                                  .findFirst()
                                  .orElseThrow(() -> new IOException("File not found"));

            // Load the file as a Resource
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                throw new IOException("File not found or not readable");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to get file: " + e.getMessage());
        }
    }
    

    // Get multiple files by names
    @PostMapping("/files")
    public ResponseEntity<List<String>> getFiles(@RequestBody List<String> fileNames) {
        List<String> fileContents = new ArrayList<>();
        Path directory = Paths.get(uploadDirectory);
    
        for (String fileName : fileNames) {
            try {
                // Search for files in the upload directory with matching prefix
                List<Path> filePaths = Files.walk(directory)
                                      .filter(path -> path.getFileName().toString().startsWith(fileName))
                                      .collect(Collectors.toList());
    
                // Read file contents
                for (Path filePath : filePaths) {
                    byte[] bytes = Files.readAllBytes(filePath);
                    String content = Base64.getEncoder().encodeToString(bytes);
                    fileContents.add(content);
                }
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(Collections.singletonList("Failed to get file: " + e.getMessage()));
            }
        }
        return ResponseEntity.ok(fileContents);
    }

    // Delete files by names
    @DeleteMapping("/files")
    public ResponseEntity<?> deleteFiles(@RequestBody List<String> fileNames) {
        Path directory = Paths.get(uploadDirectory);
        try {
            for (String fileName : fileNames) {
                // Search for files in the upload directory with matching prefix
                List<Path> filePaths = Files.walk(directory)
                                      .filter(path -> path.getFileName().toString().startsWith(fileName))
                                      .collect(Collectors.toList());

                // Delete files
                for (Path filePath : filePaths) {
                    Files.delete(filePath);
                }
            }
            return ResponseEntity.ok().body("Files deleted successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to delete files: " + e.getMessage());
        }
    }
    
    // Method to generate a unique file name using UUID
    private String generateUniqueFileName(String originalFileName) {
        // Get the file extension
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        // Generate a UUID for unique identification
        UUID uuid = UUID.randomUUID();
        return uuid.toString() + fileExtension;
    }
    
    // Method to check if a file is an image
    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image");
    }
    
    // Method to check if a file is a video
    private boolean isVideoFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("video");
    }
}
