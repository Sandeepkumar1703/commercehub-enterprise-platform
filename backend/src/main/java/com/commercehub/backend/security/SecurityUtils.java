package com.commercehub.backend.security;

import com.commercehub.backend.common.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public final class SecurityUtils {


    private SecurityUtils() {
    }


    public static String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (authentication == null
                || !authentication.isAuthenticated()) {

            throw new UnauthorizedException(
                    "User is not authenticated."
            );
        }


        return authentication.getName();
    }
}