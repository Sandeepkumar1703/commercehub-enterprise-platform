package com.commercehub.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * ============================================================
 * Spring Security Configuration
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Disable CSRF (REST APIs)
 * • Enable CORS
 * • Configure JWT Authentication
 * • Configure Unauthorized (401) Handler
 * • Configure Stateless Session Management
 * • Allow Public APIs
 * • Secure Remaining APIs
 * • Enable Method-Level Security
 *
 * Method Security Examples
 * ------------------------------------------------------------
 *
 * @PreAuthorize("hasRole('ADMIN')")
 * @PreAuthorize("hasAuthority('ROLE_MANAGE')")
 * @PreAuthorize("hasAuthority('USER_CREATE')")
 *
 * Authentication Flow
 * ------------------------------------------------------------
 *
 * Request
 *      │
 *      ▼
 * JwtAuthenticationFilter
 *      │
 *      ▼
 * Validate JWT
 *      │
 *      ▼
 * Load User + Roles + Permissions
 *      │
 *      ▼
 * SecurityContext
 *      │
 *      ▼
 * Controller
 *
 */
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * JWT Authentication Filter
     */
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Handles Unauthorized (401) responses.
     */
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    /**
     * Configure Spring Security Filter Chain.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * Enable CORS
                 */
                .cors(Customizer.withDefaults())

                /*
                 * Disable CSRF because this application
                 * uses JWT authentication.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                 * Stateless Session Management
                 *
                 * No HTTP Session will be created.
                 * Every request must provide a JWT.
                 */
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                /*
                 * Handle Unauthorized Requests
                 */
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(
                                jwtAuthenticationEntryPoint
                        )
                )

                /*
                 * Configure API Authorization
                 */
                .authorizeHttpRequests(auth -> auth

                        /*
                         * Public Endpoints
                         */
                        .requestMatchers(

                                "/api/auth/**",

                                "/swagger-ui/**",
                                "/swagger-ui.html",

                                "/v3/api-docs/**",
                                "/v3/api-docs",

                                "/webjars/**",

                                "/uploads/**",

                                "/api/test/public"

                        ).permitAll()

                        /*
                         * All remaining endpoints
                         * require authentication.
                         */
                        .anyRequest()
                        .authenticated()

                )

                /*
                 * Register JWT Authentication Filter
                 */
                .addFilterBefore(

                        jwtAuthenticationFilter,

                        UsernamePasswordAuthenticationFilter.class

                );

        return http.build();
    }

}