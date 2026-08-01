package com.commercehub.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * JWT Authentication Entry Point.
 *
 * <p>
 * Invoked by Spring Security whenever an unauthenticated client attempts
 * to access a protected REST API.
 * </p>
 *
 * Responsibilities:
 * <ul>
 *     <li>Return HTTP 401 (Unauthorized).</li>
 *     <li>Return a consistent JSON error response.</li>
 *     <li>Prevent Spring Security from returning HTML error pages.</li>
 * </ul>
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Shared Jackson ObjectMapper managed by Spring.
     */
    private final ObjectMapper objectMapper;

    /**
     * Handles unauthorized requests.
     *
     * @param request        Incoming HTTP request
     * @param response       HTTP response
     * @param authException  Authentication failure
     */
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Map<String, Object> body = new LinkedHashMap<>();

        body.put("success", false);
        body.put("status", HttpStatus.UNAUTHORIZED.value());
        body.put("error", HttpStatus.UNAUTHORIZED.getReasonPhrase());
        body.put("message", "Authentication is required to access this resource.");
        body.put("path", request.getRequestURI());
        body.put("timestamp", Instant.now());

        objectMapper.writeValue(response.getOutputStream(), body);
    }
}