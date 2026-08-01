package com.commercehub.backend.role.controller;

import com.commercehub.backend.role.dto.request.AssignRoleRequest;
import com.commercehub.backend.role.dto.request.CreateRoleRequest;
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
 * Provides APIs for:
 * - Creating roles
 * - Retrieving roles
 * - Assigning roles to users
 * - Removing roles from users
 *
 * Access to these APIs is protected using permission-based
 * authorization through Spring Security.
 */
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * Create a new role.
     *
     * Required Permission:
     * ROLE_MANAGE
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<RoleResponse> createRole(
            @Valid
            @RequestBody
            CreateRoleRequest request
    ) {

        RoleResponse response = roleService.createRole(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Retrieve all available roles.
     *
     * Required Permission:
     * ROLE_MANAGE
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<List<RoleResponse>> getRoles() {

        return ResponseEntity.ok(
                roleService.getAllRoles()
        );
    }

    /**
     * Assign a role to a user.
     *
     * Required Permission:
     * ROLE_MANAGE
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
     * Remove a role from a user.
     *
     * Required Permission:
     * ROLE_MANAGE
     */
    @DeleteMapping("/remove")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    public ResponseEntity<String> removeRole(

            @RequestParam Long userId,

            @RequestParam Long roleId
    ) {

        roleService.removeRole(
                userId,
                roleId
        );

        return ResponseEntity.ok(
                "Role removed successfully."
        );
    }

}