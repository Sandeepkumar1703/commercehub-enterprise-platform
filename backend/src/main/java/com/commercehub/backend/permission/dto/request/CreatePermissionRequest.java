package com.commercehub.backend.permission.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * ============================================================
 * Create Permission Request
 * ============================================================
 *
 * Request DTO for creating a new permission.
 *
 * Example:
 *
 * {
 *   "name": "PRODUCT_CREATE",
 *   "description": "Allows creating products"
 * }
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePermissionRequest {

    /**
     * Permission Name
     *
     * Examples:
     * PRODUCT_CREATE
     * USER_DELETE
     * ROLE_MANAGE
     */
    @NotBlank(message = "Permission name is required.")
    @Size(max = 100, message = "Permission name must not exceed 100 characters.")
    private String name;

    /**
     * Permission Description
     */
    @NotBlank(message = "Permission description is required.")
    @Size(max = 500, message = "Description must not exceed 500 characters.")
    private String description;

}