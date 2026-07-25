package com.commercehub.backend.auth.controller;

import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import com.commercehub.backend.auth.dto.response.RegisterResponse;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.auth.service.EmailVerificationService;
import com.commercehub.backend.auth.dto.request.ResendVerificationRequest;
import com.commercehub.backend.auth.dto.response.VerifyEmailResponse;
import com.commercehub.backend.user.dto.request.ForgotPasswordRequest;
import com.commercehub.backend.user.dto.request.ResetPasswordRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailVerificationService emailVerificationService;

    /**
     * Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        authService.register(request)
                );
    }

    /**
     * Login existing user
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    /**
     * Change password of authenticated user
     *
     * Requires JWT authentication
     */
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid
            @RequestBody ChangePasswordRequest request
    ) {

        authService.changePassword(request);

        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
            HttpServletRequest request
    ) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            return ResponseEntity.badRequest()
                    .body(
                            ApiResponse.failure("Authorization token missing")
                    );

        }

        String token = authHeader.substring(7);

        authService.logout(token);

        return ResponseEntity.ok(
                ApiResponse.success("Logged out successfully")
        );

    }

    @PostMapping("/resend-verification")
    public ResponseEntity<VerifyEmailResponse> resendVerification(
            @Valid
            @RequestBody ResendVerificationRequest request
    ) {

        emailVerificationService
                .resendVerificationEmail(
                        request.getEmail()
                );

        return ResponseEntity.ok(
                new VerifyEmailResponse(
                        "If the email is registered, verification link will be sent"
                )
        );

    }

    @GetMapping("/verify-email")
    public ResponseEntity<VerifyEmailResponse> verifyEmail(
            @RequestParam String token
    ) {

        VerifyEmailResponse response
                = emailVerificationService.verifyEmail(token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request
    ) {

        authService.forgotPassword(request);

        return ResponseEntity.ok(
                "If an account exists, a password reset link has been sent."
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request
    ) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                "Password reset successfully."
        );
    }

}
