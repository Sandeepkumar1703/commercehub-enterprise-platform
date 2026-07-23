package com.commercehub.backend.user.entity;

import jakarta.persistence.*;
import lombok.*;

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
     * Examples:
     * ROLE_ADMIN
     * ROLE_USER
     * ROLE_MANAGER
     */
    @Column(nullable = false, unique = true, length = 50)
    private String name;

    /**
     * Optional Description
     */
    @Column(length = 255)
    private String description;
}