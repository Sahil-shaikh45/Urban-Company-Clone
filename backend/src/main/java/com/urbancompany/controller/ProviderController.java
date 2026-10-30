package com.urbancompany.controller;

import com.urbancompany.entity.Provider;
import com.urbancompany.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ProviderController {

    @Autowired
    private ProviderRepository providerRepository;

    @PostMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            Provider provider = providerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Provider not found"));
            
            provider.setStatus(Provider.ProviderStatus.valueOf(payload.get("status")));
            return ResponseEntity.ok(providerRepository.save(provider));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
