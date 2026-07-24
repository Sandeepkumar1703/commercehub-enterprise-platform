package com.commercehub.backend.auth.controller;


import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.service.AuthService;


import jakarta.validation.Valid;


import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import com.commercehub.backend.common.response.ApiResponse;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;



    /**
     * Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ){

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        authService.register(request)
                );
    }





    /**
     * Login existing user
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ){

        return ResponseEntity.ok(
                authService.login(request)
        );
    }





    /**
     * Change password of authenticated user
     *
     * Requires JWT authentication
     */
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid
            @RequestBody ChangePasswordRequest request
    ){

        authService.changePassword(request);


        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }

        @PostMapping("/logout")
        public ResponseEntity<ApiResponse<String>> logout(
                HttpServletRequest request
        ) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

                return ResponseEntity.badRequest()
                        .body(
                                ApiResponse.failure("Authorization token missing")
                        );

        }

        String token = authHeader.substring(7);

        authService.logout(token);

        return ResponseEntity.ok(
                ApiResponse.success("Logged out successfully")
        );

        }

}