package com.commercehub.backend.security;


import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class CustomUserDetailsService 
        implements UserDetailsService {


    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email){


        User user =
                userRepository.findByEmail(email)
                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );


        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(
                    user.getRoles()
                    .stream()
                    .map(role -> role.getName()
                    .replace("ROLE_",""))
                    .toArray(String[]::new)
                )
                .build();

    }

}