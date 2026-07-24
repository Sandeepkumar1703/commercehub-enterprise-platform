package com.commercehub.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter.
 *
 * This filter executes once for every incoming HTTP request.
 *
 * Responsibilities:
 * 1. Read JWT token from the Authorization header.
 * 2. Reject blacklisted (logged out) tokens.
 * 3. Validate the JWT.
 * 4. Load the authenticated user.
 * 5. Store the Authentication object inside the Security Context.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * JWT utility class.
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Loads user details from the database.
     */
    private final CustomUserDetailsService customUserDetailsService;

    /**
     * Stores invalidated (logged out) JWT tokens.
     */
    private final TokenBlacklist tokenBlacklist;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        /*
         * Read Authorization header.
         *
         * Expected format:
         * Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
         */
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        /*
         * Extract JWT token.
         */
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            /*
             * If the token has been logged out,
             * do not authenticate the request.
             */
            if (tokenBlacklist.isBlacklisted(token)) {

                filterChain.doFilter(request, response);
                return;
            }

            /*
             * Extract username from JWT.
             */
            username = jwtTokenProvider.getUsername(token);
        }

        /*
         * Authenticate only if:
         * - Username exists.
         * - User is not already authenticated.
         */
        if (username != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            /*
             * Load user from database.
             */
            UserDetails userDetails =
                    customUserDetailsService.loadUserByUsername(username);

            /*
             * Validate JWT.
             */
            if (jwtTokenProvider.validateToken(token)) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                /*
                 * Store authenticated user in Security Context.
                 */
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }
        }

        /*
         * Continue with the remaining filter chain.
         */
        filterChain.doFilter(request, response);
    }
}