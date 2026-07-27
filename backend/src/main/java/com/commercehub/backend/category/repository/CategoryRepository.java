package com.commercehub.backend.category.repository;

import com.commercehub.backend.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Checks whether a category with the given name exists.
     */
    boolean existsByName(String name);

    /**
     * Finds a category by name.
     */
    Optional<Category> findByName(String name);

}