package com.commercehub.backend.order.controller;

import com.commercehub.backend.order.dto.request.OrderRequest;
import com.commercehub.backend.order.dto.response.OrderResponse;
import com.commercehub.backend.order.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {


    private final OrderService orderService;


    /**
     * Create order from cart
     */
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(orderService.createOrder(request));
    }



    /**
     * Get logged-in user's orders
     */
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders() {


        return ResponseEntity.ok(
                orderService.getMyOrders()
        );
    }



    /**
     * Get order details
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                orderService.getOrderById(id)
        );
    }



    /**
     * Cancel order
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelOrder(
            @PathVariable Long id
    ) {


        orderService.cancelOrder(id);

        return ResponseEntity.noContent().build();
    }

}