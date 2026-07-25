package com.commercehub.backend.auth.service.impl;

import com.commercehub.backend.auth.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendVerificationEmail(
            String email,
            String token
    ) {

        String verificationLink
                = frontendUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Verify your CommerceHub account");

        message.setText("""
                Welcome to CommerceHub!

                Thank you for registering.

                Please click the link below to verify your email address:

                %s

                This verification link will expire in 24 hours.

                If you did not create this account, you can safely ignore this email.

                Regards,
                CommerceHub Team
                """.formatted(verificationLink));

        mailSender.send(message);

        log.info("Verification email sent to {}", email);
    }

    @Override
    public void sendPasswordResetEmail(
            String email,
            String token
    ) {

        String resetLink
                = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("CommerceHub Password Reset Request");

        message.setText("""
            Hello,

            We received a request to reset your CommerceHub account password.

            Click the link below to reset your password:

            %s

            This link will expire in 15 minutes.

            If you did not request this request, you can safely ignore this email.

            Regards,
            CommerceHub Team
            """.formatted(resetLink));

        mailSender.send(message);

        log.info("Password reset email sent to {}", email);
    }
}
