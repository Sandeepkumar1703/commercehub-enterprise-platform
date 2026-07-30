package com.commercehub.backend.address.entity;

import com.commercehub.backend.address.enums.AddressType;
import com.commercehub.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "full_name", nullable = false)
    private String fullName;


    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;


    @Column(name = "address_line1", nullable = false)
    private String addressLine1;


    @Column(name = "address_line2")
    private String addressLine2;


    private String landmark;


    @Column(nullable = false)
    private String city;


    private String state;


    @Column(name = "postal_code", nullable = false)
    private String postalCode;


    @Column(nullable = false)
    private String country;


    @Enumerated(EnumType.STRING)
    @Column(name = "address_type")
    private AddressType addressType;


    @Column(name = "is_default", nullable = false)
    @Builder.Default
    private boolean isDefault = false;


    private BigDecimal latitude;


    private BigDecimal longitude;


    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

    }


    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();

    }
}