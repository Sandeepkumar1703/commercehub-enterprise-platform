package com.commercehub.backend.role.repository;

import com.commercehub.backend.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * ============================================================
 * Role Repository
 * ============================================================
 *
 * Repository for Role entity.
 *
 * Provides CRUD operations and custom finder methods
 * for role management.
 *
 * Tables:
 * roles
 *
 * Relationships:
 * roles
 *    │
 *    ├── user_roles
 *    │
 *    └── role_permissions
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Find role by its unique name.
     *
     * Example:
     * ROLE_ADMIN
     * ROLE_VENDOR
     * ROLE_SUPER_ADMIN
     *
     * @param name role name
     * @return Optional Role
     */
    Optional<Role> findByName(String name);

    /**
     * Checks whether a role already exists.
     *
     * Useful while creating new roles to prevent duplicates.
     *
     * @param name role name
     * @return true if exists
     */
    boolean existsByName(String name);
}