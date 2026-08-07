package com.commercehub.backend.auth.service;


import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;

import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.dto.response.RegisterResponse;

import com.commercehub.backend.user.dto.request.ForgotPasswordRequest;
import com.commercehub.backend.user.dto.request.ResetPasswordRequest;

import com.commercehub.backend.auth.dto.request.RefreshTokenRequest;
import com.commercehub.backend.auth.dto.response.RefreshTokenResponse;


public interface AuthService {


    RegisterResponse register(
            RegisterRequest request
    );


    AuthResponse login(
            LoginRequest request
    );


    void changePassword(
            ChangePasswordRequest request
    );


    void logout(
            String token
    );


    void forgotPassword(
            ForgotPasswordRequest request
    );


    void resetPassword(
            ResetPasswordRequest request
    );

    RefreshTokenResponse refreshToken(
        RefreshTokenRequest request
    );

}