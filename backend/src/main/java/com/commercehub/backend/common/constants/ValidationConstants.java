package com.commercehub.backend.common.constants;

/**
 * Validation messages and limits.
 */
public final class ValidationConstants {

    private ValidationConstants() {
        throw new IllegalStateException("Utility class");
    }

    // =====================================================
    // User
    // =====================================================

    public static final int NAME_MIN = 2;
    public static final int NAME_MAX = 100;

    public static final int PASSWORD_MIN = 8;
    public static final int PASSWORD_MAX = 100;

    // =====================================================
    // Product
    // =====================================================

    public static final int PRODUCT_NAME_MAX = 200;

    public static final int PRODUCT_DESCRIPTION_MAX = 2000;

    // =====================================================
    // Category
    // =====================================================

    public static final int CATEGORY_NAME_MAX = 100;

    // =====================================================
    // Review
    // =====================================================

    public static final int REVIEW_MAX_LENGTH = 1000;

}