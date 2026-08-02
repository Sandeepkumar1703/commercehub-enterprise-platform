package com.commercehub.backend.permission.service.impl;


import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.permission.dto.response.UserPermissionResponse;
import com.commercehub.backend.permission.entity.Permission;
import com.commercehub.backend.permission.entity.UserPermission;
import com.commercehub.backend.permission.entity.UserPermissionId;
import com.commercehub.backend.permission.repository.PermissionRepository;
import com.commercehub.backend.permission.repository.UserPermissionRepository;
import com.commercehub.backend.permission.service.UserPermissionService;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;


/**
 * ============================================================
 * User Permission Service Implementation
 * ============================================================
 *
 * Handles business logic for assigning direct permissions
 * to users.
 *
 *
 * Permission Flow:
 *
 * User
 *   |
 * user_permissions
 *   |
 * Permission
 *
 *
 * Responsibilities:
 *
 * - Assign permission to user
 * - Remove permission from user
 * - Fetch user permissions
 *
 *
 * ============================================================
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserPermissionServiceImpl
        implements UserPermissionService {



    private final UserRepository userRepository;

    private final PermissionRepository permissionRepository;

    private final UserPermissionRepository userPermissionRepository;



    /**
     * ========================================================
     * Assign Permission To User
     * ========================================================
     */
    @Override
    public void assignPermission(
            Long userId,
            Long permissionId
    ) {


        User user =
                userRepository.findById(userId)

                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found with id: "
                                        + userId
                        )
                );



        Permission permission =
                permissionRepository.findById(permissionId)

                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Permission not found with id: "
                                        + permissionId
                        )
                );



        boolean exists =
                userPermissionRepository
                        .existsByIdUserIdAndIdPermissionId(
                                userId,
                                permissionId
                        );



        if (exists) {

            throw new BadRequestException(
                    "Permission already assigned to user."
            );

        }



        UserPermission userPermission =
                UserPermission.builder()

                        .id(
                                UserPermissionId.builder()
                                        .userId(userId)
                                        .permissionId(permissionId)
                                        .build()
                        )

                        .user(user)

                        .permission(permission)

                        .assignedAt(
                                LocalDateTime.now()
                        )

                        .build();



        userPermissionRepository.save(
                userPermission
        );

    }




    /**
     * ========================================================
     * Remove Permission From User
     * ========================================================
     */
    @Override
    public void removePermission(
            Long userId,
            Long permissionId
    ) {



        boolean exists =
                userPermissionRepository
                        .existsByIdUserIdAndIdPermissionId(
                                userId,
                                permissionId
                        );



        if (!exists) {

            throw new ResourceNotFoundException(
                    "Permission is not assigned to user."
            );

        }



        userPermissionRepository
                .deleteByIdUserIdAndIdPermissionId(
                        userId,
                        permissionId
                );

    }





    /**
     * ========================================================
     * Get User Permissions
     * ========================================================
     *
     * Returns all direct permissions assigned
     * to a user.
     *
     *
     * Optimized Query:
     *
     * SELECT *
     * FROM user_permissions
     * WHERE user_id = ?
     *
     * ========================================================
     */
    @Override
    @Transactional(readOnly = true)
    public UserPermissionResponse getUserPermissions(
            Long userId
    ) {



        User user =
                userRepository.findById(userId)

                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found with id: "
                                        + userId
                        )
                );



        List<UserPermissionResponse.PermissionInfo> permissions =

                userPermissionRepository
                        .findByIdUserId(userId)

                        .stream()

                        .map(
                                up ->

                                UserPermissionResponse.PermissionInfo
                                        .builder()

                                        .id(
                                                up.getPermission()
                                                        .getId()
                                        )

                                        .name(
                                                up.getPermission()
                                                        .getName()
                                        )

                                        .description(
                                                up.getPermission()
                                                        .getDescription()
                                        )

                                        .build()

                        )

                        .toList();




        return UserPermissionResponse.builder()

                .userId(
                        user.getId()
                )

                .firstName(
                        user.getFirstName()
                )

                .lastName(
                        user.getLastName()
                )

                .email(
                        user.getEmail()
                )

                .permissions(
                        permissions
                )

                .build();

    }


}