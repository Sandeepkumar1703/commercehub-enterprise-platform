package com.commercehub.backend.address.controller;

import com.commercehub.backend.address.dto.request.AddressRequest;
import com.commercehub.backend.address.dto.response.AddressResponse;
import com.commercehub.backend.address.service.AddressService;
import com.commercehub.backend.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    /**
     * Create Address
     */
    @PostMapping
    public ApiResponse<AddressResponse> createAddress(
            @Valid @RequestBody AddressRequest request) {

        return ApiResponse.success(
                "Address created successfully.",
                addressService.createAddress(request)
        );
    }

    /**
     * Get All Addresses
     */
    @GetMapping
    public ApiResponse<List<AddressResponse>> getAllAddresses() {

        return ApiResponse.success(
                "Addresses fetched successfully.",
                addressService.getAllAddresses()
        );
    }

    /**
     * Get Address By ID
     */
    @GetMapping("/{addressId}")
    public ApiResponse<AddressResponse> getAddressById(
            @PathVariable Long addressId) {

        return ApiResponse.success(
                "Address fetched successfully.",
                addressService.getAddressById(addressId)
        );
    }

    /**
     * Update Address
     */
    @PutMapping("/{addressId}")
    public ApiResponse<AddressResponse> updateAddress(
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request) {

        return ApiResponse.success(
                "Address updated successfully.",
                addressService.updateAddress(addressId, request)
        );
    }

    /**
     * Delete Address (Soft Delete)
     */
    @DeleteMapping("/{addressId}")
    public ApiResponse<String> deleteAddress(
            @PathVariable Long addressId) {

        addressService.deleteAddress(addressId);

        return ApiResponse.success(
                "Address deleted successfully."
        );
    }

    /**
     * Set Default Address
     */
    @PutMapping("/{addressId}/default")
    public ApiResponse<AddressResponse> setDefaultAddress(
            @PathVariable Long addressId) {

        return ApiResponse.success(
                "Default address updated successfully.",
                addressService.setDefaultAddress(addressId)
        );
    }

    /**
     * Get Default Address
     */
    @GetMapping("/default")
    public ApiResponse<AddressResponse> getDefaultAddress() {

        return ApiResponse.success(
                "Default address fetched successfully.",
                addressService.getDefaultAddress()
        );
    }

}
