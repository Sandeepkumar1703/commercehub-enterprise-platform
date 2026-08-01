package com.commercehub.backend.user.entity;


import com.commercehub.backend.permission.entity.Permission;
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
@Table(name = "roles")
public class Role {


    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /**
     * Role Name
     *
     * Examples:
     * ROLE_ADMIN
     * ROLE_USER
     * ROLE_VENDOR
     */
    @Column(
            nullable = false,
            unique = true,
            length = 50
    )
    private String name;


    /**
     * Role Description
     */
    @Column(length = 255)
    private String description;



    /**
     * Role → Permissions mapping
     *
     * roles
     * |
     * role_permissions
     * |
     * permissions
     */
    @ManyToMany(
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "role_permissions",
            joinColumns = @JoinColumn(
                    name = "role_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "permission_id"
            )
    )
    @Builder.Default
    private Set<Permission> permissions = new HashSet<>();

}