package com.commercehub.backend.security;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory JWT blacklist.
 *
 * NOTE:
 * This implementation is suitable for development.
 * In production, use Redis with TTL.
 */
@Component
public class TokenBlacklist {

    /**
     * Thread-safe set of blacklisted tokens.
     */
    private final Set<String> blacklistedTokens =
            ConcurrentHashMap.newKeySet();

    /**
     * Add token to blacklist.
     *
     * @param token JWT token
     */
    public void blacklistToken(String token) {

        blacklistedTokens.add(token);

    }

    /**
     * Check whether token is blacklisted.
     *
     * @param token JWT token
     * @return true if blacklisted
     */
    public boolean isBlacklisted(String token) {

        return blacklistedTokens.contains(token);

    }

}