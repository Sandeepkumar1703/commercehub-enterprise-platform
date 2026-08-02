package com.commercehub.backend.permission.controller;

import com.commercehub.backend.permission.dto.request.CreatePermissionRequest;
import com.commercehub.backend.permission.dto.request.UpdatePermissionRequest;
import com.commercehub.backend.permission.dto.response.PermissionResponse;
import com.commercehub.backend.permission.service.PermissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================
 * Permission Management Controller
 * ============================================================
 *
 * Provides APIs for:
 * - Creating permissions
 * - Retrieving permissions
 * - Updating permissions
 * - Deleting permissions
 *
 * Access to these APIs is protected using permission-based
 * authorization through Spring Security.
 */
@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionService permissionService;

    /**
     * Create a new permission.
     *
     * Required Permission:
     * PERMISSION_MANAGE
     */
    @PostMapping
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<PermissionResponse> createPermission(

            @Valid
            @RequestBody
            CreatePermissionRequest request
    ) {

        PermissionResponse response =
                permissionService.createPermission(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Retrieve all permissions.
     *
     * Required Permission:
     * PERMISSION_MANAGE
     */
    @GetMapping
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<List<PermissionResponse>> getAllPermissions() {

        return ResponseEntity.ok(
                permissionService.getAllPermissions()
        );
    }

    /**
     * Retrieve a permission by ID.
     *
     * Required Permission:
     * PERMISSION_MANAGE
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<PermissionResponse> getPermissionById(

            @PathVariable
            Long id
    ) {

        return ResponseEntity.ok(
                permissionService.getPermissionById(id)
        );
    }

    /**
     * Update an existing permission.
     *
     * Required Permission:
     * PERMISSION_MANAGE
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<PermissionResponse> updatePermission(

            @PathVariable
            Long id,

            @Valid
            @RequestBody
            UpdatePermissionRequest request
    ) {

        return ResponseEntity.ok(
                permissionService.updatePermission(id, request)
        );
    }

    /**
     * Delete a permission.
     *
     * Required Permission:
     * PERMISSION_MANAGE
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PERMISSION_MANAGE')")
    public ResponseEntity<Void> deletePermission(

            @PathVariable
            Long id
    ) {

        permissionService.deletePermission(id);

        return ResponseEntity.noContent().build();
    }

}