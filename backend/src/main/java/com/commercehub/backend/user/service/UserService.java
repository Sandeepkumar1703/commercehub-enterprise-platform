package com.commercehub.backend.user.service;


import com.commercehub.backend.user.dto.UserProfileResponse;
import com.commercehub.backend.user.dto.UserUpdateRequest;


public interface UserService {


    UserProfileResponse getCurrentUserProfile();


    UserProfileResponse updateProfile(
            UserUpdateRequest request
    );


}