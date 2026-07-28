package com.commercehub.backend.order.mapper;

import com.commercehub.backend.order.dto.response.OrderItemResponse;
import com.commercehub.backend.order.dto.response.OrderResponse;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {


    OrderResponse toResponse(Order order);


    List<OrderResponse> toResponseList(List<Order> orders);


    OrderItemResponse toItemResponse(OrderItem orderItem);


    List<OrderItemResponse> toItemResponseList(List<OrderItem> orderItems);

}