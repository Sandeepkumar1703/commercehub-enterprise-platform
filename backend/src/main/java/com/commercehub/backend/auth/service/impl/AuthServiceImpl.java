package com.commercehub.backend.auth.service.impl;



import com.commercehub.backend.auth.dto.request.ChangePasswordRequest;
import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.auth.service.AuthService;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.security.JwtTokenProvider;

import com.commercehub.backend.user.entity.Role;
import com.commercehub.backend.user.entity.User;

import com.commercehub.backend.user.repository.UserRepository;
import com.commercehub.backend.role.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {



    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;





    @Override
    public AuthResponse register(
            RegisterRequest request
    ){

        if(userRepository.existsByEmail(request.getEmail())){

            throw new RuntimeException(
                    "Email already registered"
            );
        }



        Role userRole =
                roleRepository.findByName("ROLE_USER")
                .orElseThrow(
                        () -> new RuntimeException(
                                "ROLE_USER not found"
                        )
                );



        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .build();



        user.getRoles()
                .add(userRole);



        userRepository.save(user);




        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null
                );



        return generateTokenResponse(authentication);

    }






    @Override
    public AuthResponse login(
            LoginRequest request
    ){


        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );



        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        null
                );


        return generateTokenResponse(authentication);

    }







    @Override
    public void changePassword(
            ChangePasswordRequest request
    ){


        User user =
                getAuthenticatedUser();




        // Check old password

        if(!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        )){

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }





        // Prevent same password

        if(request.getCurrentPassword()
                .equals(request.getNewPassword())){


            throw new RuntimeException(
                    "New password cannot be same as old password"
            );

        }





        // Confirm new password

        if(!request.getNewPassword()
                .equals(request.getConfirmPassword())){


            throw new RuntimeException(
                    "Password confirmation does not match"
            );

        }




        // Encrypt and save password

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );


        userRepository.save(user);

    }







    private User getAuthenticatedUser(){


        Authentication authentication =
                SecurityContextHolder
                .getContext()
                .getAuthentication();



        String email =
                authentication.getName();



        return userRepository.findByEmail(email)

                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found"
                        )
                );

    }






    private AuthResponse generateTokenResponse(
            Authentication authentication
    ){

        return AuthResponse.builder()

                .accessToken(
                        jwtTokenProvider
                        .generateAccessToken(authentication)
                )

                .refreshToken(
                        jwtTokenProvider
                        .generateRefreshToken(authentication)
                )

                .tokenType("Bearer")

                .expiresIn(900000)

                .build();

    }


}