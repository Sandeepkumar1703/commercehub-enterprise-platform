package com.commercehub.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {


    private final JwtService jwtService;


    /**
     * Generate Access Token
     */
    public String generateAccessToken(
            Authentication authentication
    ){

        String username =
                authentication.getName();


        return jwtService.generateAccessToken(
                username,
                null
        );
    }



    /**
     * Generate Refresh Token
     */
    public String generateRefreshToken(
            Authentication authentication
    ){

        String username =
                authentication.getName();


        return jwtService.generateRefreshToken(
                username
        );
    }



    /**
     * Validate JWT Token
     */
    public boolean validateToken(
            String token
    ){

        try {

            String username =
                    jwtService.extractUsername(token);


            return jwtService.validateToken(
                    token,
                    username
            );


        } catch(Exception exception){

            return false;
        }

    }



    /**
     * Extract Username From Token
     */
    public String getUsername(
            String token
    ){

        return jwtService.extractUsername(token);

    }

}
