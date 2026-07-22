package com.commercehub.backend.common.util;

import io.jsonwebtoken.Claims;

public final class JwtUtils {

    private JwtUtils() {
    }

    public static String getUsername(Claims claims) {
        return claims.getSubject();
    }

    public static String getRole(Claims claims) {
        return claims.get("role", String.class);
    }

    public static Long getUserId(Claims claims) {

        Object id = claims.get("userId");

        if (id == null) {
            return null;
        }

        return Long.parseLong(id.toString());
    }
}