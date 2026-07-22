package com.commercehub.backend.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI (Swagger) configuration.
 *
 * Provides interactive API documentation
 * with JWT Bearer Authentication support.
 */
@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

    @Bean
    public OpenAPI commerceHubOpenAPI() {

        return new OpenAPI()

                // ===========================
                // API Information
                // ===========================
                .info(new Info()
                        .title("CommerceHub Enterprise API")
                        .version("v1.0.0")
                        .description("""
                                Enterprise-grade E-Commerce Platform built with:
                                
                                • Java 21
                                • Spring Boot 3.x
                                • PostgreSQL
                                • Redis
                                • Kafka
                                • Angular 20
                                
                                Features:
                                
                                • JWT Authentication
                                • Role Based Authorization
                                • Product Management
                                • Inventory Management
                                • Order Processing
                                • Payment Integration
                                • Shipping
                                • Reviews
                                • Wishlist
                                • Coupons
                                """)
                        .contact(new Contact()
                                .name("Sandeep Kumar Prasad")
                                .email("sandeepkumarprasad01@gmail.com")
                                .url("https://github.com/Sandeepkumar1703"))
                        .license(new License()
                                .name("Apache License 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")))

                // ===========================
                // Development Server
                // ===========================
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local Development Server")
                ))

                // ===========================
                // JWT Security
                // ===========================
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(SECURITY_SCHEME_NAME)
                )

                .schemaRequirement(
                        SECURITY_SCHEME_NAME,
                        new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                )

                // ===========================
                // Documentation
                // ===========================
                .externalDocs(
                        new ExternalDocumentation()
                                .description("CommerceHub Documentation")
                                .url("https://github.com/Sandeepkumar1703")
                );
    }

}