package com.urbancompany.controller;

import com.urbancompany.entity.User;
import com.urbancompany.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.urbancompany.repository.ProviderRepository providerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registrationRequest) {
        String name = registrationRequest.get("name");
        String email = registrationRequest.get("email");
        String password = registrationRequest.get("password");
        String phone = registrationRequest.get("phone");
        String role = registrationRequest.getOrDefault("role", "USER");

        if (role.equals("PROVIDER")) {
            if (providerRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Error: Email is already in use by a Partner!");
            }
            com.urbancompany.entity.Provider provider = new com.urbancompany.entity.Provider();
            provider.setName(name);
            provider.setEmail(email);
            provider.setPassword(password);
            provider.setPhone(phone);
            provider.setStatus(com.urbancompany.entity.Provider.ProviderStatus.OFFLINE);
            
            com.urbancompany.entity.Provider saved = providerRepository.save(provider);
            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("name", saved.getName());
            response.put("role", "PROVIDER");
            return ResponseEntity.ok(response);
        } else {
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Error: Email is already in use!");
            }
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(password);
            user.setPhone(phone);
            
            User saved = userRepository.save(user);
            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("name", saved.getName());
            response.put("role", "USER");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // 1. Check if it's a User
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                Map<String, Object> response = new java.util.HashMap<>();
                response.put("id", user.getId());
                response.put("name", user.getName());
                response.put("email", user.getEmail());
                response.put("role", "USER");
                return ResponseEntity.ok(response);
            }
        }

        // 2. Check if it's a Provider
        Optional<com.urbancompany.entity.Provider> providerOpt = providerRepository.findByEmail(email);
        if (providerOpt.isPresent()) {
            com.urbancompany.entity.Provider provider = providerOpt.get();
            if (provider.getPassword().equals(password)) {
                Map<String, Object> response = new java.util.HashMap<>();
                response.put("id", provider.getId());
                response.put("name", provider.getName());
                response.put("email", provider.getEmail());
                response.put("role", "PROVIDER");
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Error: Invalid email or password!");
    }
}
