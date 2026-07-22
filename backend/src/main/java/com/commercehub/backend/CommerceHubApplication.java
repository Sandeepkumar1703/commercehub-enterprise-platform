package com.commercehub.backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main application entry point for CommerceHub Enterprise E-Commerce Platform.
 *
 * <p>This class bootstraps the Spring Boot application with the following configurations:
 * <ul>
 *   <li>JPA/Hibernate for ORM</li>
 *   <li>Spring Security for authentication & authorization</li>
 *   <li>Spring Data Redis for caching</li>
 *   <li>Spring Kafka for event streaming</li>
 *   <li>Transaction management with AOP</li>
 *   <li>Async processing support</li>
 *   <li>Method-level security</li>
 * </ul>
 *
 * <p>OpenAPI (Swagger) documentation is auto-generated and available at:
 * {@code http://localhost:8080/api/swagger-ui.html}
 *
 * <p><b>Application Profiles:</b><br/>
 * - {@code dev}: Development environment (local PostgreSQL, debug logging)<br/>
 * - {@code prod}: Production environment (optimized settings, environment variables)
 *
 * <p><b>Tech Stack:</b><br/>
 * - Java 21<br/>
 * - Spring Boot 3.3.2<br/>
 * - PostgreSQL<br/>
 * - Redis<br/>
 * - Kafka
 *
 * @author CommerceHub Development Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableTransactionManagement
@EnableAspectJAutoProxy
@EnableCaching
@EnableAsync
@EnableKafka
@EnableRetry
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
@OpenAPIDefinition(
    info = @Info(
        title = "CommerceHub API",
        version = "1.0.0",
        description = "Enterprise Grade E-Commerce Platform REST API",
        contact = @Contact(
            name = "CommerceHub Development Team",
            url = "https://commercehub.com"
        ),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0.html"
        )
    )
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "JWT token authentication",
    in = SecuritySchemeIn.HEADER
)
public class CommerceHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommerceHubApplication.class, args);
    }

}
