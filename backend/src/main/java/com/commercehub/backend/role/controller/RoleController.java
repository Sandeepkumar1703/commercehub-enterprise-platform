package com.commercehub.backend.role.controller;

import com.commercehub.backend.role.dto.request.AssignRoleRequest;
import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RolePermissionResponse;
import com.commercehub.backend.role.dto.response.RoleResponse;
import com.commercehub.backend.role.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================
 * Role Management Controller
 * ============================================================
 *
 * Provides REST APIs for:
 *
 * • Role Management
 * • User Role Assignment
 * • Role Permission Management
 *
 * All endpoints are protected using Spring Security
 * permission-based authorization.
 */
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    /**
     * Role Service
     */
    private final RoleService roleService;

    /**
     * ============================================================
     * Role Management
     * ============================================================
     */

    /**
     * Creates a new role.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param request role details
     * @return created role
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<RoleResponse> createRole(
            @Valid
            @RequestBody
            CreateRoleRequest request
    ) {

        RoleResponse response =
                roleService.createRole(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Retrieves all roles.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @return list of roles
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<List<RoleResponse>> getRoles() {

        return ResponseEntity.ok(
                roleService.getAllRoles()
        );
    }

    /**
     * ============================================================
     * User Role Management
     * ============================================================
     */

    /**
     * Assigns a role to a user.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param request user role assignment request
     * @return success message
     */
    @PostMapping("/assign")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<String> assignRole(

            @Valid
            @RequestBody
            AssignRoleRequest request
    ) {

        roleService.assignRole(
                request.getUserId(),
                request.getRoleId()
        );

        return ResponseEntity.ok(
                "Role assigned successfully."
        );
    }

    /**
     * Removes a role from a user.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param userId user id
     * @param roleId role id
     * @return success message
     */
    @DeleteMapping("/remove")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<String> removeRole(

            @RequestParam
            Long userId,

            @RequestParam
            Long roleId
    ) {

        roleService.removeRole(
                userId,
                roleId
        );

        return ResponseEntity.ok(
                "Role removed successfully."
        );
    }

    /**
     * ============================================================
     * Role Permission Management
     * ============================================================
     */

    /**
     * Retrieves all permissions assigned to a role.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param roleId role id
     * @return role with permissions
     */
    @GetMapping("/{roleId}/permissions")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<RolePermissionResponse> getRolePermissions(

            @PathVariable
            Long roleId
    ) {

        return ResponseEntity.ok(
                roleService.getRolePermissions(roleId)
        );
    }

    /**
     * Assigns a permission to a role.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param roleId role id
     * @param permissionId permission id
     * @return success message
     */
    @PostMapping("/{roleId}/permissions/{permissionId}")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<String> assignPermission(

            @PathVariable
            Long roleId,

            @PathVariable
            Long permissionId
    ) {

        roleService.assignPermission(
                roleId,
                permissionId
        );

        return ResponseEntity.ok(
                "Permission assigned successfully."
        );
    }

    /**
     * Removes a permission from a role.
     *
     * Required Permission:
     * ROLE_MANAGE
     *
     * @param roleId role id
     * @param permissionId permission id
     * @return success message
     */
    @DeleteMapping("/{roleId}/permissions/{permissionId}")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<String> removePermission(

            @PathVariable
            Long roleId,

            @PathVariable
            Long permissionId
    ) {

        roleService.removePermission(
                roleId,
                permissionId
        );

        return ResponseEntity.ok(
                "Permission removed successfully."
        );
    }
}