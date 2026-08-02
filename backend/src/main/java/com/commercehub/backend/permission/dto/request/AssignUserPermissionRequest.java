package com.commercehub.backend.permission.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.*;


/**
 * ============================================================
 * Assign User Permission Request DTO
 * ============================================================
 *
 * Request object used for assigning a direct permission
 * to a specific user.
 *
 *
 * Flow:
 *
 * Admin
 *   |
 *   | Assign Permission
 *   |
 * User
 *   |
 * user_permissions
 *   |
 * Permission
 *
 *
 * Example Request:
 *
 * {
 *     "userId": 5,
 *     "permissionId": 22
 * }
 *
 *
 * Meaning:
 *
 * Assign INVENTORY_UPDATE permission
 * directly to user with id 5.
 *
 *
 * Note:
 *
 * This is different from role permissions.
 *
 * Role Permission:
 *
 * ROLE_VENDOR
 *      |
 *      PRODUCT_CREATE
 *
 *
 * User Permission:
 *
 * seller1
 *      |
 *      INVENTORY_DELETE
 *
 *
 * ============================================================
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignUserPermissionRequest {


    /**
     * User ID
     *
     * Required:
     * User must exist before assigning permission.
     */
    @NotNull(
            message = "User id is required"
    )
    private Long userId;



    /**
     * Permission ID
     *
     * Required:
     * Permission must exist before assignment.
     */
    @NotNull(
            message = "Permission id is required"
    )
    private Long permissionId;


}
