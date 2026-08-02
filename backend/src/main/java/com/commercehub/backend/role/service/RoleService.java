package com.commercehub.backend.role.service;

import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RolePermissionResponse;
import com.commercehub.backend.role.dto.response.RoleResponse;

import java.util.List;

/**
 * ============================================================
 * Role Service
 * ============================================================
 *
 * Business layer for Role Management.
 *
 * Responsibilities:
 * • Create roles
 * • Retrieve roles
 * • Assign roles to users
 * • Remove roles from users
 * • Assign permissions to roles
 * • Remove permissions from roles
 * • Retrieve permissions assigned to a role
 */
public interface RoleService {

    /**
     * ============================================================
     * Role Management
     * ============================================================
     */

    /**
     * Creates a new role.
     *
     * Example:
     * ROLE_ADMIN
     * ROLE_VENDOR
     * ROLE_SUPER_ADMIN
     *
     * @param request create role request
     * @return created role
     */
    RoleResponse createRole(CreateRoleRequest request);

    /**
     * Retrieves all available roles.
     *
     * @return list of roles
     */
    List<RoleResponse> getAllRoles();

    /**
     * Assigns a role to a user.
     *
     * Example:
     *
     * User
     * ↓
     * ROLE_ADMIN
     *
     * @param userId user id
     * @param roleId role id
     */
    void assignRole(Long userId, Long roleId);

    /**
     * Removes a role from a user.
     *
     * @param userId user id
     * @param roleId role id
     */
    void removeRole(Long userId, Long roleId);

    /**
     * ============================================================
     * Role Permission Management
     * ============================================================
     */

    /**
     * Retrieves all permissions assigned to a role.
     *
     * Example:
     *
     * ROLE_ADMIN
     * ├── USER_CREATE
     * ├── USER_UPDATE
     * ├── PRODUCT_CREATE
     * └── ROLE_MANAGE
     *
     * @param roleId role id
     * @return role with assigned permissions
     */
    RolePermissionResponse getRolePermissions(Long roleId);

    /**
     * Assigns a permission to a role.
     *
     * Example:
     *
     * ROLE_ADMIN
     * +
     * USER_DELETE
     *
     * @param roleId role id
     * @param permissionId permission id
     */
    void assignPermission(Long roleId, Long permissionId);

    /**
     * Removes a permission from a role.
     *
     * @param roleId role id
     * @param permissionId permission id
     */
    void removePermission(Long roleId, Long permissionId);
}