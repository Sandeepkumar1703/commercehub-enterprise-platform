package com.commercehub.backend.analytics.controller;


import com.commercehub.backend.analytics.dto.response.*;
import com.commercehub.backend.analytics.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ANALYTICS_VIEW')")
public class AnalyticsController {


    private final AnalyticsService analyticsService;



    @GetMapping("/sales")
    public SalesAnalyticsResponse getSalesAnalytics() {

        return analyticsService.getSalesAnalytics();

    }




    @GetMapping("/revenue")
    public RevenueAnalyticsResponse getRevenueAnalytics() {

        return analyticsService.getRevenueAnalytics();

    }




    @GetMapping("/orders")
    public OrderAnalyticsResponse getOrderAnalytics() {

        return analyticsService.getOrderAnalytics();

    }




    @GetMapping("/customers")
    public CustomerAnalyticsResponse getCustomerAnalytics() {

        return analyticsService.getCustomerAnalytics();

    }




    @GetMapping("/products")
    public ProductAnalyticsResponse getProductAnalytics() {

        return analyticsService.getProductAnalytics();

    }




    @GetMapping("/categories")
    public CategoryAnalyticsResponse getCategoryAnalytics() {

        return analyticsService.getCategoryAnalytics();

    }




    @GetMapping("/monthly")
    public List<MonthlyAnalyticsResponse> getMonthlyAnalytics() {

        return analyticsService.getMonthlyAnalytics();

    }




    @GetMapping("/yearly")
    public List<YearlyAnalyticsResponse> getYearlyAnalytics() {

        return analyticsService.getYearlyAnalytics();

    }

}