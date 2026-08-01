package com.commercehub.backend.admin.repository.impl;

import com.commercehub.backend.admin.dto.response.*;
import com.commercehub.backend.admin.repository.DashboardRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.commercehub.backend.inventory.entity.Inventory;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.payment.enums.PaymentStatus;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
@RequiredArgsConstructor
public class DashboardRepositoryImpl implements DashboardRepository {

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public DashboardResponse getDashboard() {

        Long totalCustomers = ((Number) entityManager.createQuery(
                "SELECT COUNT(u) FROM User u")
                .getSingleResult()).longValue();

        Long totalProducts = ((Number) entityManager.createQuery(
                "SELECT COUNT(p) FROM Product p")
                .getSingleResult()).longValue();

        Long totalOrders = ((Number) entityManager.createQuery(
                "SELECT COUNT(o) FROM Order o")
                .getSingleResult()).longValue();

        Long totalCategories = ((Number) entityManager.createQuery(
                "SELECT COUNT(c) FROM Category c")
                .getSingleResult()).longValue();

        BigDecimal revenue = (BigDecimal) entityManager.createQuery(
                        "SELECT COALESCE(SUM(o.totalAmount),0) FROM Order o")
                .getSingleResult();

        Long pendingOrders = ((Number) entityManager.createQuery(
                "SELECT COUNT(o) FROM Order o WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.PLACED")
                .getSingleResult()).longValue();

        Long completedOrders = ((Number) entityManager.createQuery(
                "SELECT COUNT(o) FROM Order o WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.DELIVERED")
                .getSingleResult()).longValue();

        Long cancelledOrders = ((Number) entityManager.createQuery(
                "SELECT COUNT(o) FROM Order o WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.CANCELLED")
                .getSingleResult()).longValue();

        Long lowStockProducts = ((Number) entityManager.createQuery(
                "SELECT COUNT(i) FROM Inventory i WHERE i.quantity <= i.reorderLevel")
                .getSingleResult()).longValue();

        return DashboardResponse.builder()
                .totalCustomers(totalCustomers)
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .totalCategories(totalCategories)
                .totalRevenue(revenue.doubleValue())
                .pendingOrders(pendingOrders)
                .completedOrders(completedOrders)
                .cancelledOrders(cancelledOrders)
                .lowStockProducts(lowStockProducts)
                .build();
    }

    @Override
    public SalesDashboardResponse getSalesDashboard() {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime weekStart = now.minusDays(7);
        LocalDateTime monthStart = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime yearStart = LocalDate.of(now.getYear(), 1, 1).atStartOfDay();

        BigDecimal todaySales = (BigDecimal) entityManager.createQuery("""
                SELECT COALESCE(SUM(o.totalAmount),0)
                FROM Order o
                WHERE o.paymentStatus = :status
                AND o.createdAt >= :todayStart
                """)
                .setParameter("status", PaymentStatus.SUCCESS)
                .setParameter("todayStart", todayStart)
                .getSingleResult();

        BigDecimal weeklySales = (BigDecimal) entityManager.createQuery("""
                SELECT COALESCE(SUM(o.totalAmount),0)
                FROM Order o
                WHERE o.paymentStatus = :status
                AND o.createdAt >= :weekStart
                """)
                .setParameter("status", PaymentStatus.SUCCESS)
                .setParameter("weekStart", weekStart)
                .getSingleResult();

        BigDecimal monthlySales = (BigDecimal) entityManager.createQuery("""
                SELECT COALESCE(SUM(o.totalAmount),0)
                FROM Order o
                WHERE o.paymentStatus = :status
                AND o.createdAt >= :monthStart
                """)
                .setParameter("status", PaymentStatus.SUCCESS)
                .setParameter("monthStart", monthStart)
                .getSingleResult();

        BigDecimal yearlySales = (BigDecimal) entityManager.createQuery("""
                SELECT COALESCE(SUM(o.totalAmount),0)
                FROM Order o
                WHERE o.paymentStatus = :status
                AND o.createdAt >= :yearStart
                """)
                .setParameter("status", PaymentStatus.SUCCESS)
                .setParameter("yearStart", yearStart)
                .getSingleResult();

        BigDecimal averageOrderValue = (BigDecimal) entityManager.createQuery("""
                SELECT COALESCE(AVG(o.totalAmount),0)
                FROM Order o
                WHERE o.paymentStatus = :status
                """)
                .setParameter("status", PaymentStatus.SUCCESS)
                .getSingleResult();

        Long totalPaidOrders = entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.paymentStatus = :status
                """, Long.class)
                .setParameter("status", PaymentStatus.SUCCESS)
                .getSingleResult();

        Long totalRefundedOrders = entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.paymentStatus = :status
                """, Long.class)
                .setParameter("status", PaymentStatus.REFUNDED)
                .getSingleResult();

        return SalesDashboardResponse.builder()
                .todaySales(todaySales)
                .weeklySales(weeklySales)
                .monthlySales(monthlySales)
                .yearlySales(yearlySales)
                .averageOrderValue(averageOrderValue)
                .totalPaidOrders(totalPaidOrders)
                .totalRefundedOrders(totalRefundedOrders)
                .build();
    }

    @Override
    public OrdersDashboardResponse getOrdersDashboard() {

        Long totalOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                """).getSingleResult()).longValue();

        Long placedOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.PLACED
                """).getSingleResult()).longValue();

        Long confirmedOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.CONFIRMED
                """).getSingleResult()).longValue();

        Long shippedOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.SHIPPED
                """).getSingleResult()).longValue();

        Long deliveredOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.DELIVERED
                """).getSingleResult()).longValue();

        Long cancelledOrders = ((Number) entityManager.createQuery("""
                SELECT COUNT(o)
                FROM Order o
                WHERE o.status = com.commercehub.backend.order.entity.OrderStatus.CANCELLED
                """).getSingleResult()).longValue();

        return OrdersDashboardResponse.builder()
                .totalOrders(totalOrders)
                .pendingOrders(placedOrders)
                .confirmedOrders(confirmedOrders)
                .processingOrders(0L)
                .shippedOrders(shippedOrders)
                .deliveredOrders(deliveredOrders)
                .cancelledOrders(cancelledOrders)
                .returnedOrders(0L)
                .build();
    }

    @Override
    public ProductsDashboardResponse getProductsDashboard() {

        Long totalProducts = ((Number) entityManager.createQuery("""
                SELECT COUNT(p)
                FROM Product p
                """).getSingleResult()).longValue();

        Long totalCategories = ((Number) entityManager.createQuery("""
                SELECT COUNT(c)
                FROM Category c
                """).getSingleResult()).longValue();

        Long inStockProducts = ((Number) entityManager.createQuery("""
                SELECT COUNT(i)
                FROM Inventory i
                WHERE i.quantity > 0
                """).getSingleResult()).longValue();

        Long outOfStockProducts = ((Number) entityManager.createQuery("""
                SELECT COUNT(i)
                FROM Inventory i
                WHERE i.quantity = 0
                """).getSingleResult()).longValue();

        Long lowStockProducts = ((Number) entityManager.createQuery("""
                SELECT COUNT(i)
                FROM Inventory i
                WHERE i.quantity <= i.reorderLevel
                """).getSingleResult()).longValue();

        /*
        * Your Product entity currently doesn't have an active/inactive flag.
        * Until one is added, treat all products as active.
        */
        Long activeProducts = totalProducts;
        Long inactiveProducts = 0L;

        return ProductsDashboardResponse.builder()
                .totalProducts(totalProducts)
                .activeProducts(activeProducts)
                .inactiveProducts(inactiveProducts)
                .inStockProducts(inStockProducts)
                .outOfStockProducts(outOfStockProducts)
                .lowStockProducts(lowStockProducts)
                .totalCategories(totalCategories)
                .build();
    }

    @Override
    public CustomersDashboardResponse getCustomersDashboard() {

        Long totalCustomers = ((Number) entityManager.createQuery("""
                SELECT COUNT(u)
                FROM User u
                """).getSingleResult()).longValue();

        Long activeCustomers = ((Number) entityManager.createQuery("""
                SELECT COUNT(u)
                FROM User u
                WHERE u.enabled = true
                """).getSingleResult()).longValue();

        Long inactiveCustomers = ((Number) entityManager.createQuery("""
                SELECT COUNT(u)
                FROM User u
                WHERE u.enabled = false
                """).getSingleResult()).longValue();

        /*
        * Your User entity currently has only the 'enabled' field.
        * Email verification is represented by enabled=true.
        */
        Long verifiedCustomers = activeCustomers;

        /*
        * Your User entity does not contain a createdAt field,
        * so these analytics cannot be calculated yet.
        */
        Long newCustomersToday = 0L;
        Long newCustomersThisWeek = 0L;
        Long newCustomersThisMonth = 0L;

        return CustomersDashboardResponse.builder()
                .totalCustomers(totalCustomers)
                .activeCustomers(activeCustomers)
                .inactiveCustomers(inactiveCustomers)
                .verifiedCustomers(verifiedCustomers)
                .newCustomersToday(newCustomersToday)
                .newCustomersThisWeek(newCustomersThisWeek)
                .newCustomersThisMonth(newCustomersThisMonth)
                .build();
    }

    @Override
public RevenueDashboardResponse getRevenueDashboard() {

    LocalDateTime now = LocalDateTime.now();

    LocalDateTime todayStart = LocalDate.now().atStartOfDay();
    LocalDateTime weekStart = now.minusDays(7);
    LocalDateTime monthStart = LocalDate.now().withDayOfMonth(1).atStartOfDay();
    LocalDateTime yearStart = LocalDate.of(now.getYear(), 1, 1).atStartOfDay();

    BigDecimal totalRevenue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(SUM(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .getSingleResult();

    BigDecimal todayRevenue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(SUM(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            AND o.createdAt >= :todayStart
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .setParameter("todayStart", todayStart)
            .getSingleResult();

    BigDecimal weeklyRevenue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(SUM(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            AND o.createdAt >= :weekStart
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .setParameter("weekStart", weekStart)
            .getSingleResult();

    BigDecimal monthlyRevenue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(SUM(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            AND o.createdAt >= :monthStart
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .setParameter("monthStart", monthStart)
            .getSingleResult();

    BigDecimal yearlyRevenue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(SUM(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            AND o.createdAt >= :yearStart
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .setParameter("yearStart", yearStart)
            .getSingleResult();

    BigDecimal averageOrderValue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(AVG(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .getSingleResult();

    BigDecimal highestOrderValue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(MAX(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .getSingleResult();

    BigDecimal lowestOrderValue = (BigDecimal) entityManager.createQuery("""
            SELECT COALESCE(MIN(o.totalAmount),0)
            FROM Order o
            WHERE o.paymentStatus = :status
            """)
            .setParameter("status", PaymentStatus.SUCCESS)
            .getSingleResult();

    return RevenueDashboardResponse.builder()
            .totalRevenue(totalRevenue)
            .todayRevenue(todayRevenue)
            .weeklyRevenue(weeklyRevenue)
            .monthlyRevenue(monthlyRevenue)
            .yearlyRevenue(yearlyRevenue)
            .averageOrderValue(averageOrderValue)
            .highestOrderValue(highestOrderValue)
            .lowestOrderValue(lowestOrderValue)
            .build();
}

    @Override
    public List<TopProductResponse> getTopProducts(int limit) {

        return entityManager.createQuery("""
                SELECT new com.commercehub.backend.admin.dto.response.TopProductResponse(
                        p.id,
                        p.name,
                        p.sku,
                        p.imageUrl,
                        COALESCE(SUM(oi.quantity),0),
                        COALESCE(SUM(oi.total),0),
                        0.0,
                        0L,
                        COALESCE(i.quantity,0)
                )
                FROM Product p
                LEFT JOIN Inventory i
                    ON i.product = p
                LEFT JOIN OrderItem oi
                    ON oi.productId = p.id
                GROUP BY
                    p.id,
                    p.name,
                    p.sku,
                    p.imageUrl,
                    i.quantity
                ORDER BY
                    SUM(oi.quantity) DESC
                """, TopProductResponse.class)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public List<LowStockProductResponse> getLowStockProducts() {

        List<Inventory> inventories = entityManager.createQuery("""
                SELECT i
                FROM Inventory i
                JOIN FETCH i.product p
                JOIN FETCH p.category
                WHERE i.quantity <= i.reorderLevel
                ORDER BY i.quantity ASC
                """, Inventory.class)
                .getResultList();

        return inventories.stream()
                .map(i -> LowStockProductResponse.builder()
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getName())
                        .sku(i.getProduct().getSku())
                        .categoryName(i.getProduct().getCategory().getName())
                        .currentStock(i.getQuantity())
                        .minimumStock(i.getReorderLevel())
                        .active(true)
                        .build())
                .toList();
    }

    @Override
    public List<RecentOrderResponse> getRecentOrders(int limit) {

        List<Order> orders = entityManager.createQuery("""
                SELECT o
                FROM Order o
                ORDER BY o.createdAt DESC
                """, Order.class)
                .setMaxResults(limit)
                .getResultList();

        return orders.stream()
                .map(order -> {

                    User user = entityManager.find(User.class, order.getUserId());

                    String customerName = user == null
                            ? "Unknown"
                            : user.getFirstName() + " " + user.getLastName();

                    return RecentOrderResponse.builder()
                            .orderId(order.getId())
                            .orderNumber(order.getOrderNumber())
                            .customerId(order.getUserId())
                            .customerName(customerName)
                            .orderAmount(order.getTotalAmount())
                            .orderStatus(order.getStatus().name())
                            .paymentStatus(order.getPaymentStatus().name())
                            .orderDate(order.getCreatedAt())
                            .build();
                })
                .toList();
    }
}