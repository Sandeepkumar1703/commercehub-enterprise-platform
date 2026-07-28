package com.commercehub.backend.product.repository;

import com.commercehub.backend.product.entity.Product;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsBySku(String sku);

    boolean existsBySkuAndIdNot(String sku, Long id);

    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrSkuContainingIgnoreCase(
            String name,
            String description,
            String sku,
            Pageable pageable
    );

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findByPriceBetween(
        BigDecimal min,
        BigDecimal max,
        Pageable pageable
);
}