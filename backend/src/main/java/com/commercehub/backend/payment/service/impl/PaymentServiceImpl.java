package com.commercehub.backend.payment.service.impl;

import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.repository.OrderRepository;
import com.commercehub.backend.payment.dto.request.PaymentRequest;
import com.commercehub.backend.payment.dto.response.PaymentResponse;
import com.commercehub.backend.payment.entity.Payment;
import com.commercehub.backend.payment.enums.PaymentStatus;
import com.commercehub.backend.payment.mapper.PaymentMapper;
import com.commercehub.backend.payment.repository.PaymentRepository;
import com.commercehub.backend.payment.service.PaymentService;
import com.commercehub.backend.payment.util.TransactionIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentMapper paymentMapper;
    private final TransactionIdGenerator transactionIdGenerator;

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + request.getOrderId()));

        // Prevent duplicate successful payments
        paymentRepository.findTopByOrderOrderByCreatedAtDesc(order)
                .ifPresent(existing -> {
                    if (existing.getStatus() == PaymentStatus.SUCCESS) {
                        throw new IllegalArgumentException(
                                "This order has already been paid.");
                    }
                });

        // Validate payment amount
        if (request.getAmount().compareTo(order.getTotalAmount()) != 0) {
            throw new IllegalArgumentException(
                    "Payment amount must match the order total amount.");
        }

        Payment payment = paymentMapper.toEntity(request);

        payment.setOrder(order);
        payment.setStatus(PaymentStatus.PENDING);

        // Auto-generate transaction ID
        payment.setTransactionId(
                transactionIdGenerator.generateTransactionId()
        );

        // Dummy payment gateway (replace with Stripe/Razorpay later)
        payment.setGatewayName("DUMMY");
        payment.setGatewayResponse("Payment initiated successfully.");

        // Keep order payment status in sync
        order.setPaymentStatus(PaymentStatus.PENDING);
        orderRepository.save(order);

        Payment savedPayment = paymentRepository.save(payment);

        return paymentMapper.toResponse(savedPayment);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: " + paymentId));

        return paymentMapper.toResponse(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsByOrderId(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId));

        return paymentRepository.findByOrder(order)
                .stream()
                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
    public PaymentResponse markPaymentSuccess(Long paymentId, String transactionId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: " + paymentId));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            throw new IllegalArgumentException(
                    "Payment has already been marked as successful.");
        }

        payment.setStatus(PaymentStatus.SUCCESS);

        // Transaction ID is generated during payment creation.
        // If a real payment gateway returns a different reference,
        // it can be stored here.
        if (transactionId != null && !transactionId.isBlank()) {
            payment.setStripeChargeId(transactionId);
        }

        payment.setGatewayResponse("Payment completed successfully.");

        Order order = payment.getOrder();
        order.setPaymentStatus(PaymentStatus.SUCCESS);

        orderRepository.save(order);

        Payment updatedPayment = paymentRepository.save(payment);

        return paymentMapper.toResponse(updatedPayment);
    }

    @Override
    public PaymentResponse markPaymentFailed(Long paymentId, String errorMessage) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id: " + paymentId));

        payment.setStatus(PaymentStatus.FAILED);
        payment.setErrorMessage(errorMessage);
        payment.setGatewayResponse(errorMessage);

        Order order = payment.getOrder();
        order.setPaymentStatus(PaymentStatus.FAILED);

        orderRepository.save(order);

        Payment updatedPayment = paymentRepository.save(payment);

        return paymentMapper.toResponse(updatedPayment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
public PaymentResponse cancelPayment(Long paymentId) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId));

    if (payment.getStatus() == PaymentStatus.SUCCESS) {
        throw new IllegalArgumentException(
                "Successful payment cannot be cancelled.");
    }

    if (payment.getStatus() == PaymentStatus.REFUNDED) {
        throw new IllegalArgumentException(
                "Refunded payment cannot be cancelled.");
    }

    if (payment.getStatus() == PaymentStatus.CANCELLED) {
        throw new IllegalArgumentException(
                "Payment is already cancelled.");
    }

    payment.setStatus(PaymentStatus.CANCELLED);
    payment.setCancelledAt(java.time.LocalDateTime.now());
    payment.setGatewayResponse("Payment cancelled.");

    Order order = payment.getOrder();
    order.setPaymentStatus(PaymentStatus.CANCELLED);

    orderRepository.save(order);

    return paymentMapper.toResponse(
            paymentRepository.save(payment)
    );
}

@Override
public PaymentResponse refundPayment(Long paymentId) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId));

    if (payment.getStatus() != PaymentStatus.SUCCESS) {
        throw new IllegalArgumentException(
                "Only successful payments can be refunded.");
    }

    payment.setStatus(PaymentStatus.REFUNDED);
    payment.setRefundedAt(java.time.LocalDateTime.now());
    payment.setGatewayResponse("Payment refunded.");

    Order order = payment.getOrder();
    order.setPaymentStatus(PaymentStatus.REFUNDED);

    orderRepository.save(order);

    return paymentMapper.toResponse(
            paymentRepository.save(payment)
    );
}

@Override
public PaymentResponse retryPayment(Long paymentId) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId));

    if (payment.getStatus() != PaymentStatus.FAILED) {
        throw new IllegalArgumentException(
                "Only failed payments can be retried.");
    }

    payment.setStatus(PaymentStatus.PENDING);
    payment.setErrorMessage(null);
    payment.setGatewayResponse("Payment retry initiated.");

    return paymentMapper.toResponse(
            paymentRepository.save(payment)
    );
}
@Override
@Transactional(readOnly = true)
public PaymentResponse getPaymentByTransactionId(String transactionId) {

    Payment payment = paymentRepository.findByTransactionId(transactionId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with transaction ID: " + transactionId));

    return paymentMapper.toResponse(payment);
}
@Override
@Transactional(readOnly = true)
public List<PaymentResponse> getPaymentsByStatus(PaymentStatus status) {

    return paymentRepository.findByStatus(status)
            .stream()
            .map(paymentMapper::toResponse)
            .toList();
}
}