package com.commercehub.backend.address.service.impl;

import com.commercehub.backend.address.dto.request.AddressRequest;
import com.commercehub.backend.address.dto.response.AddressResponse;
import com.commercehub.backend.address.entity.Address;
import com.commercehub.backend.address.mapper.AddressMapper;
import com.commercehub.backend.address.repository.AddressRepository;
import com.commercehub.backend.address.service.AddressService;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressServiceImpl implements AddressService {


    private final AddressRepository addressRepository;

    private final UserRepository userRepository;

    private final AddressMapper addressMapper;



    @Override
    public AddressResponse createAddress(AddressRequest request) {


        User user = getCurrentUser();


        Address address = addressMapper.toEntity(request);

        address.setUser(user);



        List<Address> addresses =
                addressRepository.findByUserAndActiveTrue(user);



        /*
         * First address automatically becomes default
         */
        if (addresses.isEmpty()) {

            address.setDefault(true);

        }



        /*
         * User selected default address
         */
        if (Boolean.TRUE.equals(request.getIsDefault())) {


            addresses.forEach(existing -> {

                existing.setDefault(false);

                addressRepository.save(existing);

            });


            address.setDefault(true);

        }



        Address saved =
                addressRepository.save(address);


        return addressMapper.toResponse(saved);
    }




    @Override
    @Transactional(readOnly = true)
    public List<AddressResponse> getAllAddresses() {


        User user = getCurrentUser();


        return addressRepository
                .findByUserAndActiveTrue(user)
                .stream()
                .map(addressMapper::toResponse)
                .toList();

    }




    @Override
    @Transactional(readOnly = true)
    public AddressResponse getAddressById(Long addressId) {


        User user = getCurrentUser();


        Address address =
                addressRepository
                        .findByIdAndUserAndActiveTrue(addressId,user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id: "
                                                + addressId
                                ));



        return addressMapper.toResponse(address);

    }




    @Override
    public AddressResponse updateAddress(
            Long addressId,
            AddressRequest request
    ) {


        User user = getCurrentUser();


        Address address =
                addressRepository
                        .findByIdAndUserAndActiveTrue(addressId,user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id: "
                                                + addressId
                                ));



        addressMapper.updateEntity(request,address);



        if(Boolean.TRUE.equals(request.getIsDefault())) {


            addressRepository
                    .findByUserAndActiveTrue(user)
                    .forEach(existing -> {

                        existing.setDefault(false);

                        addressRepository.save(existing);

                    });


            address.setDefault(true);

        }



        Address updated =
                addressRepository.save(address);



        return addressMapper.toResponse(updated);

    }





    @Override
    public void deleteAddress(Long addressId) {


        User user = getCurrentUser();


        Address address =
                addressRepository
                        .findByIdAndUserAndActiveTrue(addressId,user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id: "
                                                + addressId
                                ));



        address.setActive(false);


        addressRepository.save(address);

    }





    @Override
    public AddressResponse setDefaultAddress(Long addressId) {


        User user = getCurrentUser();



        Address address =
                addressRepository
                        .findByIdAndUserAndActiveTrue(addressId,user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id: "
                                                + addressId
                                ));




        addressRepository
                .findByUserAndActiveTrue(user)
                .forEach(existing -> {

                    existing.setDefault(false);

                    addressRepository.save(existing);

                });



        address.setDefault(true);



        return addressMapper.toResponse(
                addressRepository.save(address)
        );

    }





    @Override
    @Transactional(readOnly = true)
    public AddressResponse getDefaultAddress() {


        User user = getCurrentUser();



        Address address =
                addressRepository
                        .findByUserAndIsDefaultTrueAndActiveTrue(user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Default address not found"
                                ));



        return addressMapper.toResponse(address);

    }




    private User getCurrentUser() {


        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();



        String email =
                authentication.getName();



        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        ));

    }

}