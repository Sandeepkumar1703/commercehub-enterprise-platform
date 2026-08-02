package com.commercehub.backend.role.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * ============================================================
 * Create Role Request
 * ============================================================
 *
 * Request DTO used to create a new role in the system.
 *
 * Example Request:
 *
 * {
 *   "name": "ROLE_MANAGER",
 *   "description": "Manager role with elevated privileges"
 * }
 */
@Data
public class CreateRoleRequest {

    /**
     * Unique Role Name.
     *
     * Examples:
     * ROLE_SUPER_ADMIN
     * ROLE_ADMIN
     * ROLE_VENDOR
     * ROLE_USER
     * ROLE_MODERATOR
     *
     * This field is mandatory.
     */
    @NotBlank(message = "Role name is required")
    private String name;

    /**
     * Human-readable description of the role.
     *
     * Example:
     * "Administrator with full access"
     * "Vendor responsible for product management"
     */
    private String description;

}