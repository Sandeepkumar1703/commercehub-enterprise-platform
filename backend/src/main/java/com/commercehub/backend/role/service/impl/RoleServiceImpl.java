package com.commercehub.backend.role.service.impl;


import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RoleResponse;
import com.commercehub.backend.role.repository.RoleRepository;
import com.commercehub.backend.role.service.RoleService;
import com.commercehub.backend.user.entity.Role;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;



@Service
@RequiredArgsConstructor
public class RoleServiceImpl 
        implements RoleService {


    private final RoleRepository roleRepository;


    private final UserRepository userRepository;



    @Override
    public RoleResponse createRole(
            CreateRoleRequest request
    ){


        Role role = Role.builder()

                .name(
                    request.getName()
                )

                .description(
                    request.getDescription()
                )

                .build();



        Role savedRole =
                roleRepository.save(role);



        return RoleResponse.builder()

                .id(savedRole.getId())

                .name(savedRole.getName())

                .description(savedRole.getDescription())

                .build();

    }





    @Override
    public List<RoleResponse> getAllRoles(){


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





    @Override
    public void assignRole(
            Long userId,
            Long roleId
    ){


        User user =
                userRepository.findById(userId)
                .orElseThrow();



        Role role =
                roleRepository.findById(roleId)
                .orElseThrow();



        user.getRoles()
                .add(role);



        userRepository.save(user);

    }





    @Override
    public void removeRole(
            Long userId,
            Long roleId
    ){


        User user =
                userRepository.findById(userId)
                .orElseThrow();



        user.getRoles()

                .removeIf(
                        role ->
                        role.getId()
                        .equals(roleId)
                );


        userRepository.save(user);

    }


}