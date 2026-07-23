package com.commercehub.backend.user.service.impl;

import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.user.dto.response.UserProfileResponse;
import com.commercehub.backend.user.dto.request.UserUpdateRequest;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import com.commercehub.backend.user.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserProfileResponse getCurrentUserProfile() {

        User user = getAuthenticatedUser();

        return mapToProfileResponse(user);
    }

    @Override
    public UserProfileResponse updateProfile(
            UserUpdateRequest request
    ) {

        User user = getAuthenticatedUser();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User updatedUser = userRepository.save(user);

        return mapToProfileResponse(updatedUser);
    }

    /**
     * Returns the currently authenticated user.
     */
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found"
                        )
                );
    }

    /**
     * Converts User entity to UserProfileResponse DTO.
     */
    private UserProfileResponse mapToProfileResponse(
            User user
    ) {

        return UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

}