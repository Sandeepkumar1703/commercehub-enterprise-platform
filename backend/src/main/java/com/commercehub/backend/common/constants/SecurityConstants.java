package com.commercehub.backend.common.constants;

/**
 * Security-related constants.
 */
public final class SecurityConstants {

    private SecurityConstants() {
        throw new IllegalStateException("Utility class");
    }

    // ======================================================
    // JWT
    // ======================================================

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String AUTHORIZATION_HEADER = "Authorization";

    public static final String TOKEN_TYPE = "Bearer";

    // ======================================================
    // Roles
    // ======================================================

    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String ROLE_CUSTOMER = "ROLE_CUSTOMER";

    public static final String ROLE_MANAGER = "ROLE_MANAGER";

    // ======================================================
    // Public Endpoints
    // ======================================================

    public static final String[] PUBLIC_URLS = {

            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",

            "/actuator/health",

            "/api/v1/auth/**"

    };

}