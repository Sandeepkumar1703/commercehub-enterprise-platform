package com.commercehub.backend.admin.controller;

import com.commercehub.backend.admin.dto.response.CustomersDashboardResponse;
import com.commercehub.backend.admin.dto.response.DashboardResponse;
import com.commercehub.backend.admin.dto.response.LowStockProductResponse;
import com.commercehub.backend.admin.dto.response.OrdersDashboardResponse;
import com.commercehub.backend.admin.dto.response.ProductsDashboardResponse;
import com.commercehub.backend.admin.dto.response.RecentOrderResponse;
import com.commercehub.backend.admin.dto.response.RevenueDashboardResponse;
import com.commercehub.backend.admin.dto.response.SalesDashboardResponse;
import com.commercehub.backend.admin.dto.response.TopProductResponse;
import com.commercehub.backend.admin.service.AdminDashboardService;
import com.commercehub.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "admin-controller")
@PreAuthorize("permitAll()")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Dashboard Summary")
    public ApiResponse<DashboardResponse> getDashboard() {
        return ApiResponse.success(
                "Dashboard loaded successfully",
                dashboardService.getDashboard()
        );
    }

    @GetMapping("/sales")
    @Operation(summary = "Sales Dashboard")
    public ApiResponse<SalesDashboardResponse> getSalesDashboard() {
        return ApiResponse.success(
                "Sales dashboard loaded successfully",
                dashboardService.getSalesDashboard()
        );
    }

    @GetMapping("/orders")
    @Operation(summary = "Orders Dashboard")
    public ApiResponse<OrdersDashboardResponse> getOrdersDashboard() {
        return ApiResponse.success(
                "Orders dashboard loaded successfully",
                dashboardService.getOrdersDashboard()
        );
    }

    @GetMapping("/products")
    @Operation(summary = "Products Dashboard")
    public ApiResponse<ProductsDashboardResponse> getProductsDashboard() {
        return ApiResponse.success(
                "Products dashboard loaded successfully",
                dashboardService.getProductsDashboard()
        );
    }

    @GetMapping("/customers")
    @Operation(summary = "Customers Dashboard")
    public ApiResponse<CustomersDashboardResponse> getCustomersDashboard() {
        return ApiResponse.success(
                "Customers dashboard loaded successfully",
                dashboardService.getCustomersDashboard()
        );
    }

    @GetMapping("/revenue")
    @Operation(summary = "Revenue Dashboard")
    public ApiResponse<RevenueDashboardResponse> getRevenueDashboard() {
        return ApiResponse.success(
                "Revenue dashboard loaded successfully",
                dashboardService.getRevenueDashboard()
        );
    }

    @GetMapping("/top-products")
    @Operation(summary = "Top Selling Products")
    public ApiResponse<List<TopProductResponse>> getTopProducts() {
        return ApiResponse.success(
                "Top products loaded successfully",
                dashboardService.getTopProducts()
        );
    }

    @GetMapping("/low-stock")
    @Operation(summary = "Low Stock Products")
    public ApiResponse<List<LowStockProductResponse>> getLowStockProducts() {
        return ApiResponse.success(
                "Low stock products loaded successfully",
                dashboardService.getLowStockProducts()
        );
    }

    @GetMapping("/recent-orders")
    @Operation(summary = "Recent Orders")
    public ApiResponse<List<RecentOrderResponse>> getRecentOrders() {
        return ApiResponse.success(
                "Recent orders loaded successfully",
                dashboardService.getRecentOrders()
        );
    }
}