package com.commercehub.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * JWT Token Provider
 *
 * Responsibilities:
 * - Generate Access Token
 * - Generate Refresh Token
 * - Validate JWT Token
 * - Extract Username from JWT Token
 */
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    /**
     * JWT Service
     */
    private final JwtService jwtService;

    /**
     * Generate Access Token
     *
     * @param authentication Authenticated user
     * @return JWT Access Token
     */
    public String generateAccessToken(Authentication authentication) {

        String username = authentication.getName();

        return jwtService.generateAccessToken(
                username,
                Collections.emptyMap()   // Never pass null
        );
    }

    /**
     * Generate Refresh Token
     *
     * @param authentication Authenticated user
     * @return JWT Refresh Token
     */
    public String generateRefreshToken(Authentication authentication) {

        String username = authentication.getName();

        return jwtService.generateRefreshToken(username);
    }

    /**
     * Validate JWT Token
     *
     * @param token JWT Token
     * @return true if token is valid
     */
    public boolean validateToken(String token) {

        try {

            String username = jwtService.extractUsername(token);

            return jwtService.validateToken(token, username);

        } catch (Exception exception) {

            return false;

        }
    }

    /**
     * Extract Username From JWT Token
     *
     * @param token JWT Token
     * @return Username or null if token is invalid
     */
    public String getUsername(String token) {

        try {

            return jwtService.extractUsername(token);

        } catch (Exception exception) {

            return null;

        }
    }

}