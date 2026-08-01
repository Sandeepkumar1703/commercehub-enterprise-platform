package com.commercehub.backend.analytics.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;


import java.math.BigDecimal;
import java.util.List;


@Repository
public class AnalyticsRepository {


    @PersistenceContext
    private EntityManager entityManager;



    public BigDecimal getTotalSales(){

        return entityManager.createNativeQuery("""
            SELECT COALESCE(SUM(o.total_amount),0)
            FROM orders o
            WHERE o.status <> 'CANCELLED'
        """)
        .getSingleResult()
        instanceof BigDecimal value ? value : BigDecimal.ZERO;

    }




    public Long getTotalOrders(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM orders
        """).getSingleResult();

        return result.longValue();

    }




    public Long getTotalItemsSold(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COALESCE(SUM(quantity),0)
            FROM order_items
        """).getSingleResult();

        return result.longValue();

    }




    public BigDecimal getTotalRevenue(){

        return (BigDecimal)
        entityManager.createNativeQuery("""
            SELECT COALESCE(SUM(amount),0)
            FROM payments
            WHERE status='SUCCESS'
        """)
        .getSingleResult();

    }





    public BigDecimal getAverageOrderValue(){

        return (BigDecimal)
        entityManager.createNativeQuery("""
            SELECT COALESCE(AVG(total_amount),0)
            FROM orders
            WHERE status <> 'CANCELLED'
        """)
        .getSingleResult();

    }




    public Long getPlacedOrders(){

        return countByStatus("PLACED");

    }


    public Long getCompletedOrders(){

        return countByStatus("DELIVERED");

    }


    public Long getCancelledOrders(){

        return countByStatus("CANCELLED");

    }



    private Long countByStatus(String status){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM orders
            WHERE status=:status
        """)
        .setParameter("status",status)
        .getSingleResult();

        return result.longValue();

    }




    public Long getTotalCustomers(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM users
        """)
        .getSingleResult();

        return result.longValue();

    }





    public Long getNewCustomers(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM users
            WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
        """)
        .getSingleResult();

        return result.longValue();

    }





    public Long getTotalProducts(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM products
        """)
        .getSingleResult();

        return result.longValue();

    }




    public Long getActiveProducts(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM products
            WHERE is_active=true
        """)
        .getSingleResult();

        return result.longValue();

    }





    public Long getOutOfStockProducts(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM products
            WHERE stock_quantity=0
        """)
        .getSingleResult();

        return result.longValue();

    }

    public Long getTotalCategories(){

        Number result =
        (Number) entityManager.createNativeQuery("""
            SELECT COUNT(*)
            FROM categories
        """)
        .getSingleResult();

        return result.longValue();

    }
    /*
    * MONTHLY GRAPH DATA
    */
    public List<Object[]> getMonthlyAnalytics() {


        return entityManager.createNativeQuery("""
                SELECT
                    TO_CHAR(o.created_at,'Month') AS month,
                    COALESCE(SUM(o.total_amount),0) AS revenue,
                    COUNT(o.id) AS orders
                FROM orders o
                WHERE o.status <> 'CANCELLED'
                GROUP BY 
                    TO_CHAR(o.created_at,'Month'),
                    EXTRACT(MONTH FROM o.created_at)
                ORDER BY EXTRACT(MONTH FROM o.created_at)
                """)
                .getResultList();

    }



    /*
    * YEARLY GRAPH DATA
    */
    public List<Object[]> getYearlyAnalytics() {


        return entityManager.createNativeQuery("""
                SELECT
                    EXTRACT(YEAR FROM o.created_at) AS year,
                    COALESCE(SUM(o.total_amount),0) AS revenue,
                    COUNT(o.id) AS orders
                FROM orders o
                WHERE o.status <> 'CANCELLED'
                GROUP BY EXTRACT(YEAR FROM o.created_at)
                ORDER BY year
                """)
                .getResultList();

    }
}