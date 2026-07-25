package com.commercehub.backend.auth.entity;


import com.commercehub.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "email_verification_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailVerificationToken {


    @Id
    private UUID id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;



    @Column(
            nullable = false,
            unique = true
    )
    private String token;



    @Column(nullable = false)
    private LocalDateTime expiryDate;



    private LocalDateTime verifiedAt;



    @Column(nullable = false)
    private LocalDateTime createdAt;



    @PrePersist
    public void prePersist(){

        if(id == null){
            id = UUID.randomUUID();
        }

        createdAt = LocalDateTime.now();
    }


    public boolean isExpired(){

        return LocalDateTime.now()
                .isAfter(expiryDate);
    }


    public boolean isVerified(){

        return verifiedAt != null;
    }

}