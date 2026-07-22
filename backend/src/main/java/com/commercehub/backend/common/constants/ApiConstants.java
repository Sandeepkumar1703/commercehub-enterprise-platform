package com.commercehub.backend.common.constants;

/**
 * API endpoint constants.
 */
public final class ApiConstants {

    private ApiConstants() {
        throw new IllegalStateException("Utility class");
    }

    public static final String API_VERSION = "/api/v1";

    // Authentication
    public static final String AUTH = API_VERSION + "/auth";

    // Users
    public static final String USERS = API_VERSION + "/users";

    // Products
    public static final String PRODUCTS = API_VERSION + "/products";

    // Categories
    public static final String CATEGORIES = API_VERSION + "/categories";

    // Inventory
    public static final String INVENTORY = API_VERSION + "/inventory";

    // Orders
    public static final String ORDERS = API_VERSION + "/orders";

    // Payments
    public static final String PAYMENTS = API_VERSION + "/payments";

    // Coupons
    public static final String COUPONS = API_VERSION + "/coupons";

    // Shipping
    public static final String SHIPPING = API_VERSION + "/shipping";

    // Wishlist
    public static final String WISHLIST = API_VERSION + "/wishlist";

    // Reviews
    public static final String REVIEWS = API_VERSION + "/reviews";

    // Notifications
    public static final String NOTIFICATIONS = API_VERSION + "/notifications";

}