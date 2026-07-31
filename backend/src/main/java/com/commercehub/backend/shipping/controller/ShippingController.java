package com.commercehub.backend.shipping.controller;

import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.shipping.dto.request.CreateShippingRequest;
import com.commercehub.backend.shipping.dto.request.UpdateShippingStatusRequest;
import com.commercehub.backend.shipping.dto.response.ShippingResponse;
import com.commercehub.backend.shipping.enums.ShippingStatus;
import com.commercehub.backend.shipping.service.ShippingService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final ShippingService shippingService;

    @PostMapping
    @Operation(summary = "Create shipment")
    public ApiResponse<ShippingResponse> createShipment(
            @Valid @RequestBody CreateShippingRequest request
    ) {

        return ApiResponse.success(
                "Shipment created successfully.",
                shippingService.createShipment(request)
        );
    }

    @GetMapping("/{shippingId}")
    @Operation(summary = "Get shipment by ID")
    public ApiResponse<ShippingResponse> getShipment(
            @PathVariable Long shippingId
    ) {

        return ApiResponse.success(
                "Shipment fetched successfully.",
                shippingService.getShipment(shippingId)
        );
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get shipment by order ID")
    public ApiResponse<ShippingResponse> getShipmentByOrder(
            @PathVariable Long orderId
    ) {

        return ApiResponse.success(
                "Shipment fetched successfully.",
                shippingService.getShipmentByOrder(orderId)
        );
    }

    @GetMapping
    @Operation(summary = "Get all shipments")
    public ApiResponse<List<ShippingResponse>> getAllShipments() {

        return ApiResponse.success(
                "Shipments fetched successfully.",
                shippingService.getAllShipments()
        );
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get shipments by status")
    public ApiResponse<List<ShippingResponse>> getShipmentsByStatus(
            @PathVariable ShippingStatus status
    ) {

        return ApiResponse.success(
                "Shipments fetched successfully.",
                shippingService.getShipmentsByStatus(status)
        );
    }

    @PutMapping("/{shippingId}/ship")
    @Operation(summary = "Mark shipment as shipped")
    public ApiResponse<ShippingResponse> markShipped(
            @PathVariable Long shippingId,
            @RequestBody UpdateShippingStatusRequest request
    ) {

        return ApiResponse.success(
                "Shipment marked as shipped.",
                shippingService.markShipped(
                        shippingId,
                        request
                )
        );
    }

    @PutMapping("/{shippingId}/out-for-delivery")
    @Operation(summary = "Mark shipment as out for delivery")
    public ApiResponse<ShippingResponse> markOutForDelivery(
            @PathVariable Long shippingId
    ) {

        return ApiResponse.success(
                "Shipment marked as out for delivery.",
                shippingService.markOutForDelivery(shippingId)
        );
    }

    @PutMapping("/{shippingId}/deliver")
    @Operation(summary = "Mark shipment as delivered")
    public ApiResponse<ShippingResponse> markDelivered(
            @PathVariable Long shippingId
    ) {

        return ApiResponse.success(
                "Shipment marked as delivered.",
                shippingService.markDelivered(shippingId)
        );
    }

    @PutMapping("/{shippingId}/cancel")
    @Operation(summary = "Cancel shipment")
    public ApiResponse<ShippingResponse> cancelShipment(
            @PathVariable Long shippingId
    ) {

        return ApiResponse.success(
                "Shipment cancelled successfully.",
                shippingService.cancelShipment(shippingId)
        );
    }

}