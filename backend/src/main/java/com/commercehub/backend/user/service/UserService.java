package com.commercehub.backend.user.service;


import com.commercehub.backend.user.dto.response.UserProfileResponse;
import com.commercehub.backend.user.dto.request.UserUpdateRequest;


public interface UserService {


    UserProfileResponse getCurrentUserProfile();


    UserProfileResponse updateProfile(
            UserUpdateRequest request
    );


}