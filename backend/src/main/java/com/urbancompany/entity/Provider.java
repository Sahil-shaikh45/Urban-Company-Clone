package com.urbancompany.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "providers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    private String phone;
    
    @Enumerated(EnumType.STRING)
    private ProviderStatus status = ProviderStatus.OFFLINE;
    
    private Double rating = 0.0;

    @Version
    private Integer version;

    public enum ProviderStatus {
        ONLINE, OFFLINE, BUSY
    }
}
