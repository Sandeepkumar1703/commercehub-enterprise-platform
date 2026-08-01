package com.commercehub.backend.admin.repository;

import com.commercehub.backend.admin.dto.response.CustomersDashboardResponse;
import com.commercehub.backend.admin.dto.response.DashboardResponse;
import com.commercehub.backend.admin.dto.response.LowStockProductResponse;
import com.commercehub.backend.admin.dto.response.OrdersDashboardResponse;
import com.commercehub.backend.admin.dto.response.ProductsDashboardResponse;
import com.commercehub.backend.admin.dto.response.RecentOrderResponse;
import com.commercehub.backend.admin.dto.response.RevenueDashboardResponse;
import com.commercehub.backend.admin.dto.response.SalesDashboardResponse;
import com.commercehub.backend.admin.dto.response.TopProductResponse;

import java.util.List;

public interface DashboardRepository {

    DashboardResponse getDashboard();

    SalesDashboardResponse getSalesDashboard();

    OrdersDashboardResponse getOrdersDashboard();

    ProductsDashboardResponse getProductsDashboard();

    CustomersDashboardResponse getCustomersDashboard();

    RevenueDashboardResponse getRevenueDashboard();

    List<TopProductResponse> getTopProducts(int limit);

    List<LowStockProductResponse> getLowStockProducts();

    List<RecentOrderResponse> getRecentOrders(int limit);

}