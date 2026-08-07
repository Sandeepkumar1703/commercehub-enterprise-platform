package com.commercehub.backend.security;

import com.commercehub.backend.role.entity.Role;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * ============================================================
 * Custom UserDetailsService
 * ============================================================
 *
 * Loads authenticated users from the database and converts
 * their Roles and Permissions into Spring Security authorities.
 *
 * Example:
 *
 * User
 * ├── ROLE_ADMIN
 * │      ├── USER_CREATE
 * │      ├── USER_UPDATE
 * │      ├── USER_DELETE
 * │      ├── ROLE_MANAGE
 * │      └── ANALYTICS_VIEW
 * │
 * └── ROLE_VENDOR
 *        └── PRODUCT_CREATE
 *
 * Authorities generated:
 *
 * ROLE_ADMIN
 * ROLE_VENDOR
 * USER_CREATE
 * USER_UPDATE
 * USER_DELETE
 * ROLE_MANAGE
 * ANALYTICS_VIEW
 * PRODUCT_CREATE
 *
 * These authorities are later used by:
 *
 * @PreAuthorize("hasRole('ADMIN')")
 * @PreAuthorize("hasAuthority('ROLE_MANAGE')")
 * @PreAuthorize("hasAuthority('USER_CREATE')")
 *
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    /**
     * User Repository
     */
    private final UserRepository userRepository;

    /**
     * Loads the authenticated user by email.
     *
     * Spring Security automatically invokes this method during
     * authentication.
     *
     * @param email User email
     * @return Spring Security UserDetails
     */
    @Override
    public UserDetails loadUserByUsername(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + email
                        )
                );

        /*
         * Store every Role and Permission as a GrantedAuthority.
         */
        Set<GrantedAuthority> authorities = new HashSet<>();

        for (Role role : user.getRoles()) {

            /*
             * Example:
             * ROLE_ADMIN
             */
            authorities.add(
                    new SimpleGrantedAuthority(role.getName())
            );

            /*
             * Example:
             * USER_CREATE
             * USER_DELETE
             * ROLE_MANAGE
             * ANALYTICS_VIEW
             */
            role.getPermissions().forEach(permission ->
                    authorities.add(
                            new SimpleGrantedAuthority(permission.getName())
                    )
            );
        }

        /*
         * Return authenticated Spring Security user.
         */
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),      // enabled
                true,                  // accountNonExpired
                true,                  // credentialsNonExpired
                true,                  // accountNonLocked
                authorities
        );
    }
}