package com.commercehub.backend.auth.repository;


import com.commercehub.backend.auth.entity.EmailVerificationToken;
import com.commercehub.backend.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface EmailVerificationTokenRepository 
        extends JpaRepository<EmailVerificationToken, UUID>{



    Optional<EmailVerificationToken> findByToken(String token);



    Optional<EmailVerificationToken>
    findByUser(User user);



    void deleteByUser(User user);

}