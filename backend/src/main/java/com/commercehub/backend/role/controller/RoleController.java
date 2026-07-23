package com.commercehub.backend.role.controller;

import com.commercehub.backend.role.dto.request.AssignRoleRequest;
import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RoleResponse;
import com.commercehub.backend.role.service.RoleService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Role Management APIs
 */
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * Create Role
     */
    @PostMapping
    public ResponseEntity<RoleResponse> createRole(
            @Valid
            @RequestBody
            CreateRoleRequest request
    ) {

        return ResponseEntity.ok(
                roleService.createRole(request)
        );

    }

    /**
     * Get All Roles
     */
    @GetMapping
    public ResponseEntity<List<RoleResponse>> getRoles() {

        return ResponseEntity.ok(
                roleService.getAllRoles()
        );

    }

    /**
     * Assign Role to User
     */
    @PostMapping("/assign")
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
     * Remove Role
     */
    @DeleteMapping("/remove")
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