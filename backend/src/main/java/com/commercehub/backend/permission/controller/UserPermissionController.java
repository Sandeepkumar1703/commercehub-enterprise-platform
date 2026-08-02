package com.commercehub.backend.permission.controller;


import com.commercehub.backend.permission.dto.response.UserPermissionResponse;
import com.commercehub.backend.permission.service.UserPermissionService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



/**
 * ============================================================
 * User Permission Controller
 * ============================================================
 *
 * Provides APIs for managing direct permissions assigned
 * to individual users.
 *
 *
 * RBAC Structure:
 *
 * User
 *   |
 *   user_permissions
 *   |
 * Permission
 *
 *
 * Responsibilities:
 *
 * - Assign permission directly to user
 * - Remove permission from user
 * - View user permissions
 *
 *
 * Security:
 *
 * Only users having:
 *
 * PERMISSION_MANAGE
 *
 * can access these APIs.
 *
 *
 * ============================================================
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserPermissionController {



    private final UserPermissionService userPermissionService;




    /**
     * ========================================================
     * Assign Permission To User
     * ========================================================
     *
     * Assigns a direct permission to a user.
     *
     *
     * Example:
     *
     * POST
     * /api/users/5/permissions/22
     *
     *
     * Result:
     *
     * User 5 gets permission 22
     *
     */
    @PostMapping("/{userId}/permissions/{permissionId}")
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<String> assignPermission(

            @PathVariable
            Long userId,


            @PathVariable
            Long permissionId

    ) {


        userPermissionService.assignPermission(
                userId,
                permissionId
        );


        return ResponseEntity.ok(
                "Permission assigned to user successfully."
        );

    }




    /**
     * ========================================================
     * Remove Permission From User
     * ========================================================
     *
     * Removes direct permission mapping.
     *
     *
     * Example:
     *
     * DELETE
     * /api/users/5/permissions/22
     *
     */
    @DeleteMapping("/{userId}/permissions/{permissionId}")
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<String> removePermission(

            @PathVariable
            Long userId,


            @PathVariable
            Long permissionId

    ) {



        userPermissionService.removePermission(
                userId,
                permissionId
        );


        return ResponseEntity.ok(
                "Permission removed from user successfully."
        );

    }





    /**
     * ========================================================
     * Get User Permissions
     * ========================================================
     *
     * Returns all direct permissions assigned
     * to a specific user.
     *
     *
     * Example:
     *
     * GET
     * /api/users/5/permissions
     *
     *
     * Response:
     *
     * {
     *   "userId":5,
     *   "email":"customer1@commercehub.com",
     *
     *   "permissions":[
     *       {
     *          "name":"INVENTORY_VIEW"
     *       }
     *   ]
     * }
     *
     */
    @GetMapping("/{userId}/permissions")
@PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
public ResponseEntity<UserPermissionResponse> getUserPermissions(

        @PathVariable
        Long userId

) {

    return ResponseEntity.ok(

            userPermissionService
                    .getUserPermissions(userId)

    );

}


}