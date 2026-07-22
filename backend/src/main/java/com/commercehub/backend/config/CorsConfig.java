package com.commercehub.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Global Cross-Origin Resource Sharing (CORS) configuration.
 *
 * Allows the Angular frontend to communicate with the Spring Boot backend.
 * This configuration should be updated for production to allow only trusted origins.
 */
@Slf4j
@Configuration
public class CorsConfig {

    /**
     * Configures global CORS policy.
     *
     * @return CorsConfigurationSource
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allowed Frontend Origins
        configuration.setAllowedOrigins(List.of(
                "http://localhost:4200"
        ));

        // Allowed HTTP Methods
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        // Allowed Request Headers
        configuration.setAllowedHeaders(List.of(
                "*"
        ));

        // Exposed Response Headers
        configuration.setExposedHeaders(List.of(
                "Authorization",
                "Content-Disposition"
        ));

        // Allow Cookies / JWT if needed
        configuration.setAllowCredentials(true);

        // Cache CORS Preflight Response (1 hour)
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        log.info("Global CORS configuration initialized.");

        return source;
    }

}