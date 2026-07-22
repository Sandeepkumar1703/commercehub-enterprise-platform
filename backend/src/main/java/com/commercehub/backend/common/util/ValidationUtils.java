package com.commercehub.backend.common.util;

public final class ValidationUtils {

    private ValidationUtils() {
    }

    public static boolean isNullOrBlank(String value) {
        return value == null || value.isBlank();
    }

    public static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}