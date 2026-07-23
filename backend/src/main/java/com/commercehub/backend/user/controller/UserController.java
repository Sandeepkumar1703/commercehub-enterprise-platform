package com.commercehub.backend.user.controller;


import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.user.dto.response.UserProfileResponse;
import com.commercehub.backend.user.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.commercehub.backend.user.dto.request.UserUpdateRequest;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;



    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(){


        UserProfileResponse profile =
        userService.getCurrentUserProfile();



        return ResponseEntity.ok(

                ApiResponse.<UserProfileResponse>builder()

                        .success(true)

                        .message("Profile fetched successfully")

                        .data(profile)

                        .build()

        );

    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @Valid @RequestBody UserUpdateRequest request
    ) {


        UserProfileResponse profile =
                userService.updateProfile(request);



        return ResponseEntity.ok(

                ApiResponse.<UserProfileResponse>builder()

                        .success(true)

                        .message("Profile updated successfully")

                        .data(profile)

                        .build()

        );

    }


}