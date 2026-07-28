package com.commercehub.backend.product.controller;

import com.commercehub.backend.product.dto.request.ProductRequest;
import com.commercehub.backend.product.dto.response.ProductResponse;
import com.commercehub.backend.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Create a new product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Product created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request"),
        @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

    @Operation(summary = "Get product by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product found"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    @Operation(summary = "Get product by pagination")
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.getAllProducts(pageable)
        );
    }

    @Operation(summary = "Search products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Products retrieved successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam String keyword,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword, pageable)
        );
    }

    @Operation(summary = "Filter products by category")
    @GetMapping("/filter/category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(
                        categoryId,
                        pageable
                )
        );
    }

    @Operation(summary = "Filter products by price range")
    @GetMapping("/filter/price")
    public ResponseEntity<Page<ProductResponse>> getProductsByPriceRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "price"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.getProductsByPriceRange(
                        min,
                        max,
                        pageable
                )
        );
    }

    @Operation(summary = "Filter in-stock products")
    @GetMapping("/filter/in-stock")
    public ResponseEntity<Page<ProductResponse>> getInStockProducts(
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.getInStockProducts(pageable)
        );
    }

    @Operation(summary = "Filter out-of-stock products")
    @GetMapping("/filter/out-of-stock")
    public ResponseEntity<Page<ProductResponse>> getOutOfStockProducts(
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id"
            ) Pageable pageable) {

        return ResponseEntity.ok(
                productService.getOutOfStockProducts(pageable)
        );
    }

    @Operation(summary = "Update product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request"),
        @ApiResponse(responseCode = "404", description = "Product or Category not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }

    @PostMapping(
            value = "/{productId}/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProductResponse> uploadProductImage(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file
    ) {
        return ResponseEntity.ok(
                productService.uploadProductImage(productId, file)
        );
    }

    @Operation(summary = "Delete product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Create multiple products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Products created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request"),
        @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PostMapping("/bulk")
    public ResponseEntity<List<ProductResponse>> createBulkProducts(
            @Valid @RequestBody List<ProductRequest> requests) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createBulkProducts(requests));
    }
}
