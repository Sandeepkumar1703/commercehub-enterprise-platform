package com.commercehub.backend.permission.repository;


import com.commercehub.backend.permission.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * ============================================================
 * Permission Repository
 * ============================================================
 *
 * Repository layer for Permission entity.
 *
 * Responsible for:
 * - Saving permissions
 * - Fetching permissions
 * - Checking duplicate permission names
 *
 */
public interface PermissionRepository
        extends JpaRepository<Permission, Long> {


    /**
     * Find permission by exact name.
     *
     * Example:
     * PRODUCT_CREATE
     *
     * @param name permission name
     * @return permission if found
     */
    Optional<Permission> findByName(String name);



    /**
     * Check permission existence using exact match.
     *
     * Used during permission creation.
     *
     * Example:
     *
     * PRODUCT_CREATE
     *
     * @param name permission name
     * @return true if permission exists
     */
    boolean existsByName(String name);



    /**
     * Check permission existence ignoring case.
     *
     * Prevents duplicates like:
     *
     * PRODUCT_CREATE
     * product_create
     *
     * @param name permission name
     * @return true if permission exists
     */
    boolean existsByNameIgnoreCase(String name);

}