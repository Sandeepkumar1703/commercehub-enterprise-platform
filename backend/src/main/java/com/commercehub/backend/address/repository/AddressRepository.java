package com.commercehub.backend.address.repository;

import com.commercehub.backend.address.entity.Address;
import com.commercehub.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface AddressRepository 
        extends JpaRepository<Address, Long> {


    List<Address> findByUserAndActiveTrue(User user);


    Optional<Address> findByIdAndUserAndActiveTrue(
            Long id,
            User user
    );


    Optional<Address> findByUserAndIsDefaultTrueAndActiveTrue(
            User user
    );

}