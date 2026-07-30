package com.commercehub.backend.payment.controller;

import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.payment.dto.request.PaymentRequest;
import com.commercehub.backend.payment.dto.response.PaymentResponse;
import com.commercehub.backend.payment.enums.PaymentStatus;
import com.commercehub.backend.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Create Payment
     */
    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @Valid @RequestBody PaymentRequest request) {

        PaymentResponse response = paymentService.createPayment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Payment created successfully.",
                        response
                ));
    }

    /**
     * Get Payment By ID
     */
    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(
            @PathVariable Long paymentId) {

        PaymentResponse response = paymentService.getPaymentById(paymentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment fetched successfully.",
                        response
                )
        );
    }

    /**
     * Get Payments By Order ID
     */
    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPaymentsByOrderId(
            @PathVariable Long orderId) {

        List<PaymentResponse> response =
                paymentService.getPaymentsByOrderId(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Order payments fetched successfully.",
                        response
                )
        );
    }

    /**
     * Mark Payment Success
     */
    @PutMapping("/{paymentId}/success")
    public ResponseEntity<ApiResponse<PaymentResponse>> markPaymentSuccess(
            @PathVariable Long paymentId,
            @RequestParam(required = false) String gatewayReferenceId) {

        PaymentResponse response =
                paymentService.markPaymentSuccess(
                        paymentId,
                        gatewayReferenceId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment marked as successful.",
                        response
                )
        );
    }

    /**
     * Mark Payment Failed
     */
    @PutMapping("/{paymentId}/failed")
    public ResponseEntity<ApiResponse<PaymentResponse>> markPaymentFailed(
            @PathVariable Long paymentId,
            @RequestParam String errorMessage) {

        PaymentResponse response =
                paymentService.markPaymentFailed(
                        paymentId,
                        errorMessage
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment marked as failed.",
                        response
                )
        );
    }

    /**
     * Cancel Payment
     */
    @PutMapping("/{paymentId}/cancel")
    public ResponseEntity<ApiResponse<PaymentResponse>> cancelPayment(
            @PathVariable Long paymentId) {

        PaymentResponse response =
                paymentService.cancelPayment(paymentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment cancelled successfully.",
                        response
                )
        );
    }

    /**
     * Refund Payment
     */
    @PutMapping("/{paymentId}/refund")
    public ResponseEntity<ApiResponse<PaymentResponse>> refundPayment(
            @PathVariable Long paymentId) {

        PaymentResponse response =
                paymentService.refundPayment(paymentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment refunded successfully.",
                        response
                )
        );
    }

    /**
     * Retry Failed Payment
     */
    @PutMapping("/{paymentId}/retry")
    public ResponseEntity<ApiResponse<PaymentResponse>> retryPayment(
            @PathVariable Long paymentId) {

        PaymentResponse response =
                paymentService.retryPayment(paymentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment retry initiated.",
                        response
                )
        );
    }

    /**
     * Get Payment By Transaction ID
     */
    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByTransactionId(
            @PathVariable String transactionId) {

        PaymentResponse response =
                paymentService.getPaymentByTransactionId(transactionId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payment fetched successfully.",
                        response
                )
        );
    }

    /**
     * Get Payments By Status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPaymentsByStatus(
            @PathVariable PaymentStatus status) {

        List<PaymentResponse> response =
                paymentService.getPaymentsByStatus(status);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payments fetched successfully.",
                        response
                )
        );
    }

    /**
     * Get All Payments
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getAllPayments() {

        List<PaymentResponse> response =
                paymentService.getAllPayments();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Payments fetched successfully.",
                        response
                )
        );
    }
}