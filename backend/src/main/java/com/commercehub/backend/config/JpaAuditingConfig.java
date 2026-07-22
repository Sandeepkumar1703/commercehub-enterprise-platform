package com.commercehub.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Enables JPA Auditing.
 *
 * Automatically populates audit fields such as:
 * - createdAt
 * - updatedAt
 *
 * These fields are defined in BaseEntity.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {

}