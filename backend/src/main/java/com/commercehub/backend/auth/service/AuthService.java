package com.commercehub.backend.auth.service;


import com.commercehub.backend.auth.dto.request.LoginRequest;
import com.commercehub.backend.auth.dto.request.RegisterRequest;
import com.commercehub.backend.auth.dto.response.AuthResponse;
import com.commercehub.backend.security.JwtTokenProvider;

import com.commercehub.backend.user.entity.Role;
import com.commercehub.backend.user.entity.User;

import com.commercehub.backend.user.repository.RoleRepository;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;



    public AuthResponse register(RegisterRequest request){


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


        user.getRoles().add(userRole);


        userRepository.save(user);



        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null
                );



        return AuthResponse.builder()
                .accessToken(
                        jwtTokenProvider.generateAccessToken(authentication)
                )
                .refreshToken(
                        jwtTokenProvider.generateRefreshToken(authentication)
                )
                .tokenType("Bearer")
                .expiresIn(900000)
                .build();

    }




    public AuthResponse login(LoginRequest request){


        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )

        );


        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        null
                );



        return AuthResponse.builder()
                .accessToken(
                        jwtTokenProvider.generateAccessToken(authentication)
                )
                .refreshToken(
                        jwtTokenProvider.generateRefreshToken(authentication)
                )
                .tokenType("Bearer")
                .expiresIn(900000)
                .build();

    }

}