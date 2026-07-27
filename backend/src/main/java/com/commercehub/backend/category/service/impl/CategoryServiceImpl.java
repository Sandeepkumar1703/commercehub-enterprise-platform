package com.commercehub.backend.category.service.impl;

import com.commercehub.backend.category.dto.request.CategoryRequest;
import com.commercehub.backend.category.dto.response.CategoryResponse;
import com.commercehub.backend.category.entity.Category;
import com.commercehub.backend.category.mapper.CategoryMapper;
import com.commercehub.backend.category.repository.CategoryRepository;
import com.commercehub.backend.category.service.CategoryService;
import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;


    @Override
    public CategoryResponse createCategory(CategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Category already exists with name: "
                            + request.getName()
            );
        }

        Category category = categoryMapper.toEntity(request);

        Category savedCategory =
                categoryRepository.save(category);

        return categoryMapper.toResponse(savedCategory);
    }


    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }


    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {

        Category category =
                categoryRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found with id: " + id
                        )
                );

        return categoryMapper.toResponse(category);
    }


    @Override
    public CategoryResponse updateCategory(
            Long id,
            CategoryRequest request
    ) {

        Category category =
                categoryRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found with id: " + id
                        )
                );


        if (!category.getName()
                .equalsIgnoreCase(request.getName())
                &&
            categoryRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Category already exists with name: "
                            + request.getName()
            );
        }


        categoryMapper.updateEntityFromRequest(
                request,
                category
        );


        Category updatedCategory =
                categoryRepository.save(category);


        return categoryMapper.toResponse(updatedCategory);
    }


    @Override
    public void deleteCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found with id: " + id
                        )
                );


        if (category.getProducts() != null
                &&
            !category.getProducts().isEmpty()) {

            throw new BadRequestException(
                    "Cannot delete category because products are assigned to it."
            );
        }


        categoryRepository.delete(category);
    }
}