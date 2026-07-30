package com.commercehub.backend.payment.enums;

public enum PaymentMethod {

    /**
     * Credit Card / Debit Card
     */
    CARD,

    /**
     * Unified Payments Interface
     */
    UPI,

    /**
     * Internet Banking
     */
    NET_BANKING,

    /**
     * Digital Wallets (Paytm, PhonePe Wallet, Amazon Pay, etc.)
     */
    WALLET,

    /**
     * Cash on Delivery
     */
    COD,

    /**
     * EMI Payment
     */
    EMI
}