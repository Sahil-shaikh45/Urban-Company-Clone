package com.urbancompany.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double rating;
    private Double price;
    private String reviews;
    private String imageUrl;
    private Boolean isMostBooked = false;
}
