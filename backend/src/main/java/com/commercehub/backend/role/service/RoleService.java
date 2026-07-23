package com.commercehub.backend.role.service;


import com.commercehub.backend.role.dto.request.CreateRoleRequest;
import com.commercehub.backend.role.dto.response.RoleResponse;

import java.util.List;



public interface RoleService {


    RoleResponse createRole(
            CreateRoleRequest request
    );


    List<RoleResponse> getAllRoles();


    void assignRole(
            Long userId,
            Long roleId
    );


    void removeRole(
            Long userId,
            Long roleId
    );

}