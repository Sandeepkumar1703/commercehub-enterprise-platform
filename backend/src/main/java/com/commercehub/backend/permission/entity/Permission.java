package com.commercehub.backend.permission.entity;


import com.commercehub.backend.role.entity.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(
        name = "permissions"
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {


    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /**
     * Permission Name
     * Example:
     * ANALYTICS_VIEW
     * PRODUCT_CREATE
     */
    @Column(
            nullable = false,
            unique = true,
            length = 100
    )
    private String name;


    /**
     * Permission Description
     */
    @Column(columnDefinition = "TEXT")
    private String description;



    /**
     * Reverse mapping with roles
     *
     * Relationship:
     *
     * roles
     *   |
     * role_permissions
     *   |
     * permissions
     */
    @ManyToMany(
            mappedBy = "permissions",
            fetch = FetchType.LAZY
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

}