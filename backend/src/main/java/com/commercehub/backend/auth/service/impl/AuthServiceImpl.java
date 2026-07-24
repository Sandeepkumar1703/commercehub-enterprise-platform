package com.commercehub.backend.auth.service.impl;

import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.service.AuthService;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.role.repository.RoleRepository;
import com.commercehub.backend.security.JwtTokenProvider;
import com.commercehub.backend.security.TokenBlacklist;
import com.commercehub.backend.user.entity.Role;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    /**
     * User Repository
     */
    private final UserRepository userRepository;

    /**
     * Role Repository
     */
    private final RoleRepository roleRepository;

    /**
     * Password Encoder
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Spring Security Authentication Manager
     */
    private final AuthenticationManager authenticationManager;

    /**
     * JWT Provider
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * JWT Blacklist
     */
    private final TokenBlacklist tokenBlacklist;

    /**
     * Register new user.
     */
    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() ->
                        new RuntimeException("ROLE_USER not found"));

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        user.getRoles().add(userRole);

        userRepository.save(user);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null
                );

        return generateTokenResponse(authentication);
    }

    /**
     * Login user.
     */
    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        null
                );

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

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }

        if (request.getCurrentPassword()
                .equals(request.getNewPassword())) {

            throw new RuntimeException(
                    "New password cannot be same as old password"
            );
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException(
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

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    /**
     * Generate JWT response.
     */
    private AuthResponse generateTokenResponse(
            Authentication authentication) {

        return AuthResponse.builder()
                .accessToken(
                        jwtTokenProvider.generateAccessToken(authentication)
                )
                .refreshToken(
                        jwtTokenProvider.generateRefreshToken(authentication)
                )
                .tokenType("Bearer")
                .expiresIn(900000)
                .build();
    }
}