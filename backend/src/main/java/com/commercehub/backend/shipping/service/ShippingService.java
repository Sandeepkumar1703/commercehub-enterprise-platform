package com.commercehub.backend.shipping.service;

import com.commercehub.backend.shipping.dto.request.CreateShippingRequest;
import com.commercehub.backend.shipping.dto.request.UpdateShippingStatusRequest;
import com.commercehub.backend.shipping.dto.response.ShippingResponse;
import com.commercehub.backend.shipping.enums.ShippingStatus;

import java.util.List;

public interface ShippingService {

    ShippingResponse createShipment(CreateShippingRequest request);

    ShippingResponse getShipment(Long shippingId);

    ShippingResponse getShipmentByOrder(Long orderId);

    List<ShippingResponse> getAllShipments();

    List<ShippingResponse> getShipmentsByStatus(ShippingStatus status);

    ShippingResponse markShipped(
            Long shippingId,
            UpdateShippingStatusRequest request
    );

    ShippingResponse markOutForDelivery(Long shippingId);

    ShippingResponse markDelivered(Long shippingId);

    ShippingResponse cancelShipment(Long shippingId);

}