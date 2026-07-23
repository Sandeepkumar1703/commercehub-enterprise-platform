package com.commercehub.backend.auth.service;


import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;



public interface AuthService {



    /**
     * Register user
     */
    AuthResponse register(
            RegisterRequest request
    );




    /**
     * Login user
     */
    AuthResponse login(
            LoginRequest request
    );




    /**
     * Change password
     */
    void changePassword(
            ChangePasswordRequest request
    );


}