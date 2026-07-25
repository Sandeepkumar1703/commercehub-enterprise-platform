package com.commercehub.backend.auth.service;

import com.commercehub.backend.auth.dto.response.VerifyEmailResponse;
import com.commercehub.backend.auth.entity.EmailVerificationToken;
import com.commercehub.backend.auth.repository.EmailVerificationTokenRepository;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional
    public void resendVerificationEmail(
            String email
    ) {

        User user = userRepository.findByEmail(email)
                .orElse(null);

        /*
         * Security:
         * Do not reveal whether the user exists.
         */
        if (user == null) {
            return;
        }

        if (user.isEnabled()) {
            return;
        }

        // Remove previous verification token
        tokenRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();

        EmailVerificationToken verificationToken =
                EmailVerificationToken.builder()
                        .user(user)
                        .token(token)
                        .expiryDate(
                                LocalDateTime.now().plusHours(24)
                        )
                        .build();

        tokenRepository.save(verificationToken);

        emailService.sendVerificationEmail(
                user.getEmail(),
                token
        );
    }

    @Transactional
    public VerifyEmailResponse verifyEmail(
            String token
    ) {

        EmailVerificationToken verificationToken =
                tokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid verification token."
                                )
                        );

        if (verificationToken.getVerifiedAt() != null) {
            throw new IllegalArgumentException(
                    "Email already verified."
            );
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Verification token has expired."
            );
        }

        User user = verificationToken.getUser();

        user.setEnabled(true);
        userRepository.save(user);

        verificationToken.setVerifiedAt(LocalDateTime.now());
        tokenRepository.save(verificationToken);

        // Delete token after successful verification
        tokenRepository.delete(verificationToken);

        return new VerifyEmailResponse(
                "Email verified successfully."
        );
    }
}