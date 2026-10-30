package com.urbancompany.controller;

import com.urbancompany.entity.*;
import com.urbancompany.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/offers")
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @GetMapping("/most-booked")
    public List<Service> getMostBookedServices() {
        return serviceRepository.findByIsMostBookedTrue();
    }

    @GetMapping("/sections")
    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
}
