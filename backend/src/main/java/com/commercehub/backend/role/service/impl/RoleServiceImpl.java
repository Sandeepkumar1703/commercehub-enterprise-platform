package com.commercehub.backend.role.service.impl;

import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.permission.entity.Permission;
import com.commercehub.backend.permission.repository.PermissionRepository;
import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RolePermissionResponse;
import com.commercehub.backend.role.dto.response.RoleResponse;
import com.commercehub.backend.role.repository.RoleRepository;
import com.commercehub.backend.role.service.RoleService;
import com.commercehub.backend.user.entity.Role;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * ============================================================
 * Role Service Implementation
 * ============================================================
 *
 * Handles:
 *
 * • Role Management
 * • User Role Assignment
 * • Role Permission Assignment
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    /**
     * Role Repository
     */
    private final RoleRepository roleRepository;

    /**
     * User Repository
     */
    private final UserRepository userRepository;

    /**
     * Permission Repository
     */
    private final PermissionRepository permissionRepository;

    /**
     * ============================================================
     * Role Management
     * ============================================================
     */

    @Override
    public RoleResponse createRole(CreateRoleRequest request) {

        if (roleRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException(
                    "Role already exists with name: " + request.getName()
            );
        }

        Role role = Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        Role savedRole = roleRepository.save(role);

        return RoleResponse.builder()
                .id(savedRole.getId())
                .name(savedRole.getName())
                .description(savedRole.getDescription())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getAllRoles() {

        return roleRepository.findAll()
                .stream()
                .map(role ->
                        RoleResponse.builder()
                                .id(role.getId())
                                .name(role.getName())
                                .description(role.getDescription())
                                .build()
                )
                .toList();
    }

    /**
     * ============================================================
     * User Role Management
     * ============================================================
     */

    @Override
    public void assignRole(Long userId, Long roleId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        )
                );

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + roleId
                        )
                );

        if (user.getRoles().contains(role)) {
            throw new BadRequestException(
                    "Role is already assigned to this user."
            );
        }

        user.getRoles().add(role);

        userRepository.save(user);
    }

    @Override
    public void removeRole(Long userId, Long roleId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        )
                );

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + roleId
                        )
                );

        if (!user.getRoles().contains(role)) {
            throw new BadRequestException(
                    "Role is not assigned to this user."
            );
        }

        user.getRoles().remove(role);

        userRepository.save(user);
    }

    /**
     * ============================================================
     * Role Permission Management
     * ============================================================
     */

    @Override
    @Transactional(readOnly = true)
    public RolePermissionResponse getRolePermissions(Long roleId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + roleId
                        )
                );

        return RolePermissionResponse.builder()
                .roleId(role.getId())
                .roleName(role.getName())
                .permissions(
                        role.getPermissions()
                                .stream()
                                .map(permission ->
                                        RolePermissionResponse.PermissionInfo
                                                .builder()
                                                .id(permission.getId())
                                                .name(permission.getName())
                                                .description(permission.getDescription())
                                                .build()
                                )
                                .toList()
                )
                .build();
    }

    @Override
    public void assignPermission(Long roleId, Long permissionId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + roleId
                        )
                );

        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Permission not found with id: " + permissionId
                        )
                );

        if (role.getPermissions().contains(permission)) {
            throw new BadRequestException(
                    "Permission is already assigned to this role."
            );
        }

        role.getPermissions().add(permission);

        roleRepository.save(role);
    }

    @Override
    public void removePermission(Long roleId, Long permissionId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + roleId
                        )
                );

        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Permission not found with id: " + permissionId
                        )
                );

        if (!role.getPermissions().contains(permission)) {
            throw new BadRequestException(
                    "Permission is not assigned to this role."
            );
        }

        role.getPermissions().remove(permission);

        roleRepository.save(role);
    }
}