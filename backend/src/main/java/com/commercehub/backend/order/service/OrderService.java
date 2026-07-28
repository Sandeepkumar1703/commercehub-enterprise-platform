package com.commercehub.backend.order.service;

import com.commercehub.backend.order.dto.request.OrderRequest;
import com.commercehub.backend.order.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {


    OrderResponse createOrder(OrderRequest request);


    List<OrderResponse> getMyOrders();


    OrderResponse getOrderById(Long id);


    void cancelOrder(Long id);

}