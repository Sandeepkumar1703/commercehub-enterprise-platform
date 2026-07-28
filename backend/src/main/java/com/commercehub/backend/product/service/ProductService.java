package com.commercehub.backend.product.service;

import com.commercehub.backend.product.dto.request.ProductRequest;
import com.commercehub.backend.product.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    List<ProductResponse> createBulkProducts(List<ProductRequest> requests);

    ProductResponse getProductById(Long id);

    Page<ProductResponse> getAllProducts(Pageable pageable);

    Page<ProductResponse> searchProducts(String keyword, Pageable pageable);

    ProductResponse updateProduct(Long id, ProductRequest request);

    Page<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable);

    Page<ProductResponse> getProductsByPriceRange(
            BigDecimal min,
            BigDecimal max,
            Pageable pageable
    );

    Page<ProductResponse> getInStockProducts(Pageable pageable);

    Page<ProductResponse> getOutOfStockProducts(Pageable pageable);

    ProductResponse uploadProductImage(Long productId, MultipartFile file);

    void deleteProduct(Long id);
}
