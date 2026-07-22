package com.commercehub.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;


    /**
     * Generate Access Token
     */
    public String generateAccessToken(
            String username,
            Map<String, Object> claims
    ) {

        return createToken(
                claims,
                username,
                accessTokenExpiration
        );
    }


    /**
     * Generate Refresh Token
     */
    public String generateRefreshToken(
            String username
    ) {

        return createToken(
                Map.of("type", "refresh"),
                username,
                refreshTokenExpiration
        );
    }


    /**
     * Common JWT Builder
     */
    private String createToken(
            Map<String, Object> claims,
            String subject,
            long expiration
    ) {

        Date now = new Date();

        Date expiryDate =
                new Date(now.getTime() + expiration);


        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(
                        getSigningKey(),
                        Jwts.SIG.HS512
                )
                .compact();
    }



    /**
     * Extract Username
     */
    public String extractUsername(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }



    /**
     * Extract Expiration
     */
    public Date extractExpiration(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }



    /**
     * Extract Any Claim
     */
    public <T> T extractClaim(
            String token,
            Function<Claims,T> resolver
    ){

        Claims claims =
                extractAllClaims(token);

        return resolver.apply(claims);
    }



    /**
     * Extract All Claims
     */
    private Claims extractAllClaims(
            String token
    ){

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }



    /**
     * Validate Token
     */
    public boolean validateToken(
            String token,
            String username
    ){

        String extractedUsername =
                extractUsername(token);

        return extractedUsername.equals(username)
                && !isTokenExpired(token);
    }



    /**
     * Check Expiration
     */
    public boolean isTokenExpired(
            String token
    ){

        return extractExpiration(token)
                .before(new Date());

    }



    /**
     * HS512 Signing Key
     */
    private SecretKey getSigningKey(){

        return Keys.hmacShaKeyFor(
                secretKey.getBytes()
        );

    }

}
