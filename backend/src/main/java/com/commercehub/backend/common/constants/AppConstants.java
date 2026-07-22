package com.commercehub.backend.common.constants;

/**
 * Application-wide constants.
 */
public final class AppConstants {

    private AppConstants() {
        throw new IllegalStateException("Utility class");
    }

    // ==========================================================
    // General Messages
    // ==========================================================

    public static final String SUCCESS = "Success";
    public static final String FAILED = "Failed";

    public static final String CREATED = "Resource created successfully";
    public static final String UPDATED = "Resource updated successfully";
    public static final String DELETED = "Resource deleted successfully";

    // ==========================================================
    // Pagination
    // ==========================================================

    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_PAGE_SIZE = 20;

    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "asc";

    // ==========================================================
    // Date Formats
    // ==========================================================

    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    // ==========================================================
    // Currency
    // ==========================================================

    public static final String DEFAULT_CURRENCY = "INR";

    // ==========================================================
    // File Upload
    // ==========================================================

    public static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    // ==========================================================
    // Cache
    // ==========================================================

    public static final String PRODUCT_CACHE = "products";
    public static final String CATEGORY_CACHE = "categories";

}