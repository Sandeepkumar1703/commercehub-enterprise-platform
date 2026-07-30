package com.commercehub.backend.address.service;

import com.commercehub.backend.address.dto.request.AddressRequest;
import com.commercehub.backend.address.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {

    /**
     * Add a new address for the logged-in user.
     */
    AddressResponse createAddress(AddressRequest request);


    /**
     * Get all addresses of the logged-in user.
     */
    List<AddressResponse> getAllAddresses();


    /**
     * Get address by ID.
     */
    AddressResponse getAddressById(Long addressId);


    /**
     * Update an existing address.
     */
    AddressResponse updateAddress(
            Long addressId,
            AddressRequest request
    );


    /**
     * Delete (soft delete) an address.
     */
    void deleteAddress(Long addressId);


    /**
     * Set an address as default address.
     */
    AddressResponse setDefaultAddress(Long addressId);


    /**
     * Get user's default address.
     */
    AddressResponse getDefaultAddress();

}