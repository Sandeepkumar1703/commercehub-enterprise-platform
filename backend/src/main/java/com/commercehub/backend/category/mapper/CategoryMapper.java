package com.commercehub.backend.category.mapper;

import com.commercehub.backend.category.dto.request.CategoryRequest;
import com.commercehub.backend.category.dto.response.CategoryResponse;
import com.commercehub.backend.category.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {


    /**
     * Converts request DTO to entity.
     */
    @Mapping(target = "products", ignore = true)
    Category toEntity(CategoryRequest request);


    /**
     * Converts entity to response DTO.
     */
    @Mapping(
            target = "totalProducts",
            expression = "java(category.getProducts() != null ? (long) category.getProducts().size() : 0L)"
    )
    CategoryResponse toResponse(Category category);


    /**
     * Updates existing entity from request.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "products", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            CategoryRequest request,
            @MappingTarget Category category
    );
}