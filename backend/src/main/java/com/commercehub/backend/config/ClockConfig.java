package com.commercehub.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

/**
 * Configuration class for application-wide Clock bean.
 *
 * Using a Clock bean instead of directly calling LocalDateTime.now()
 * improves testability and ensures consistent time handling across
 * the application.
 */
@Configuration
public class ClockConfig {

    /**
     * Provides the system UTC clock.
     *
     * @return Clock instance
     */
    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

}