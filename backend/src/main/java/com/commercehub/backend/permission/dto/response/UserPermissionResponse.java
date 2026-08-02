package com.commercehub.backend.permission.dto.response;


import lombok.*;

import java.util.List;


/**
 * ============================================================
 * User Permission Response DTO
 * ============================================================
 *
 * Response object used to return a user's
 * directly assigned permissions.
 *
 *
 * Flow:
 *
 * User
 *   |
 *   | user_permissions
 *   |
 * Permission
 *
 *
 * Example Response:
 *
 * {
 *     "userId": 5,
 *     "firstName": "Customer",
 *     "lastName": "One Demo",
 *     "email": "customer1@commercehub.com",
 *
 *     "permissions": [
 *          {
 *              "id": 20,
 *              "name": "INVENTORY_VIEW",
 *              "description": "View inventory"
 *          }
 *     ]
 * }
 *
 *
 * This does not include role permissions.
 *
 * It only shows direct user-level permissions.
 *
 * ============================================================
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPermissionResponse {



    /**
     * User identifier
     */
    private Long userId;



    /**
     * User first name
     */
    private String firstName;



    /**
     * User last name
     */
    private String lastName;



    /**
     * User email address
     */
    private String email;



    /**
     * Direct permissions assigned to user
     */
    private List<PermissionInfo> permissions;



    /**
     * ============================================================
     * Permission Information DTO
     * ============================================================
     *
     * Represents individual permission details.
     *
     * ============================================================
     */
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PermissionInfo {



        /**
         * Permission ID
         */
        private Long id;



        /**
         * Permission name
         *
         * Example:
         *
         * PRODUCT_DELETE
         */
        private String name;



        /**
         * Permission description
         */
        private String description;

    }

}