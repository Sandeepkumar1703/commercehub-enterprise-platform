package com.commercehub.backend.analytics.service;


import com.commercehub.backend.analytics.dto.response.*;

import java.util.List;


public interface AnalyticsService {


    SalesAnalyticsResponse getSalesAnalytics();


    RevenueAnalyticsResponse getRevenueAnalytics();


    OrderAnalyticsResponse getOrderAnalytics();


    CustomerAnalyticsResponse getCustomerAnalytics();


    ProductAnalyticsResponse getProductAnalytics();


    CategoryAnalyticsResponse getCategoryAnalytics();


    List<MonthlyAnalyticsResponse> getMonthlyAnalytics();


    List<YearlyAnalyticsResponse> getYearlyAnalytics();

}