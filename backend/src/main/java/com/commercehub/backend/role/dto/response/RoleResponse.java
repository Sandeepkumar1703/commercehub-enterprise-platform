package com.commercehub.backend.role.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * ============================================================
 * Role Response
 * ============================================================
 *
 * Response DTO representing a Role in the system.
 *
 * This DTO is returned by Role APIs after creating,
 * retrieving, or updating a role.
 *
 * Example Response:
 *
 * {
 *   "id": 1,
 *   "name": "ROLE_ADMIN",
 *   "description": "Administrator with full system access"
 * }
 */
@Data
@Builder
public class RoleResponse {

    /**
     * Unique identifier of the role.
     */
    private Long id;

    /**
     * Unique role name.
     *
     * Examples:
     * ROLE_SUPER_ADMIN
     * ROLE_ADMIN
     * ROLE_VENDOR
     * ROLE_USER
     * ROLE_MODERATOR
     */
    private String name;

    /**
     * Human-readable description of the role.
     *
     * Example:
     * "Administrator with full system access"
     */
    private String description;

}