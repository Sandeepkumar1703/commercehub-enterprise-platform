package com.commercehub.backend.payment.service.impl;

import com.commercehub.backend.common.exception.BusinessException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.entity.OrderStatus;
import com.commercehub.backend.order.repository.OrderRepository;
import com.commercehub.backend.payment.dto.request.PaymentRequest;
import com.commercehub.backend.payment.dto.response.PaymentResponse;
import com.commercehub.backend.payment.entity.Payment;
import com.commercehub.backend.payment.enums.PaymentStatus;
import com.commercehub.backend.payment.mapper.PaymentMapper;
import com.commercehub.backend.payment.repository.PaymentRepository;
import com.commercehub.backend.payment.service.PaymentService;
import com.commercehub.backend.payment.util.TransactionIdGenerator;
import com.commercehub.backend.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {


    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentMapper paymentMapper;
    private final TransactionIdGenerator transactionIdGenerator;
    private final InventoryService inventoryService;



    /**
     * Create payment for an order
     */
    @Override
    public PaymentResponse createPayment(PaymentRequest request) {


        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: "
                                        + request.getOrderId()
                        ));



        // Prevent payment on cancelled orders
        if(order.getStatus() == OrderStatus.CANCELLED){

            throw new BusinessException(
                    "Cannot create payment for cancelled order."
            );
        }



        // Prevent duplicate successful payment
        paymentRepository
                .findTopByOrderOrderByCreatedAtDesc(order)
                .ifPresent(existing -> {

                    if(existing.getStatus()
                            == PaymentStatus.SUCCESS){

                        throw new BusinessException(
                                "This order has already been paid."
                        );
                    }

                });



        // Validate amount
        if(request.getAmount()
                .compareTo(order.getTotalAmount()) != 0){

            throw new BusinessException(
                    "Payment amount must match order total."
            );
        }



        Payment payment =
                paymentMapper.toEntity(request);



        payment.setOrder(order);

        payment.setStatus(
                PaymentStatus.PENDING
        );


        payment.setTransactionId(
                transactionIdGenerator
                        .generateTransactionId()
        );


        // Dummy gateway
        payment.setGatewayName(
                "DUMMY"
        );

        payment.setGatewayResponse(
                "Payment initiated successfully."
        );



        order.setPaymentStatus(
                PaymentStatus.PENDING
        );

        orderRepository.save(order);



        Payment savedPayment =
                paymentRepository.save(payment);



        return paymentMapper.toResponse(savedPayment);

    }





    /**
     * Get payment by ID
     */
    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(Long paymentId) {


        Payment payment =
                paymentRepository.findById(paymentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with id: "
                                                + paymentId
                                ));


        return paymentMapper.toResponse(payment);

    }





    /**
     * Get payments by order
     */
    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsByOrderId(Long orderId) {


        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with id: "
                                                + orderId
                                ));



        return paymentRepository
                .findByOrder(order)
                .stream()
                .map(paymentMapper::toResponse)
                .toList();

    }





    /**
 * Mark payment successful
 */
@Override
@Transactional
public PaymentResponse markPaymentSuccess(
        Long paymentId,
        String gatewayReferenceId
) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId
                    ));

    Order order = payment.getOrder();

    // Order validation
    if (order.getStatus() == OrderStatus.CANCELLED) {
        throw new BusinessException(
                "Cannot complete payment for cancelled order."
        );
    }

    // Payment state validation
    if (payment.getStatus() == PaymentStatus.SUCCESS) {
        throw new BusinessException(
                "Payment is already successful."
        );
    }

    if (payment.getStatus() == PaymentStatus.REFUNDED) {
        throw new BusinessException(
                "Refunded payment cannot be marked successful."
        );
    }

    if (payment.getStatus() == PaymentStatus.CANCELLED) {
        throw new BusinessException(
                "Cancelled payment cannot be marked successful."
        );
    }

    payment.setStatus(PaymentStatus.SUCCESS);
    payment.setGatewayResponse("Payment completed successfully.");

    if (gatewayReferenceId != null && !gatewayReferenceId.isBlank()) {
        payment.setStripeChargeId(gatewayReferenceId);
    }

    order.setPaymentStatus(
        PaymentStatus.SUCCESS
);


inventoryService.reserveInventory(order);


order.setStatus(
        OrderStatus.CONFIRMED
);


orderRepository.save(order);


Payment updatedPayment =
        paymentRepository.save(payment);

    return paymentMapper.toResponse(updatedPayment);
}





    /**
 * Mark payment failed
 */
@Override
@Transactional
public PaymentResponse markPaymentFailed(
        Long paymentId,
        String errorMessage
) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId
                    ));

    // Payment state validation
    if (payment.getStatus() == PaymentStatus.SUCCESS) {
        throw new BusinessException(
                "Successful payment cannot be marked failed."
        );
    }

    if (payment.getStatus() == PaymentStatus.REFUNDED) {
        throw new BusinessException(
                "Refunded payment cannot be marked failed."
        );
    }

    if (payment.getStatus() == PaymentStatus.CANCELLED) {
        throw new BusinessException(
                "Cancelled payment cannot be marked failed."
        );
    }

    payment.setStatus(PaymentStatus.FAILED);
    payment.setErrorMessage(errorMessage);
    payment.setGatewayResponse(errorMessage);

    Order order = payment.getOrder();
    order.setPaymentStatus(PaymentStatus.FAILED);

    orderRepository.save(order);

    Payment updatedPayment = paymentRepository.save(payment);

    return paymentMapper.toResponse(updatedPayment);
}





    /**
         * Cancel payment
         */
        @Override
@Transactional
public PaymentResponse cancelPayment(Long paymentId) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Payment not found with id: " + paymentId
                    ));


    if(payment.getStatus() == PaymentStatus.SUCCESS){

        throw new BusinessException(
                "Successful payment cannot be cancelled. Use refund."
        );
    }


    if(payment.getStatus() != PaymentStatus.PENDING){

        throw new BusinessException(
                "Only pending payments can be cancelled."
        );
    }


    payment.setStatus(
            PaymentStatus.CANCELLED
    );


    payment.setCancelledAt(
            LocalDateTime.now()
    );


    payment.setGatewayResponse(
            "Payment cancelled."
    );


    Order order = payment.getOrder();


    order.setPaymentStatus(
            PaymentStatus.CANCELLED
    );


    orderRepository.save(order);


    return paymentMapper.toResponse(
            paymentRepository.save(payment)
    );
}





    /**
     * Refund successful payment
     */
    @Override
public PaymentResponse refundPayment(Long paymentId) {

    Payment payment =
            paymentRepository.findById(paymentId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Payment not found with id: " + paymentId
                            ));


    if(payment.getStatus()
            != PaymentStatus.SUCCESS){

        throw new BusinessException(
                "Only successful payments can be refunded."
        );
    }


    payment.setStatus(
            PaymentStatus.REFUNDED
    );


    payment.setRefundedAt(
            LocalDateTime.now()
    );


    payment.setGatewayResponse(
            "Payment refunded."
    );


    Order order = payment.getOrder();

order.setPaymentStatus(PaymentStatus.REFUNDED);

if (order.getStatus() != OrderStatus.DELIVERED) {
    inventoryService.releaseInventory(order);
}

orderRepository.save(order);

return paymentMapper.toResponse(
        paymentRepository.save(payment)
);
}





    /**
     * Retry failed payment
     */
    @Override
    public PaymentResponse retryPayment(Long paymentId) {


        Payment payment =
                paymentRepository.findById(paymentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with id: "
                                                + paymentId
                                ));



        if(payment.getStatus()
                != PaymentStatus.FAILED){

            throw new BusinessException(
                    "Only failed payments can be retried."
            );

        }



        payment.setStatus(
                PaymentStatus.PENDING
        );


        payment.setErrorMessage(
                null
        );


        payment.setGatewayResponse(
                "Payment retry initiated."
        );



        Order order =
                payment.getOrder();


        order.setPaymentStatus(
                PaymentStatus.PENDING
        );


        orderRepository.save(order);



        return paymentMapper.toResponse(
                paymentRepository.save(payment)
        );

    }





    /**
     * Get payment by transaction id
     */
    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByTransactionId(
            String transactionId
    ) {


        Payment payment =
                paymentRepository
                        .findByTransactionId(transactionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with transaction ID: "
                                                + transactionId
                                ));



        return paymentMapper.toResponse(payment);

    }





    /**
     * Get payments by status
     */
    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsByStatus(
            PaymentStatus status
    ) {


        return paymentRepository
                .findByStatus(status)
                .stream()
                .map(paymentMapper::toResponse)
                .toList();

    }





    /**
     * Get all payments
     */
    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {


        return paymentRepository
                .findAll()
                .stream()
                .map(paymentMapper::toResponse)
                .toList();

    }

}