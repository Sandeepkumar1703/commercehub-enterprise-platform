package com.commercehub.backend.permission.service.impl;

import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.permission.dto.request.CreatePermissionRequest;
import com.commercehub.backend.permission.dto.request.UpdatePermissionRequest;
import com.commercehub.backend.permission.dto.response.PermissionResponse;
import com.commercehub.backend.permission.entity.Permission;
import com.commercehub.backend.permission.mapper.PermissionMapper;
import com.commercehub.backend.permission.repository.PermissionRepository;
import com.commercehub.backend.permission.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * ============================================================
 * Permission Service Implementation
 * ============================================================
 *
 * Handles all business logic for Permission Management.
 *
 * Responsibilities:
 * - Create Permission
 * - Retrieve Permission(s)
 * - Update Permission
 * - Delete Permission
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    /**
     * Create Permission
     */
    @Override
    public PermissionResponse createPermission(
            CreatePermissionRequest request
    ) {

        if (permissionRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Permission already exists with name: "
                            + request.getName()
            );
        }

        Permission permission =
                permissionMapper.toEntity(request);

        Permission savedPermission =
                permissionRepository.save(permission);

        return permissionMapper.toResponse(savedPermission);
    }

    /**
     * Get All Permissions
     */
    @Override
    @Transactional(readOnly = true)
    public List<PermissionResponse> getAllPermissions() {

        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toResponse)
                .toList();
    }

    /**
     * Get Permission By ID
     */
    @Override
    @Transactional(readOnly = true)
    public PermissionResponse getPermissionById(
            Long id
    ) {

        Permission permission =
                permissionRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Permission not found with id: " + id
                                )
                        );

        return permissionMapper.toResponse(permission);
    }

    /**
     * Update Permission
     */
    @Override
    public PermissionResponse updatePermission(
            Long id,
            UpdatePermissionRequest request
    ) {

        Permission permission =
                permissionRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Permission not found with id: " + id
                                )
                        );

        if (!permission.getName().equalsIgnoreCase(request.getName())
                &&
                permissionRepository.existsByNameIgnoreCase(request.getName())) {

            throw new DuplicateResourceException(
                    "Permission already exists with name: "
                            + request.getName()
            );
        }

        permissionMapper.updateEntityFromRequest(
                request,
                permission
        );

        Permission updatedPermission =
                permissionRepository.save(permission);

        return permissionMapper.toResponse(updatedPermission);
    }

    /**
     * Delete Permission
     */
    @Override
    public void deletePermission(
            Long id
    ) {

        Permission permission =
                permissionRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Permission not found with id: " + id
                                )
                        );

        if (permission.getRoles() != null
                &&
                !permission.getRoles().isEmpty()) {

            throw new BadRequestException(
                    "Cannot delete permission because it is assigned to one or more roles."
            );
        }

        permissionRepository.delete(permission);
    }

}