package com.commercehub.backend.shipping.service.impl;

import com.commercehub.backend.common.exception.BusinessException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.entity.OrderStatus;
import com.commercehub.backend.order.repository.OrderRepository;
import com.commercehub.backend.payment.enums.PaymentStatus;
import com.commercehub.backend.shipping.dto.request.CreateShippingRequest;
import com.commercehub.backend.shipping.dto.request.UpdateShippingStatusRequest;
import com.commercehub.backend.shipping.dto.response.ShippingResponse;
import com.commercehub.backend.shipping.entity.Shipping;
import com.commercehub.backend.shipping.enums.ShippingStatus;
import com.commercehub.backend.shipping.mapper.ShippingMapper;
import com.commercehub.backend.shipping.repository.ShippingRepository;
import com.commercehub.backend.shipping.service.ShippingService;
import com.commercehub.backend.shipping.util.TrackingNumberGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final ShippingRepository shippingRepository;
    private final OrderRepository orderRepository;
    private final ShippingMapper shippingMapper;
    private final TrackingNumberGenerator trackingNumberGenerator;

    @Override
public ShippingResponse createShipment(CreateShippingRequest request) {

    Order order = orderRepository.findById(request.getOrderId())
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Order not found with id: "
                                    + request.getOrderId()
                    ));

    if (shippingRepository.existsByOrder(order)) {
        throw new BusinessException(
                "Shipment already exists for this order."
        );
    }

    if (order.getStatus() == OrderStatus.CANCELLED) {
        throw new BusinessException(
                "Cannot create shipment for cancelled order."
        );
    }

    if (order.getPaymentStatus() != PaymentStatus.SUCCESS) {
        throw new BusinessException(
                "Shipment can only be created after successful payment."
        );
    }

    Shipping shipping =
            shippingMapper.toEntity(request);

    shipping.setOrder(order);

    shipping.setStatus(
            ShippingStatus.PROCESSING
    );

    shipping.setTrackingNumber(
            trackingNumberGenerator.generateTrackingNumber()
    );

    if (request.getEstimatedDelivery() == null) {

    shipping.setEstimatedDelivery(
            LocalDateTime.now().plusDays(5)
    );

}

    Shipping saved =
            shippingRepository.save(shipping);

    return shippingMapper.toResponse(saved);
}

@Override
@Transactional(readOnly = true)
public ShippingResponse getShipment(Long shippingId) {

    Shipping shipping = shippingRepository.findById(shippingId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found with id: " + shippingId
                    ));

    return shippingMapper.toResponse(shipping);
}

@Override
@Transactional(readOnly = true)
public ShippingResponse getShipmentByOrder(Long orderId) {

    Order order = orderRepository.findById(orderId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Order not found with id: " + orderId
                    ));

    Shipping shipping = shippingRepository.findByOrder(order)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found for order id: " + orderId
                    ));

    return shippingMapper.toResponse(shipping);
}

@Override
@Transactional(readOnly = true)
public List<ShippingResponse> getAllShipments() {
    return shippingRepository.findAll()
            .stream()
            .map(shippingMapper::toResponse)
            .toList();
}

@Override
@Transactional(readOnly = true)
public List<ShippingResponse> getShipmentsByStatus(
        ShippingStatus status
) {

    return shippingRepository.findByStatus(status)
            .stream()
            .map(shippingMapper::toResponse)
            .toList();
}

@Override
public ShippingResponse markShipped(
        Long shippingId,
        UpdateShippingStatusRequest request
) {

    Shipping shipping = shippingRepository.findById(shippingId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found with id: " + shippingId
                    ));

    if (shipping.getStatus() != ShippingStatus.PROCESSING) {
        throw new BusinessException(
                "Only processing shipments can be marked as shipped."
        );
    }

    shipping.setStatus(ShippingStatus.SHIPPED);

    if (request.getTrackingNumber() != null &&
            !request.getTrackingNumber().isBlank()) {

        if (shippingRepository.existsByTrackingNumber(request.getTrackingNumber())) {
            throw new BusinessException(
                    "Tracking number already exists."
            );
        }

        shipping.setTrackingNumber(request.getTrackingNumber());
    }

    if (request.getTrackingUrl() != null &&
            !request.getTrackingUrl().isBlank()) {

        shipping.setTrackingUrl(request.getTrackingUrl());
    }

    return shippingMapper.toResponse(
            shippingRepository.save(shipping)
    );
}

@Override
public ShippingResponse markOutForDelivery(Long shippingId) {

    Shipping shipping = shippingRepository.findById(shippingId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found with id: " + shippingId
                    ));

    if (shipping.getStatus() != ShippingStatus.SHIPPED) {
        throw new BusinessException(
                "Only shipped orders can be marked out for delivery."
        );
    }

    shipping.setStatus(ShippingStatus.OUT_FOR_DELIVERY);

    return shippingMapper.toResponse(
            shippingRepository.save(shipping)
    );
}

@Override
public ShippingResponse markDelivered(Long shippingId) {

    Shipping shipping = shippingRepository.findById(shippingId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found with id: " + shippingId
                    ));

    if (shipping.getStatus() != ShippingStatus.OUT_FOR_DELIVERY) {
        throw new BusinessException(
                "Only shipments out for delivery can be marked delivered."
        );
    }

    shipping.setStatus(ShippingStatus.DELIVERED);

    shipping.setActualDelivery(
            LocalDateTime.now()
    );

    return shippingMapper.toResponse(
            shippingRepository.save(shipping)
    );
}

@Override
public ShippingResponse cancelShipment(Long shippingId) {

    Shipping shipping = shippingRepository.findById(shippingId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Shipment not found with id: " + shippingId
                    ));

    if (shipping.getStatus() == ShippingStatus.DELIVERED) {
        throw new BusinessException(
                "Delivered shipment cannot be cancelled."
        );
    }

    if (shipping.getStatus() == ShippingStatus.CANCELLED) {
        throw new BusinessException(
                "Shipment is already cancelled."
        );
    }

    shipping.setStatus(ShippingStatus.CANCELLED);

    return shippingMapper.toResponse(
            shippingRepository.save(shipping)
    );
}

}