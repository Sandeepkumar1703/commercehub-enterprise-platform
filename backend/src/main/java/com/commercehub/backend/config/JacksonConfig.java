package com.commercehub.backend.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * Global Jackson configuration.
 *
 * Configures JSON serialization and deserialization
 * across the entire application.
 */
@Slf4j
@Configuration
public class JacksonConfig {

    /**
     * Customizes Jackson's ObjectMapper.
     *
     * @return Jackson2ObjectMapperBuilderCustomizer
     */
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {

        log.info("Initializing Jackson configuration.");

        return builder -> {

            /*
             * Support Java 8+ Date/Time API
             */
            builder.modules(new JavaTimeModule());

            /*
             * Ignore unknown JSON properties
             */
            builder.featuresToDisable(
                    DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES
            );

            /*
             * Disable timestamps for LocalDateTime
             */
            builder.featuresToDisable(
                    SerializationFeature.WRITE_DATES_AS_TIMESTAMPS
            );

            /*
             * Ignore null fields in JSON response
             */
            builder.serializationInclusion(
                    JsonInclude.Include.NON_NULL
            );

            /*
             * Global Date Format
             */
            builder.simpleDateFormat(
                    "yyyy-MM-dd HH:mm:ss"
            );

            /*
             * UTC Time Zone
             */
            builder.timeZone(
                    TimeZone.getTimeZone("UTC")
            );

        };

    }

}