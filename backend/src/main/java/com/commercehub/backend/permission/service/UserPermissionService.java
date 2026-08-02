package com.commercehub.backend.permission.service;


import com.commercehub.backend.permission.dto.response.UserPermissionResponse;


/**
 * ============================================================
 * User Permission Service Interface
 * ============================================================
 *
 * Defines business operations for managing direct
 * permissions assigned to users.
 *
 *
 * RBAC Structure:
 *
 * User
 *   |
 *   | user_permissions
 *   |
 * Permission
 *
 *
 * Responsibilities:
 *
 * 1. Assign permission directly to a user
 * 2. Remove permission from a user
 * 3. Retrieve user assigned permissions
 *
 *
 * Note:
 *
 * This works independently from role permissions.
 *
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
public interface UserPermissionService {


    /**
     * ========================================================
     * Assign Permission To User
     * ========================================================
     *
     * Assigns a direct permission to a specific user.
     *
     * Example:
     *
     * User:
     *   seller1@commercehub.com
     *
     * Permission:
     *   INVENTORY_DELETE
     *
     *
     * @param userId user identifier
     * @param permissionId permission identifier
     */
    void assignPermission(
            Long userId,
            Long permissionId
    );



    /**
     * ========================================================
     * Remove Permission From User
     * ========================================================
     *
     * Removes a direct permission assigned to a user.
     *
     *
     * @param userId user identifier
     * @param permissionId permission identifier
     */
    void removePermission(
            Long userId,
            Long permissionId
    );



    /**
     * ========================================================
     * Get User Permissions
     * ========================================================
     *
     * Returns all direct permissions assigned to a user.
     *
     *
     * Example:
     *
     * User:
     *   customer1@commercehub.com
     *
     * Permissions:
     *
     *   CART_VIEW
     *   ORDER_CREATE
     *
     *
     * @param userId user identifier
     *
     * @return user permission details
     */
    UserPermissionResponse getUserPermissions(
            Long userId
    );


}