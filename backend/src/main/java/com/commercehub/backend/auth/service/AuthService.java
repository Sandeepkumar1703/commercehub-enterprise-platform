package com.commercehub.backend.auth.service;

import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;

/**
 * Service interface for authentication operations.
 *
 * This interface defines all authentication-related business operations.
 * The actual implementation is provided in AuthServiceImpl.
 */
public interface AuthService {

    /**
     * Register a new user.
     *
     * @param request registration request
     * @return authentication response containing generated tokens
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Authenticate an existing user.
     *
     * @param request login request
     * @return authentication response containing generated tokens
     */
    AuthResponse login(LoginRequest request);

    /**
     * Change password for the authenticated user.
     *
     * @param request change password request
     */
    void changePassword(ChangePasswordRequest request);

    /**
     * Logout the current user.
     *
     * The implementation should invalidate (blacklist) the supplied JWT
     * so it cannot be used again.
     *
     * @param token JWT access token
     */
    void logout(String token);

}