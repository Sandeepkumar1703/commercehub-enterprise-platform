package com.commercehub.backend.permission.entity;


import com.commercehub.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


/**
 * ============================================================
 * User Permission Entity
 * ============================================================
 *
 * Represents direct permissions assigned to individual users.
 *
 * RBAC Flow:
 *
 * User
 *   |
 *   | user_permissions
 *   |
 * Permission
 *
 *
 * Example:
 *
 * User:
 *   seller1@commercehub.com
 *
 * Direct Permission:
 *   INVENTORY_DELETE
 *
 *
 * This allows permission override at user level.
 *
 * Example:
 *
 * ROLE_VENDOR
 *      |
 *      PRODUCT_CREATE
 *
 * But a specific vendor user can additionally have:
 *
 *      INVENTORY_DELETE
 *
 * without changing the entire role permission.
 *
 * ============================================================
 */
@Entity
@Table(
        name = "user_permissions"
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPermission {


    /**
     * Composite Primary Key
     *
     * Contains:
     *
     * userId
     * permissionId
     *
     */
    @EmbeddedId
    private UserPermissionId id;



    /**
     * User reference
     *
     * Relationship:
     *
     * users
     *    |
     * user_permissions
     *
     *
     * @MapsId connects this relationship
     * with userId inside composite key.
     */
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @MapsId("userId")
    @JoinColumn(
            name = "user_id"
    )
    private User user;



    /**
     * Permission reference
     *
     * Relationship:
     *
     * permissions
     *       |
     * user_permissions
     *
     *
     * @MapsId connects this relationship
     * with permissionId inside composite key.
     */
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @MapsId("permissionId")
    @JoinColumn(
            name = "permission_id"
    )
    private Permission permission;



    /**
     * Timestamp when permission
     * was assigned to user.
     *
     * Example:
     *
     * 2026-08-02 23:30:00
     */
    @Column(
            nullable = false
    )
    @Builder.Default
    private LocalDateTime assignedAt =
            LocalDateTime.now();


}