package com.commercehub.backend.admin.service.impl;

import com.commercehub.backend.admin.dto.response.CustomersDashboardResponse;
import com.commercehub.backend.admin.dto.response.DashboardResponse;
import com.commercehub.backend.admin.dto.response.LowStockProductResponse;
import com.commercehub.backend.admin.dto.response.OrdersDashboardResponse;
import com.commercehub.backend.admin.dto.response.ProductsDashboardResponse;
import com.commercehub.backend.admin.dto.response.RecentOrderResponse;
import com.commercehub.backend.admin.dto.response.RevenueDashboardResponse;
import com.commercehub.backend.admin.dto.response.SalesDashboardResponse;
import com.commercehub.backend.admin.dto.response.TopProductResponse;
import com.commercehub.backend.admin.repository.DashboardRepository;
import com.commercehub.backend.admin.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final DashboardRepository dashboardRepository;

    @Override
    public DashboardResponse getDashboard() {
        return dashboardRepository.getDashboard();
    }

    @Override
    public SalesDashboardResponse getSalesDashboard() {
        return dashboardRepository.getSalesDashboard();
    }

    @Override
    public OrdersDashboardResponse getOrdersDashboard() {
        return dashboardRepository.getOrdersDashboard();
    }

    @Override
    public ProductsDashboardResponse getProductsDashboard() {
        return dashboardRepository.getProductsDashboard();
    }

    @Override
    public CustomersDashboardResponse getCustomersDashboard() {
        return dashboardRepository.getCustomersDashboard();
    }

    @Override
    public RevenueDashboardResponse getRevenueDashboard() {
        return dashboardRepository.getRevenueDashboard();
    }

    @Override
    public List<TopProductResponse> getTopProducts() {
        return dashboardRepository.getTopProducts(10);
    }

    @Override
    public List<LowStockProductResponse> getLowStockProducts() {
        return dashboardRepository.getLowStockProducts();
    }

    @Override
    public List<RecentOrderResponse> getRecentOrders() {
        return dashboardRepository.getRecentOrders(10);
    }
}