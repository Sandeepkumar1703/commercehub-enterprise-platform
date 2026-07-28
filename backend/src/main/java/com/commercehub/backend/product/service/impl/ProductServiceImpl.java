package com.commercehub.backend.product.service.impl;

import com.commercehub.backend.category.entity.Category;
import com.commercehub.backend.category.repository.CategoryRepository;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.product.dto.request.ProductRequest;
import com.commercehub.backend.product.dto.response.ProductResponse;
import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.product.mapper.ProductMapper;
import com.commercehub.backend.product.repository.ProductRepository;
import com.commercehub.backend.product.service.ProductService;
import com.commercehub.backend.storage.service.StorageService;
import com.commercehub.backend.inventory.entity.Inventory;
import com.commercehub.backend.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final StorageService storageService;
    private final InventoryRepository inventoryRepository;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        if (productRepository.existsBySku(request.getSku())) {
            throw new DuplicateResourceException(
                    "Product already exists with SKU: " + request.getSku()
            );
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()
                        -> new ResourceNotFoundException("Category not found")
                );

        Product product = productMapper.toEntity(request);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        Inventory inventory = Inventory.builder()
                .product(savedProduct)
                .quantity(savedProduct.getStockQuantity().longValue())
                .reserved(0L)
                .reorderLevel(10L)
                .build();

        inventoryRepository.save(inventory);

        return productMapper.toResponse(savedProduct);
    }

    @Override
    public List<ProductResponse> createBulkProducts(List<ProductRequest> requests) {

        List<Product> products = requests.stream()
                .map(request -> {

                    if (productRepository.existsBySku(request.getSku())) {
                        throw new DuplicateResourceException(
                                "Product already exists with SKU: " + request.getSku()
                        );
                    }

                    Category category = categoryRepository.findById(
                            request.getCategoryId()
                    ).orElseThrow(()
                            -> new ResourceNotFoundException("Category not found")
                    );

                    Product product = productMapper.toEntity(request);
                    product.setCategory(category);

                    return product;
                })
                .toList();

        List<Product> savedProducts
                = productRepository.saveAll(products);
        List<Inventory> inventories = savedProducts.stream()
                .map(product -> Inventory.builder()
                .product(product)
                .quantity(product.getStockQuantity().longValue())
                .reserved(0L)
                .reorderLevel(10L)
                .build())
                .toList();

        inventoryRepository.saveAll(inventories);

        return savedProducts.stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Product not found")
                );

        return productMapper.toResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {

        return productRepository.findAll(pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> searchProducts(
            String keyword,
            Pageable pageable
    ) {

        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrSkuContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        pageable
                )
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getProductsByCategory(
            Long categoryId,
            Pageable pageable) {

        return productRepository
                .findByCategoryId(categoryId, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getProductsByPriceRange(
            BigDecimal min,
            BigDecimal max,
            Pageable pageable) {

        return productRepository
                .findByPriceBetween(min, max, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getInStockProducts(Pageable pageable) {

        return productRepository
                .findByStockQuantityGreaterThan(0, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getOutOfStockProducts(Pageable pageable) {

        return productRepository
                .findByStockQuantityEquals(0, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Product not found")
                );

        if (productRepository.existsBySkuAndIdNot(request.getSku(), id)) {
            throw new DuplicateResourceException(
                    "Product already exists with SKU: " + request.getSku()
            );
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()
                        -> new ResourceNotFoundException("Category not found")
                );

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setSku(request.getSku());
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);
        inventoryRepository.findByProductId(updatedProduct.getId())
                .ifPresent(inventory -> {
                    inventory.setQuantity(updatedProduct.getStockQuantity().longValue());
                    inventoryRepository.save(inventory);
                });

        return productMapper.toResponse(updatedProduct);
    }

    @Override
    @Transactional
    public ProductResponse uploadProductImage(Long productId, MultipartFile file) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                "Product not found with id: " + productId));

        if (product.getImageUrl() != null && !product.getImageUrl().isBlank()) {
            storageService.delete(product.getImageUrl());
        }

        String imageUrl = storageService.storeProductImage(file);

        product.setImageUrl(imageUrl);

        Product updatedProduct = productRepository.save(product);

        return productMapper.toResponse(updatedProduct);
    }

    @Override
public void deleteProduct(Long id) {

    Product product = productRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found")
            );

    inventoryRepository.findByProductId(product.getId())
            .ifPresent(inventoryRepository::delete);

    productRepository.delete(product);
}
}
