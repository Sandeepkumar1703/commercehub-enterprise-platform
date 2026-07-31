package com.commercehub.backend.shipping.mapper;

import com.commercehub.backend.shipping.dto.request.CreateShippingRequest;
import com.commercehub.backend.shipping.dto.response.ShippingResponse;
import com.commercehub.backend.shipping.entity.Shipping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShippingMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "trackingNumber", ignore = true)
    @Mapping(target = "trackingUrl", ignore = true)
    @Mapping(target = "actualDelivery", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Shipping toEntity(CreateShippingRequest request);

    @Mapping(target = "orderId", source = "order.id")
    ShippingResponse toResponse(Shipping shipping);

}