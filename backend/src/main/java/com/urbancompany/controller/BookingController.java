package com.urbancompany.controller;

import com.urbancompany.entity.Booking;
import com.urbancompany.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            Long serviceId = Long.valueOf(payload.get("serviceId").toString());
            Double price = Double.valueOf(payload.get("price").toString());
            Double distance = Double.valueOf(payload.get("distance").toString());
            
            return ResponseEntity.ok(bookingService.createBooking(userId, serviceId, price, distance));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/available")
    public List<Booking> getAvailableJobs() {
        return bookingService.getAvailableJobs();
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<?> acceptJob(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        try {
            Long providerId = payload.get("providerId");
            return ResponseEntity.ok(bookingService.acceptJob(id, providerId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<?> startJob(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String otp = payload.get("otp");
            return ResponseEntity.ok(bookingService.startJob(id, otp));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<?> completeJob(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookingService.completeJob(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
