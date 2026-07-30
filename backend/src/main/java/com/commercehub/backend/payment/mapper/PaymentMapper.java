package com.commercehub.backend.payment.mapper;

import com.commercehub.backend.payment.dto.request.PaymentRequest;
import com.commercehub.backend.payment.dto.response.PaymentResponse;
import com.commercehub.backend.payment.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PaymentMapper {

    /**
     * Convert PaymentRequest -> Payment Entity
     *
     * Order is loaded manually in the service.
     * Status, transactionId, timestamps etc.
     * are managed by the service/entity.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "transactionId", ignore = true)
    @Mapping(target = "stripeChargeId", ignore = true)
    @Mapping(target = "gatewayName", ignore = true)
    @Mapping(target = "gatewayResponse", ignore = true)
    @Mapping(target = "errorMessage", ignore = true)
    @Mapping(target = "refundedAt", ignore = true)
    @Mapping(target = "cancelledAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Payment toEntity(PaymentRequest request);

    /**
     * Convert Payment Entity -> PaymentResponse
     */
    @Mapping(source = "order.id", target = "orderId")
    PaymentResponse toResponse(Payment payment);
}