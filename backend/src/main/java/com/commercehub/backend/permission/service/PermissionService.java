package com.commercehub.backend.permission.service;

import com.commercehub.backend.permission.dto.request.CreatePermissionRequest;
import com.commercehub.backend.permission.dto.request.UpdatePermissionRequest;
import com.commercehub.backend.permission.dto.response.PermissionResponse;

import java.util.List;

/**
 * ============================================================
 * Permission Service
 * ============================================================
 *
 * Defines business operations for managing permissions.
 *
 * Responsibilities:
 * - Create permissions
 * - Retrieve permissions
 * - Update permissions
 * - Delete permissions
 */
public interface PermissionService {

    /**
     * Create a new permission.
     *
     * @param request Permission creation request
     * @return Created permission
     */
    PermissionResponse createPermission(
            CreatePermissionRequest request
    );

    /**
     * Get all permissions.
     *
     * @return List of permissions
     */
    List<PermissionResponse> getAllPermissions();

    /**
     * Get permission by ID.
     *
     * @param id Permission ID
     * @return Permission details
     */
    PermissionResponse getPermissionById(
            Long id
    );

    /**
     * Update an existing permission.
     *
     * @param id Permission ID
     * @param request Updated permission details
     * @return Updated permission
     */
    PermissionResponse updatePermission(
            Long id,
            UpdatePermissionRequest request
    );

    /**
     * Delete a permission.
     *
     * A permission cannot be deleted if it is currently
     * assigned to one or more roles.
     *
     * @param id Permission ID
     */
    void deletePermission(
            Long id
    );

}