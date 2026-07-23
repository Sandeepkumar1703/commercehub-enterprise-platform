package com.commercehub.backend.product.service;

import com.commercehub.backend.product.dto.request.ProductRequest;
import com.commercehub.backend.product.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse getProductById(Long id);

    List<ProductResponse> getAllProducts();

    List<ProductResponse> createBulkProducts(List<ProductRequest> requests);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);
}