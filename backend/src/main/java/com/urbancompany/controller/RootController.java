package com.urbancompany.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String index() {
        return "Backend is running! The API is at <a href='/api/'>/api/</a>";
    }
}
