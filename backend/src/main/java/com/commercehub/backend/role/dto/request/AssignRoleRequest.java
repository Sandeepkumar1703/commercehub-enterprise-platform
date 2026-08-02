package com.commercehub.backend.role.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ============================================================
 * Assign Role Request DTO
 * ============================================================
 *
 * Request object used to assign an existing role
 * to an existing user.
 *
 * Example Request:
 *
 * {
 *     "userId": 1,
 *     "roleId": 2
 * }
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignRoleRequest {

    /**
     * User ID
     * User who will receive the role.
     */
    @NotNull(message = "User id is required")
    private Long userId;

    /**
     * Role ID
     * Role to be assigned.
     */
    @NotNull(message = "Role id is required")
    private Long roleId;

}