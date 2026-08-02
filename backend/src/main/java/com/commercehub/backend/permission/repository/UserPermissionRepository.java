package com.commercehub.backend.permission.repository;


import com.commercehub.backend.permission.entity.UserPermission;
import com.commercehub.backend.permission.entity.UserPermissionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * ============================================================
 * User Permission Repository
 * ============================================================
 *
 * Handles database operations for direct user permissions.
 *
 *
 * Database Relationship:
 *
 * users
 *    |
 * user_permissions
 *    |
 * permissions
 *
 *
 * This repository manages:
 *
 * - Assigning permission to users
 * - Removing permission from users
 * - Checking existing user permissions
 *
 * ============================================================
 */
@Repository
public interface UserPermissionRepository
        extends JpaRepository<
                UserPermission,
                UserPermissionId
        > {


    /**
     * Check whether a permission is already assigned
     * to a specific user.
     *
     * Example:
     *
     * User:
     *   seller1@commercehub.com
     *
     * Permission:
     *   INVENTORY_DELETE
     *
     * Returns:
     *
     * true  -> already assigned
     * false -> not assigned
     *
     *
     * @param userId user identifier
     * @param permissionId permission identifier
     * @return boolean
     */
    boolean existsByIdUserIdAndIdPermissionId(
            Long userId,
            Long permissionId
    );


    /**
     * Delete permission assigned to user.
     *
     * Example:
     *
     * Remove:
     *
     * User 5
     * Permission 22
     *
     */
    void deleteByIdUserIdAndIdPermissionId(
            Long userId,
            Long permissionId
    );

    /**
     * ============================================================
     * Find permissions assigned to user
     * ============================================================
     *
     * Fetches only permissions belonging to
     * a specific user.
     *
     * SQL equivalent:
     *
     * SELECT *
     * FROM user_permissions
     * WHERE user_id = ?
     *
     * ============================================================
     */
    List<UserPermission> findByIdUserId(
            Long userId
    );


}