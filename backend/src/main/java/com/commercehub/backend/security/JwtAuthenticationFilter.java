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
 * <p>
 * Executes once for every incoming HTTP request.
 * </p>
 *
 * Responsibilities:
 * <ul>
 *     <li>Read JWT from Authorization header.</li>
 *     <li>Ignore requests without JWT.</li>
 *     <li>Reject blacklisted (logged out) tokens.</li>
 *     <li>Validate JWT.</li>
 *     <li>Load authenticated user.</li>
 *     <li>Populate Spring SecurityContext.</li>
 * </ul>
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * JWT utility class.
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Loads user details from database.
     */
    private final CustomUserDetailsService customUserDetailsService;

    /**
     * Stores invalidated JWT tokens.
     */
    private final TokenBlacklist tokenBlacklist;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        /*
         * No Authorization header.
         */
        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        /*
         * Ignore logged-out tokens.
         */
        if (tokenBlacklist.isBlacklisted(token)) {

            filterChain.doFilter(request, response);
            return;
        }

        try {

            /*
             * Extract username from JWT.
             */
            String username = jwtTokenProvider.getUsername(token);

            /*
             * Authenticate only once per request.
             */
            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

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

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            }

        } catch (Exception ex) {

            /*
             * Invalid or expired JWT.
             * Continue request without authentication.
             */
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}