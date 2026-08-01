package com.commercehub.backend.analytics.service.impl;


import com.commercehub.backend.analytics.dto.response.*;
import com.commercehub.backend.analytics.repository.AnalyticsRepository;
import com.commercehub.backend.analytics.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {


    private final AnalyticsRepository analyticsRepository;



    @Override
    public SalesAnalyticsResponse getSalesAnalytics() {


        return SalesAnalyticsResponse.builder()
                .totalOrders(
                        analyticsRepository.getTotalOrders()
                )
                .totalItemsSold(
                        analyticsRepository.getTotalItemsSold()
                )
                .totalSales(
                        analyticsRepository.getTotalSales()
                )
                .build();

    }



    @Override
    public RevenueAnalyticsResponse getRevenueAnalytics() {


        return RevenueAnalyticsResponse.builder()
                .totalRevenue(
                        analyticsRepository.getTotalRevenue()
                )
                .averageOrderValue(
                        analyticsRepository.getAverageOrderValue()
                )
                .build();

    }




    @Override
    public OrderAnalyticsResponse getOrderAnalytics() {


        return OrderAnalyticsResponse.builder()

                .totalOrders(
                        analyticsRepository.getTotalOrders()
                )

                .pendingOrders(
                        analyticsRepository.getPlacedOrders()
                )

                .completedOrders(
                        analyticsRepository.getCompletedOrders()
                )

                .cancelledOrders(
                        analyticsRepository.getCancelledOrders()
                )

                .build();

    }





    @Override
    public CustomerAnalyticsResponse getCustomerAnalytics() {


        return CustomerAnalyticsResponse.builder()

                .totalCustomers(
                        analyticsRepository.getTotalCustomers()
                )

                .newCustomers(
                        analyticsRepository.getNewCustomers()
                )

                .build();

    }





    @Override
    public ProductAnalyticsResponse getProductAnalytics() {


        return ProductAnalyticsResponse.builder()

                .totalProducts(
                        analyticsRepository.getTotalProducts()
                )

                .activeProducts(
                        analyticsRepository.getActiveProducts()
                )

                .outOfStockProducts(
                        analyticsRepository.getOutOfStockProducts()
                )

                .build();

    }





    @Override
    public CategoryAnalyticsResponse getCategoryAnalytics() {


        return CategoryAnalyticsResponse.builder()

                .totalCategories(
                        analyticsRepository.getTotalCategories()
                )

                .build();

    }




    @Override
public List<MonthlyAnalyticsResponse> getMonthlyAnalytics() {


    return analyticsRepository.getMonthlyAnalytics()
            .stream()
            .map(row -> MonthlyAnalyticsResponse.builder()

                    .month(
                            row[0].toString().trim()
                    )

                    .revenue(
                            (BigDecimal) row[1]
                    )

                    .orders(
                            ((Number) row[2]).longValue()
                    )

                    .build()

            )
            .toList();

}





    @Override
public List<YearlyAnalyticsResponse> getYearlyAnalytics() {


    return analyticsRepository.getYearlyAnalytics()
            .stream()
            .map(row -> YearlyAnalyticsResponse.builder()

                    .year(
                            ((Number) row[0]).intValue()
                    )

                    .revenue(
                            (BigDecimal) row[1]
                    )

                    .orders(
                            ((Number) row[2]).longValue()
                    )

                    .build()

            )
            .toList();

}


}