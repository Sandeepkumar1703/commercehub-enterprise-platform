package com.commercehub.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * JWT Token Provider.
 *
 * <p>
 * Acts as a wrapper around {@link JwtService}.
 * Responsible for generating and validating JWT tokens.
 * </p>
 *
 * Responsibilities:
 * <ul>
 *     <li>Generate Access Token</li>
 *     <li>Generate Refresh Token</li>
 *     <li>Validate JWT</li>
 *     <li>Extract username from JWT</li>
 * </ul>
 */
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    /**
     * Core JWT service.
     */
    private final JwtService jwtService;

    /**
     * Generates a JWT access token.
     *
     * @param authentication Authenticated user
     * @return Access token
     */
    public String generateAccessToken(Authentication authentication) {

        if (authentication == null || authentication.getName() == null) {
            throw new IllegalArgumentException("Authentication cannot be null.");
        }

        return jwtService.generateAccessToken(
                authentication.getName(),
                Map.of()
        );
    }

    /**
     * Generates a JWT refresh token.
     *
     * @param authentication Authenticated user
     * @return Refresh token
     */
    public String generateRefreshToken(Authentication authentication) {

        if (authentication == null || authentication.getName() == null) {
            throw new IllegalArgumentException("Authentication cannot be null.");
        }

        return jwtService.generateRefreshToken(
                authentication.getName()
        );
    }

    /**
     * Validates a JWT.
     *
     * @param token JWT token
     * @return true if valid, otherwise false
     */
    public boolean validateToken(String token) {

        try {

            String username = jwtService.extractUsername(token);

            return jwtService.validateToken(token, username);

        } catch (Exception ex) {

            return false;

        }
    }

    /**
     * Extracts username from a JWT.
     *
     * @param token JWT token
     * @return username or null if token is invalid
     */
    public String getUsername(String token) {

        try {

            return jwtService.extractUsername(token);

        } catch (Exception ex) {

            return null;

        }
    }

}