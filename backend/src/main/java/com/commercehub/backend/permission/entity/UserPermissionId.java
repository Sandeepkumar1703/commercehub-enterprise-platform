package com.commercehub.backend.permission.entity;


import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;


/**
 * ============================================================
 * User Permission Composite Key
 * ============================================================
 *
 * Represents the primary key for user_permissions table.
 *
 *
 * Database Structure:
 *
 * user_permissions
 * -----------------------------
 * user_id       | permission_id
 * -----------------------------
 *     1         |      20
 *     2         |      15
 *
 *
 * A user can have multiple permissions.
 * A permission can belong to multiple users.
 *
 * Therefore, the combination of:
 *
 *      user_id + permission_id
 *
 * becomes the unique identifier.
 *
 *
 * Example:
 *
 * User ID = 5
 * Permission ID = 22
 *
 * Key:
 *
 * (5,22)
 *
 *
 * ============================================================
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPermissionId implements Serializable {


    /**
     * User primary key
     *
     * References:
     *
     * users.id
     */
    private Long userId;



    /**
     * Permission primary key
     *
     * References:
     *
     * permissions.id
     */
    private Long permissionId;


}