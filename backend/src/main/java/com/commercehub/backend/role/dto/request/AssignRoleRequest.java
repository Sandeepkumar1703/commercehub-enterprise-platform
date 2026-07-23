package com.commercehub.backend.role.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Data;



@Data
public class AssignRoleRequest {


    @NotNull
    private Long userId;


    @NotNull
    private Long roleId;

}