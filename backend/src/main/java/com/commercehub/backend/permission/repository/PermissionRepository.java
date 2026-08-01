package com.commercehub.backend.permission.repository;


import com.commercehub.backend.permission.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PermissionRepository 
        extends JpaRepository<Permission, Long> {


    Optional<Permission> findByName(String name);

}