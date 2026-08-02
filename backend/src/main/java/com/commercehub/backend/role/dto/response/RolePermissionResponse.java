package com.commercehub.backend.role.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * ============================================================
 * Role Permission Response
 * ============================================================
 *
 * Represents a role along with all permissions assigned to it.
 *
 * Example:
 *
 * {
 *   "roleId": 2,
 *   "roleName": "ROLE_ADMIN",
 *   "permissions": [
 *     {
 *       "id": 1,
 *       "name": "USER_VIEW",
 *       "description": "View users"
 *     },
 *     {
 *       "id": 2,
 *       "name": "USER_CREATE",
 *       "description": "Create users"
 *     }
 *   ]
 * }
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RolePermissionResponse {

    /**
     * Role ID
     */
    private Long roleId;

    /**
     * Role Name
     */
    private String roleName;

    /**
     * Assigned Permissions
     */
    private List<PermissionInfo> permissions;

    /**
     * Permission DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PermissionInfo {

        /**
         * Permission ID
         */
        private Long id;

        /**
         * Permission Name
         */
        private String name;

        /**
         * Permission Description
         */
        private String description;
    }
}