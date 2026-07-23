package com.commercehub.backend.user.service;


import com.commercehub.backend.user.dto.request.UserUpdateRequest;
import com.commercehub.backend.user.dto.response.UserProfileResponse;



public interface UserService {



    UserProfileResponse getCurrentUserProfile();



    UserProfileResponse updateProfile(
            UserUpdateRequest request
    );

}