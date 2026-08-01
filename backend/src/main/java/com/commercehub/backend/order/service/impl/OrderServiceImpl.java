package com.commercehub.backend.order.service.impl;

import com.commercehub.backend.cart.entity.Cart;
import com.commercehub.backend.cart.entity.CartItem;
import com.commercehub.backend.cart.repository.CartItemRepository;
import com.commercehub.backend.cart.repository.CartRepository;
import com.commercehub.backend.order.dto.request.OrderRequest;
import com.commercehub.backend.order.dto.response.OrderResponse;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.entity.OrderItem;
import com.commercehub.backend.order.entity.OrderStatus;
import com.commercehub.backend.payment.enums.PaymentStatus;
import com.commercehub.backend.order.mapper.OrderMapper;
import com.commercehub.backend.order.repository.OrderRepository;
import com.commercehub.backend.order.service.OrderService;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.commercehub.backend.inventory.service.InventoryService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.commercehub.backend.common.exception.BusinessException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;

    private final InventoryService inventoryService;

    @Override
    public OrderResponse createOrder(OrderRequest request) {

        User user = getCurrentUser();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(
                        () -> new RuntimeException("Cart not found")
                );

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .userId(user.getId())
                .orderNumber(generateOrderNumber())
                .shippingAddressId(request.getShippingAddressId())
                .couponId(request.getCouponId())
                .notes(request.getNotes())
                .status(OrderStatus.PLACED)
                .paymentStatus(PaymentStatus.PENDING)
                .taxAmount(BigDecimal.ZERO)
                .discountAmount(BigDecimal.ZERO)
                .shippingCost(BigDecimal.ZERO)
                .items(new ArrayList<>())
                .build();

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {

            BigDecimal price = cartItem.getProduct().getPrice();

            BigDecimal subtotal
                    = price.multiply(
                            BigDecimal.valueOf(
                                    cartItem.getQuantity()
                            )
                    );

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(cartItem.getProduct().getId())
                    .quantity(cartItem.getQuantity())
                    .price(price)
                    .subtotal(subtotal)
                    .discount(BigDecimal.ZERO)
                    .tax(BigDecimal.ZERO)
                    .total(subtotal)
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);

        BigDecimal totalAmount
                = orderItems.stream()
                        .map(OrderItem::getTotal)
                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );

        order.setTotalAmount(totalAmount);

        Order savedOrder
                = orderRepository.save(order);

        cartItemRepository.deleteAllByCartId(cart.getId());

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders() {

        User user = getCurrentUser();

        return orderMapper.toResponseList(
                orderRepository.findByUserId(user.getId())
        );
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {

        Order order
                = orderRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Order not found"
                                )
                        );

        return orderMapper.toResponse(order);
    }

    @Override
@Transactional
public void cancelOrder(Long id) {

    Order order =
            orderRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Order not found with id: " + id
                            )
                    );


    if (order.getStatus() != OrderStatus.PLACED
            && order.getStatus() != OrderStatus.CONFIRMED) {

        throw new BusinessException(
                "Order cannot be cancelled in current status: "
                        + order.getStatus()
        );
    }


    inventoryService.releaseInventory(order);


    order.setStatus(
            OrderStatus.CANCELLED
    );


    orderRepository.save(order);
}

    private User getCurrentUser() {

        String email
                = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );
    }

    private String generateOrderNumber() {

        return "ORD-"
                + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();

    }

}
