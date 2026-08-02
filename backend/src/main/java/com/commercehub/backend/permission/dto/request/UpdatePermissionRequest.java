package com.commercehub.backend.permission.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ============================================================
 * Update Permission Request
 * ============================================================
 *
 * Request DTO for updating an existing permission.
 *
 * Example:
 *
 * {
 *   "name": "PRODUCT_UPDATE",
 *   "description": "Allows updating products"
 * }
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePermissionRequest {

    /**
     * Permission Name
     *
     * Examples:
     * PRODUCT_CREATE
     * USER_UPDATE
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