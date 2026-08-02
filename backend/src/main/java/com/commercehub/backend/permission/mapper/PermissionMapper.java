package com.commercehub.backend.permission.mapper;

import com.commercehub.backend.permission.dto.request.CreatePermissionRequest;
import com.commercehub.backend.permission.dto.request.UpdatePermissionRequest;
import com.commercehub.backend.permission.dto.response.PermissionResponse;
import com.commercehub.backend.permission.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * ============================================================
 * Permission Mapper
 * ============================================================
 *
 * Converts between:
 *
 * Request DTO  <->  Entity  <->  Response DTO
 *
 * Implemented automatically by MapStruct.
 */
@Mapper(componentModel = "spring")
public interface PermissionMapper {

    /**
     * Convert CreatePermissionRequest to Permission entity.
     *
     * @param request Create request
     * @return Permission entity
     */
    Permission toEntity(CreatePermissionRequest request);

    /**
     * Convert Permission entity to response DTO.
     *
     * @param permission Permission entity
     * @return Permission response
     */
    PermissionResponse toResponse(Permission permission);

    /**
     * Convert Permission entities to response DTO list.
     *
     * @param permissions Permission entities
     * @return List of PermissionResponse
     */
    List<PermissionResponse> toResponseList(List<Permission> permissions);

    /**
     * Update an existing Permission entity.
     *
     * Only mutable fields are copied from the request.
     *
     * @param request Update request
     * @param permission Existing permission entity
     */
    void updateEntityFromRequest(
            UpdatePermissionRequest request,
            @MappingTarget Permission permission
    );

}