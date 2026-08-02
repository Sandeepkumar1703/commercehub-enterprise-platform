package com.commercehub.backend.permission.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ============================================================
 * Permission Response
 * ============================================================
 *
 * Response DTO returned by Permission APIs.
 *
 * Example:
 *
 * {
 *   "id": 1,
 *   "name": "PRODUCT_CREATE",
 *   "description": "Allows creating products"
 * }
 *
 * Note:
 * This DTO intentionally does not expose the associated Roles
 * to avoid circular references and unnecessary payload.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionResponse {

    /**
     * Permission ID
     */
    private Long id;

    /**
     * Permission Name
     */
    private String name;

    /**
     * Permission Description
     */
    private String description;

}