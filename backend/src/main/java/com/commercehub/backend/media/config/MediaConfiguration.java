package com.commercehub.backend.media.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "storage")
public class MediaConfiguration {

    /**
     * Root storage location.
     */
    private String location;

    /**
     * Product image directory.
     */
    private String productImages;
}