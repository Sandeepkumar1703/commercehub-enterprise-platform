package com.commercehub.backend.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User First Name
     */
    @Column(nullable = false)
    private String firstName;

    /**
     * User Last Name
     */
    @Column(nullable = false)
    private String lastName;

    /**
     * User Email
     */
    @Column(
            unique = true,
            nullable = false
    )
    private String email;

    /**
     * Encrypted Password
     */
    @Column(nullable = false)
    private String password;

    /**
     * Account activation status.
     *
     * false = Email not verified true = Email verified
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = false;

    /**
     * Roles assigned to the user.
     *
     * Examples: ROLE_USER ROLE_ADMIN ROLE_SELLER
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(
                    name = "user_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id"
            )
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

}
