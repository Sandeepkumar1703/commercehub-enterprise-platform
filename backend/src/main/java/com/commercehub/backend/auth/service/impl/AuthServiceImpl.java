package com.commercehub.backend.auth.service.impl;

import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;

import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.dto.response.RegisterResponse;

import com.commercehub.backend.auth.entity.EmailVerificationToken;
import com.commercehub.backend.auth.repository.EmailVerificationTokenRepository;
import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.auth.service.AuthService;
import com.commercehub.backend.auth.service.EmailService;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.InvalidTokenException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;

import com.commercehub.backend.role.repository.RoleRepository;

import com.commercehub.backend.security.JwtTokenProvider;
import com.commercehub.backend.security.TokenBlacklist;

import com.commercehub.backend.role.entity.Role;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import com.commercehub.backend.common.exception.InvalidCredentialsException;

import java.time.LocalDateTime;
import java.util.UUID;

import com.commercehub.backend.user.entity.PasswordResetToken;
import com.commercehub.backend.user.repository.PasswordResetTokenRepository;

import com.commercehub.backend.user.dto.request.ForgotPasswordRequest;
import com.commercehub.backend.user.dto.request.ResetPasswordRequest;

import com.commercehub.backend.auth.dto.request.RefreshTokenRequest;
import com.commercehub.backend.auth.dto.response.RefreshTokenResponse;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final TokenBlacklist tokenBlacklist;

    // Email Verification dependencies
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;

    private final EmailService emailService;

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Register new user.
     */
    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "Email already registered"
            );
        }

        Role userRole
                = roleRepository.findByName("ROLE_USER")
                        .orElseThrow(()
                                -> new ResourceNotFoundException(
                                "ROLE_USER not found"
                        ));

        User user
                = User.builder()
                        .firstName(
                                request.getFirstName()
                        )
                        .lastName(
                                request.getLastName()
                        )
                        .email(
                                request.getEmail()
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        // Email not verified yet
                        .enabled(false)
                        .build();

        user.getRoles().add(userRole);

        User savedUser = userRepository.save(user);

        /*
         * Create Email Verification Token
         */
        EmailVerificationToken verificationToken
                = EmailVerificationToken.builder()
                        .user(user)
                        .token(
                                UUID.randomUUID()
                                        .toString()
                        )
                        .expiryDate(
                                LocalDateTime.now()
                                        .plusHours(24)
                        )
                        .build();

        emailVerificationTokenRepository.save(
                verificationToken
        );

        /*
         * Send verification email
         */
        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationToken.getToken()
        );

        return RegisterResponse.builder()
                .message(
                        "Registration successful. Please verify your email."
                )
                .build();

    }

    /**
     * Login user.
     */
    @Override
        @Transactional
        public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!user.isEnabled()) {
                throw new BadRequestException("Please verify your email before login");
        }

        Authentication authentication;

        try {

                authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        } catch (Exception ex) {

                throw new InvalidCredentialsException("Invalid email or password");

        }

        // Update last login time
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Store authenticated user in SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return generateTokenResponse(authentication);
        }

    /**
     * Change password.
     */
    @Override
    public void changePassword(ChangePasswordRequest request) {

        User user = getAuthenticatedUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new BadRequestException(
                    "Current password is incorrect"
            );
        }

        if (request.getCurrentPassword()
                .equals(request.getNewPassword())) {

            throw new BadRequestException(
                    "New password cannot be same as old password"
            );
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new BadRequestException(
                    "Password confirmation does not match"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

    }

    /**
     * Logout user.
     */
    @Override
    public void logout(String token) {

        tokenBlacklist.blacklistToken(token);

    }

    /**
     * Get authenticated user.
     */
    private User getAuthenticatedUser() {

        Authentication authentication
                = SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email
                = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new ResourceNotFoundException(
                        "User not found"
                ));

    }

    /**
     * Generate JWT response.
     */
    private AuthResponse generateTokenResponse(
            Authentication authentication) {

        return AuthResponse.builder()
                .accessToken(
                        jwtTokenProvider.generateAccessToken(
                                authentication
                        )
                )
                .refreshToken(
                        jwtTokenProvider.generateRefreshToken(
                                authentication
                        )
                )
                .tokenType("Bearer")
                .expiresIn(900000)
                .build();
    }

    @Override
    public void forgotPassword(
            ForgotPasswordRequest request
    ) {

        User user = userRepository.findByEmail(request.getEmail())
        .orElse(null);

        if (user == null) {
        return;
        }

        // Remove old reset tokens
        passwordResetTokenRepository.deleteByUser(user);

        // Generate new token
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken
                = PasswordResetToken.builder()
                        .token(token)
                        .user(user)
                        .expiryDate(
                                LocalDateTime.now()
                                        .plusMinutes(15)
                        )
                        .used(false)
                        .build();

        passwordResetTokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(
                user.getEmail(),
                token
        );
    }

    @Override
    public void resetPassword(
            ResetPasswordRequest request
    ) {

        PasswordResetToken resetToken
                = passwordResetTokenRepository
                        .findByToken(request.getToken())
                        .orElseThrow(()
                                -> new InvalidTokenException(
                                "Invalid password reset token"
                        )
                        );

        // Check token already used
        if (resetToken.isUsed()) {

            throw new InvalidTokenException(
                    "Password reset token already used"
            );
        }

        // Check token expiry
        if (resetToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            throw new InvalidTokenException(
                    "Password reset token expired"
            );
        }

        User user = resetToken.getUser();

        // Encrypt and update password
        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

        // Mark token as used
        resetToken.setUsed(true);

        passwordResetTokenRepository.save(resetToken);

    }

    @Override
        public RefreshTokenResponse refreshToken(
                RefreshTokenRequest request
        ) {

        String refreshToken = request.getRefreshToken();

        if (!jwtTokenProvider.validateRefreshToken(refreshToken)) {

                throw new InvalidTokenException(
                        "Invalid refresh token"
                );

        }

        String username =
                jwtTokenProvider.extractUsername(refreshToken);

        String newAccessToken =
                jwtTokenProvider.generateAccessToken(username);

        return RefreshTokenResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(86400000)
                .build();

        }

}
