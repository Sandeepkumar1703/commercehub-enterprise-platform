package com.commercehub.backend.security;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security Configuration
 *
 * Responsibilities:
 * - Disable CSRF (REST API)
 * - Configure JWT Authentication
 * - Configure Exception Handling
 * - Allow Public Endpoints
 * - Secure Remaining Endpoints
 * - Enable Method Level Security
 *
 * Method level annotations supported:
 *
 * @PreAuthorize(...)
 * @PostAuthorize(...)
 * @RolesAllowed(...)
 * @Secured(...)
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
     * Handles Unauthorized Requests (401)
     */
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    /**
     * Configure Spring Security Filter Chain
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /*
                 * Disable CSRF for Stateless REST APIs
                 */
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                /*
                 * Custom Authentication Entry Point
                 */
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )

                /*
                 * Configure Endpoint Authorization
                 */
                .authorizeHttpRequests(auth -> auth

                        /*
                         * Public APIs
                         */
                        .requestMatchers(

                                "/api/auth/**",

                                "/api/test/public",

                                "/swagger-ui/**",

                                "/swagger-ui.html",

                                "/v3/api-docs/**",

                                "/v3/api-docs",

                                "/webjars/**"

                        ).permitAll()

                        /*
                         * All other APIs require Authentication
                         */
                        .anyRequest().authenticated()

                )

                /*
                 * JWT Authentication Filter
                 */
                .addFilterBefore(

                        jwtAuthenticationFilter,

                        UsernamePasswordAuthenticationFilter.class

                );

        return http.build();
    }

}